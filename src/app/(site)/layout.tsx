import GlobalHeader from "@/components/section/global/global-header";
import GlobalFooter from "@/components/section/global/global-footer";
import ChannelTalk from "@/components/ui/channeltalk";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ChannelTalk />
      <GlobalHeader />
      {children}
      <GlobalFooter />
    </>
  );
}
