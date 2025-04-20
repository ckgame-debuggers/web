import SettingRemote from "@/components/section/settings/remote";

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SettingRemote>{children}</SettingRemote>;
}
