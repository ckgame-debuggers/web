"use client";
import { useState, useEffect } from "react";
import Avatar from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import RequireLogin from "@/components/util/require-login";
import errorImage from "$/resources/error.png";
import { josa } from "es-hangul";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { DebuggersAPI } from "@/components/util/api";
import { AxiosResponse } from "axios";

type application = {
  title: string;
  profile: string;
  mustAgree: { id: string; display: string }[];
  consentItems: { id: string; display: string }[];
};

export default function AuthChallengePage() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("client_id");
  const responseType = searchParams.get("response_type");
  const redirectsTo = searchParams.get("redirects_to");
  const state = searchParams.get("state");
  const [app, setApplication] = useState<application | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Record<string, boolean> | undefined>();

  const [error, setError] = useState<string | null>(null);
  const debuggersApi = DebuggersAPI.getInstance();

  useEffect(() => {
    const prepare = async () => {
      if (!clientId || !responseType || !redirectsTo) {
        setError("잘못된 접근입니다. (필수 파라미터 누락)");
        return;
      } else {
        setError(null);
      }
      if (responseType !== "code") setError("지원하지 않는 응답 형식입니다.");
      let res: AxiosResponse<any, any>;
      try {
        res = await debuggersApi.get(`/public/oauth/client/${clientId}`);
        const application = res.data as application;
        console.log(application);
        setApplication(application);
        setForm(() => {
          const initial: Record<string, boolean> = { all: false };
          application.consentItems.forEach((item) => {
            initial[item.id] = false;
          });
          return initial;
        });
      } catch (e: any) {
        console.log(e.response);
        if (e.response?.status === 409) {
          window.location.href = `/oauth/connected?client_id=${clientId}&redirects_to=${redirectsTo}${state ? `&state=${state}` : ""}`;
          return;
        }
        setError(e.message);
      }
    };
    prepare();
  }, [clientId, responseType, redirectsTo]);

  const handleAllChange = (checked: boolean) => {
    if (!app) return;
    const next: Record<string, boolean> = {};
    app.consentItems.forEach((item) => {
      next[item.id] = checked;
    });
    setForm(next);
  };

  const handleItemChange = (key: string) => (checked: boolean) => {
    if (!app) return;
    const next = { ...form, [key]: checked };
    setForm(next);
  };

  const onSubmit = async () => {
    if (!app) return;
    setLoading(true);
    const agreed = [
      ...Object.entries(form ?? {})
        .filter(([_, value]) => value === true)
        .map(([key]) => key),
      ...app.mustAgree.map((agree) => agree.id.toString()),
    ];
    try {
      if (!clientId || !redirectsTo) return;
      const data: {
        client_id: string;
        agreed: string[];
        redirect_to: string;
        nonce?: string;
      } = {
        client_id: clientId,
        agreed: agreed,
        redirect_to: redirectsTo,
      };
      await debuggersApi.post("/public/oauth/authorization", data);
      window.location.href = `/oauth/connected?client_id=${clientId}&redirects_to=${redirectsTo}${state ? `&state=${state}` : ""}`;
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <main className="pb-10">
      <RequireLogin />
      <div className="max-w-[400px] mx-auto flex flex-col gap-2 my-24">
        {error ? (
          <div className="px-4 py-3 rounded mb-6 text-center flex flex-col items-center">
            <div>
              <Image src={errorImage} alt="error" width={200} />
            </div>
            <h2 className="text-2xl font-bold mt-5 mb-2">
              에러가 발생하였습니다.
            </h2>
            {error.split("<br/>").map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center gap-5 mb-5">
              {app ? (
                <Avatar
                  displayName={app?.title.slice(0, 2) ?? ""}
                  img={app.profile ?? ""}
                  size="lg"
                />
              ) : (
                <></>
              )}
              <h1 className="text-lg font-bold">
                {josa(app?.title ?? "", "이/가")} 다음 권한을 요청합니다
              </h1>
            </div>
            {app && app.mustAgree ? (
              <div>
                <h2 className="font-semibold">필수 동의 항목</h2>
                <div className="m-2 flex flex-col gap-1">
                  <p className="">
                    {app?.mustAgree.map((agree) => agree.display).join(", ")}
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {form ? (
              <div>
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">선택 동의 항목</h2>
                  <Checkbox
                    type="text"
                    text="전체 동의"
                    className="text-sm underline"
                    value={
                      app?.consentItems.every((item) => form?.[item.id]) ??
                      false
                    }
                    onChange={handleAllChange}
                  />
                </div>
                <div className="m-2 flex flex-col gap-1">
                  {app ? (
                    app.consentItems.map((item) => (
                      <div
                        className="flex justify-between items-center w-full"
                        key={item.id}
                      >
                        <p>{item.display}</p>
                        <Checkbox
                          type="text"
                          text="동의"
                          className="text-sm text-secondary-foreground underline"
                          value={form ? form[item.id] : false}
                          onChange={handleItemChange(item.id)}
                        />
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
            <button
              disabled={loading}
              className={
                loading
                  ? buttonVariants({ variants: "default" }) +
                    " text-center mt-5 flex justify-center"
                  : buttonVariants({ variants: "default" }) +
                    " text-center mt-5 cursor-pointer"
              }
              onClick={onSubmit}
            >
              {loading ? (
                <svg
                  aria-hidden="true"
                  className="text-primary animate-spin fill-white size-5"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "허용하기"
              )}
            </button>
            <p className="text-xs text-secondary-foreground">
              디버거즈의 계정 시스템(Oauth2)은 게임스쿨 외 제 3자에게 제공되지
              않습니다.
              <br />
              디버거즈 계정 시스템이 필요하시다면,{" "}
              <Link
                href={"https://ckdebuggers.channel.io/"}
                target="_blank"
                className="underline"
              >
                관리자
              </Link>
              에게 연락해 주세요.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
