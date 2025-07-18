"use client";
import Image from "next/image";
import errorImage from "$/resources/error.png";
import { DebuggersAPI } from "@/components/util/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Avatar from "@/components/ui/avatar";
import { josa } from "es-hangul";
import RequireLogin from "@/components/util/require-login";

type connectInfo = {
  code: string;
  username: string;
  client: {
    title: string;
    profile: string;
    mustAgree: { display: string }[];
    consentItems: { id: string; display: string }[];
  };
  agreed: string;
};

export default function OauthConnectedPage() {
  const debuggersApi = DebuggersAPI.getInstance();
  const searchParams = useSearchParams();
  const clientId = searchParams.get("client_id");
  const redirectsTo = searchParams.get("redirects_to");
  const state = searchParams.get("state");
  const [error, setError] = useState<string | null>();
  const [application, setApplication] = useState<connectInfo>();
  const [fixedUrl, setFixedUrl] = useState<string>("");

  useEffect(() => {
    const prepare = async () => {
      if (!clientId || !redirectsTo) {
        setError("잘못된 접근입니다. (필수 파라미터 누락)");
        return;
      } else {
        setError(null);
      }

      try {
        const response = await debuggersApi.get(
          `/public/oauth/connection?client=${encodeURIComponent(clientId ?? "")}&redirect_to=${encodeURIComponent(redirectsTo ?? "")}`
        );
        setApplication(response.data as connectInfo);
        setFixedUrl(
          new URL(redirectsTo).toString() +
            (redirectsTo.includes("?") ? "&" : "?") +
            `code=${response.data?.code}${state ? `&state=${state}` : ""}`
        );
      } catch (e: any) {
        if (e.response?.data) {
          console.log(e.response);
          setError(e.response.data.message);
        } else {
          setError(e.message);
        }
      }
    };

    prepare();
  }, [clientId, redirectsTo, debuggersApi]);

  const client = application?.client;

  return (
    <main className="flex flex-col max-w-[400px] mx-auto my-24 pb-10 gap-5">
      <RequireLogin />
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
          <div className="flex items-center gap-5">
            {application ? (
              <Avatar
                displayName={client?.title.slice(0, 2) ?? ""}
                img={client?.profile ?? ""}
                size="lg"
              />
            ) : (
              <></>
            )}
            <h1 className="text-lg font-bold">
              {josa(client?.title ?? "", "와/과")} 연결되었습니다.
            </h1>
          </div>
          {client ? (
            <p className="text-secondary-foreground break-keep">
              {application.username}님의 계정이{" "}
              {josa(client?.title ?? "", "와/과")} 연결되었습니다.
              <br />
              동의하신 {application.agreed} 정보가 해당 사용자에게 제공됩니다.
            </p>
          ) : (
            <></>
          )}
          <Link
            href={fixedUrl}
            className={
              buttonVariants({ variants: "default" }) +
              " text-center cursor-pointer"
            }
          >
            계속 진행하기
          </Link>
        </>
      )}
    </main>
  );
}
