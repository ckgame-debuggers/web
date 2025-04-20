"use client";
import Avatar from "@/components/ui/avatar";
import useUserStore from "@/store/user";
import Link from "next/link";

export default function ProfileSetting() {
  const { user } = useUserStore();

  return (
    <>
      <div className="p-5 mt-10 flex justify-between items-center flex-col-reverse gap-5 md:flex-row">
        <div className="text-center md:text-start flex flex-col items-center md:items-start">
          <div className="flex items-center">
            <h3 className="text-lg">{user.username}</h3>
            <p className="text-xs scale-80 bg-secondary-background rounded-full w-fit py-1 px-3">
              {user.email}
            </p>
          </div>
          <p className="text-secondary-foreground mt-2 text-sm">
            디버거즈 계정과 관련된 설정들을 쉽게 관리해 보세요.
          </p>
        </div>
        <Avatar
          displayName={user.schoolNumber.slice(-3)}
          size="lg"
          className="w-14 h-14"
          img="/resources/default-profile.png"
        />
      </div>
      <Link
        href={"/settings/account"}
        className="w-full flex flex-col border-border border rounded-md mt-10"
      >
        <div className="border-border border-b w-full p-5 flex justify-between">
          <p>계정 설정</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <div>
          <div className="flex pt-5 px-5 pb-3 justify-between items-center">
            <p>학번</p>
            <p className="text-sm text-secondary-foreground">
              {user.schoolNumber}
            </p>
          </div>
          <div className="flex px-5 py-3 justify-between items-center">
            <p>이메일</p>
            <p className="text-sm text-secondary-foreground">{user.email}</p>
          </div>
          <div className="flex px-5 pt-3 pb-5 justify-between items-center">
            <p>닉네임</p>
            <p className="text-sm text-secondary-foreground">{user.username}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
