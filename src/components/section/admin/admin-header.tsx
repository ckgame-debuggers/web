"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="px-3 py-5 flex items-center justify-between border-b border-b-primary">
      <div>
        <h1 className="uppercase">Debuggers Admin</h1>
      </div>
      <div>
        <Link
          href={"/"}
          className={buttonVariants({
            variants: "outline",
          })}
        >
          Home
        </Link>
      </div>
    </header>
  );
}
