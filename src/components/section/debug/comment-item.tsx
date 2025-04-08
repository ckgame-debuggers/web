import Avatar from "@/components/ui/avatar";

export default function DebugCommentItem({
  avatar,
  username,
  createdAt,
  content,
}: {
  avatar: string;
  username: string;
  createdAt: string;
  content: string;
}) {
  return (
    <div className="flex w-full gap-5">
      <Avatar
        img={avatar}
        displayName={username.slice(0, 2).toUpperCase()}
        size="lg"
      />
      <div className="flex flex-col gap-1">
        <div className="flex text-sm">
          <p>{username}</p>
          <p>・</p>
          <p>{createdAt}</p>
        </div>
        <p className="font-semibold">{content}</p>
      </div>
    </div>
  );
}
