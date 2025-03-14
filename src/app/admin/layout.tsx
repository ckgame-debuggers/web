import GlobalHeader from "@/components/section/global/global-header";
import GlobalFooter from "@/components/section/global/global-footer";
import AdminHeader from "@/components/section/admin/admin-header";
import AdminSideBar from "@/components/section/admin/admin-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminHeader />
      <div className="flex">
        <AdminSideBar />
        {children}
      </div>
      <GlobalFooter />
    </>
  );
}
