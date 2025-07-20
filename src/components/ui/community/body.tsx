"use client";
import CommunityAdvertise from "@/components/community/global/advertise";
import CommunitySidebar from "./sidebar";
import CommunitySubSidebar from "./sub-sidebar";

export default function CommunityBody({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (window.location.pathname.startsWith("/community/banned"))
    return <>{children}</>;

  return (
    <div
      className="flex justify-between px-5 md:px-10 gap-3 py-10 h-fit"
      style={{ marginBottom: "calc(var(--spacing) * -10)" }}
    >
      <div className="hidden lg:block">
        <CommunitySidebar />
      </div>
      <div className="flex-1">
        <CommunityAdvertise />
        {children}
      </div>
      <div className="hidden md:block">
        <CommunitySubSidebar />
      </div>
    </div>
  );
}
