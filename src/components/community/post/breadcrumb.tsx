import Link from "next/link";

interface PostBreadcrumbProps {
  categoryId?: number;
  categoryTitle?: string;
}

export default function PostBreadcrumb({
  categoryId,
  categoryTitle,
}: PostBreadcrumbProps) {
  return (
    <p className="text-sm text-primary font-semibold">
      <Link href="/community">커뮤니티</Link> /{" "}
      <Link href={`/community/category/${categoryId ?? 0}`}>
        {categoryTitle ?? "카테고리 확인 불가"}
      </Link>
    </p>
  );
}
