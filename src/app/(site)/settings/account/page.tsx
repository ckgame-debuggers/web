import SettingEmailChange from "@/components/section/settings/account/email";
import SettingFullnameChange from "@/components/section/settings/account/fullname";
import SettingPhoneNumberChange from "@/components/section/settings/account/phonenumber";
import SettingUsernameChange from "@/components/section/settings/account/username";
import useUserStore from "@/store/user";

export default function AccountSetting() {
  const { user } = useUserStore();
  return (
    <main className="py-5">
      <div>
        <h1 className="font-semibold text-2xl">계정 설정</h1>
        <p className="mt-1 text-secondary-foreground">
          디버거즈와 관련된 계정 정보들을 저장하고 관리합니다.
        </p>
      </div>
      <div className="flex flex-col gap-4 my-10">
        <h2 className="font-semibold text-xl">로그인 설정</h2>
        <div className="flex flex-col">
          <SettingEmailChange />
          <Devider />
          <SettingUsernameChange />
        </div>
      </div>
    </main>
  );
}

function Devider() {
  return <div className="w-full h-[1px] mx-auto bg-secondary-background"></div>;
}
