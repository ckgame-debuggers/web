import GlobalHeader from "@/components/section/global/global-header";
import GlobalFooter from "@/components/section/global/global-footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GlobalHeader />
      {children}
      <GlobalFooter />
    </>
  );
}
