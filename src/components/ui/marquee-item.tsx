"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeMarqueeItem({
  thumbnail,
  href,
  title,
}: {
  thumbnail: string;
  href: string;
  title: string;
}) {
  return (
    <div className="relative py-10">
      <Link
        href={href}
        target="_blank"
        className={`px-10 flex flex-col items-center gap-4 cursor-pointer group/marquee-item`}
      >
        <img
          className={`w-18 h-18 object-cover rounded-full group-hover/marquee-item:scale-125 shadow-md transition-transform`}
          src={thumbnail}
        />
        <p className="text-sm font-bold">{title}</p>
      </Link>
    </div>
  );
}
