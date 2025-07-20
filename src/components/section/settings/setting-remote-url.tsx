"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SettingRemoteUrl({
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  children,
}: {
  href: string;
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  return (
    <Link
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
      className="py-2 px-5 rounded-sm transition-colors"
      style={{
        backgroundColor: href === pathname ? "var(--primary)" : "inherit",
        color: href === pathname ? "white" : "inherit",
      }}
      onMouseEnter={(e) => {
        if (href !== pathname) {
          e.currentTarget.style.backgroundColor = "var(--secondary-background)";
        }
      }}
      onMouseLeave={(e) => {
        if (href !== pathname) {
          e.currentTarget.style.backgroundColor = "inherit";
        }
      }}
    >
      {children}
    </Link>
  );
}
