"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminSideBarItem({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const setActive = () => {
      setIsActive(window.location.pathname === href);
    };

    setActive();
  }, [pathname]);

  return (
    <div className="py-1 text-sm" id={`admin-redirectto-${href}`}>
      <Link
        href={href}
        style={{
          color: isActive ? "var(--primary)" : "",
        }}
      >
        {title}
      </Link>
    </div>
  );
}
