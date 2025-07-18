import CommunitySidebar from "./sidebar";

export default function CommunityBody({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex justify-between p-10"
      style={{ marginBottom: "calc(var(--spacing) * -10)" }}
    >
      <div></div>
      <div>{children}</div>
      <CommunitySidebar />
    </div>
  );
}
