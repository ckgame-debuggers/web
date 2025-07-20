"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function DiscordPage() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "https://discord.gg/n9z8hwZjuh";
    }, 3000);
  }, []);

  return (
    <main className="flex items-center justify-center py-10 flex-col gap-5">
      <h1 className="text-3xl font-bold">디스코드 앱으로 계속합니다..</h1>
      <p className="text-center text-secondary-foreground">
        3초 뒤 사용자 클라이언트가 자동으로 리다이랙트됩니다.
        <br />
        혹시 자동으로 진행이 되지 않는다면,{" "}
        <Link
          className="underline hover:text-primary"
          href={"https://discord.gg/invite/n9z8hwZjuh"}
          target="_blank"
        >
          여기를 눌러
        </Link>
        계속해 주세요.
      </p>
    </main>
  );
}
