"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DebuggersAPI } from "@/components/util/api";
import useUserStore from "@/store/user";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { UAParser } from "ua-parser-js";

export default function LoginPage() {
  const { isLoggedIn } = useUserStore();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState("undefined");
  const [formData, setFormData] = useState({
    schoolNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    schoolNumber: "",
    password: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = redirectTo ?? "/";
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            console.log(position);
            setLocation(
              `${position.coords.latitude} ${position.coords.longitude}`
            );
          } catch (error) {
            setLocation("undefined");
          }
        },
        () => {
          setLocation("undefined");
        }
      );
    } else {
      setLocation("undefined");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      schoolNumber: formData.schoolNumber === "" ? "학번을 입력해주세요." : "",
      password: formData.password === "" ? "비밀번호를 입력해주세요." : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    const uaParser = new UAParser(navigator.userAgent);
    const deviceName = uaParser.getOS().name || "undefined";
    console.log(deviceName);

    setIsLoading(true);
    try {
      await DebuggersAPI.getInstance().login({
        email: `${formData.schoolNumber}${
          formData.schoolNumber.includes("@chungkang.academy")
            ? ""
            : "@chungkang.academy"
        }`,
        password: formData.password,
        deviceName,
        location,
      });
      window.location.href = redirectTo ?? "/";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorText("학번 또는 비밀번호가 일치하지 않습니다.");
        } else if (
          error.response?.data.message === "User not found with email"
        ) {
          setErrorText("해당 학번으로 가입된 계정이 없습니다.");
        } else {
          setErrorText(
            `서버에 에러가 발생하였습니다 : ${error.response?.data.message}`
          );
        }
      }
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  return (
    <main>
      <form
        className="max-w-[500px] h-[50vh] flex flex-col gap-10 mx-5 sm:mx-auto my-20"
        onSubmit={handleSubmit}
      >
        <h1 className="font-semibold text-2xl">디버거즈에 로그인하세요.</h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <div>
              <Input
                label="학번 혹은 이메일"
                name="id"
                value={formData.schoolNumber}
                onChange={handleInputChange("schoolNumber")}
              />
              {errors.schoolNumber && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.schoolNumber}
                </p>
              )}
            </div>
            <div>
              <Input
                label="비밀번호"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>
          </div>
        </div>
        <Button type="submit" className="cursor-pointer flex justify-center">
          {!isLoading ? (
            "로그인"
          ) : (
            <div
              role="status"
              className="transition-height duration-300 ease-in-out mx-auto"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-transparent animate-spin fill-primary-foreground"
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
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </Button>
        {errorText !== "" && (
          <p className="text-sm text-red-500 mt-[-20px]">{errorText}</p>
        )}
        <div className="text-sm mt-[-20px] flex flex-col gap-5 items-center md:flex-row md:justify-between">
          <p>
            계정이 없으신가요?{" "}
            <Link href={"/register"} className="underline hover:text-primary">
              회원가입
            </Link>
          </p>
          <p>
            아니면..{" "}
            <Link
              href={"/find/password"}
              className="underline hover:text-primary"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
