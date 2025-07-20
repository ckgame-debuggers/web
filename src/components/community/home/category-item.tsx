import Link from "next/link";

export default function CommunityHomeCategoryItem({
  title,
  category,
  id,
}: {
  title: string;
  category: string;
  id: number;
}) {
  return (
    <Link
      className="px-4 py-3 flex items-center gap-4 hover:bg-sidebar/50 dark:hover:bg-white/2"
      href={`/community/post/${category}/${id}`}
    >
      <p className="text-sm">
        {title.length > 13 ? title.slice(0, 13) + "..." : title}
      </p>
    </Link>
  );
}
