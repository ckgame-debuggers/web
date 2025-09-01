import Link from "next/link";

export default function CommunityHomeCategoryItem({
  title,
  id,
}: {
  title: string;
  id: number;
}) {
  return (
    <Link
      className="px-4 py-3 flex items-center gap-4 hover:bg-sidebar/50 dark:hover:bg-white/2"
      href={`/community/post/${id}`}
    >
      <p className="text-sm">
        {title.length > 13 ? title.slice(0, 13) + "..." : title}
      </p>
    </Link>
  );
}
