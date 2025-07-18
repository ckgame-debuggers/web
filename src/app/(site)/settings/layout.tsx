import SettingRemote from "@/components/section/settings/remote";
import RequireLogin from "@/components/util/require-login";

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RequireLogin />
      <SettingRemote>{children}</SettingRemote>
    </>
  );
}
