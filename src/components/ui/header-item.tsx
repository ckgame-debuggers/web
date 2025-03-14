"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderItems({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [path, setPath] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    const handlePathChange = () => {
      setPath(window.location.pathname);
    };

    handlePathChange();
  }, [pathname]);

  return (
    <Link
      href={href}
      className="border-t-background hover:border-t-primary border-t-5 h-full px-5 py-8 hover:text-primary"
      style={{
        borderTopColor: path.startsWith(href)
          ? "var(--primary)"
          : "var(--background)",
      }}
    >
      {children}
    </Link>
  );
}
