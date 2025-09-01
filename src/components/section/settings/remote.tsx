import Link from "next/link";
import SettingRemoteUrl from "./setting-remote-url";
import RequireLogin from "@/components/util/require-login";

export default function SettingRemote({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row pt-5">
      <RequireLogin />
      <div className="flex flex-col min-w-40 md:sticky top-0 h-fit">
        <SettingRemoteUrl href="/settings">홈</SettingRemoteUrl>
        <SettingRemoteUrl href="/settings/account">계정 정보</SettingRemoteUrl>
        <SettingRemoteUrl href="/settings/crew">소모임</SettingRemoteUrl>
        <SettingRemoteUrl href="/settings/community">커뮤니티</SettingRemoteUrl>
      </div>
      <div className="flex-1 px-10">{children}</div>
    </div>
  );
}
