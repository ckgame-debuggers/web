import Link from "next/link";

export default function GlobalFooter() {
  return (
    <footer className="border-t border-t-border text-secondary-foreground py-10 px-5 mt-10">
      <div className="px-5 max-w-[1200px] mx-auto">
        <p>
          Copyright © 2024 - {new Date().getFullYear()}{" "}
          <Link href={"/"} className="cursor-pointer">
            Debuggers
          </Link>
          . All rights reserved
        </p>
      </div>
    </footer>
  );
}
