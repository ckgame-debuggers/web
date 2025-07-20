"use client";
import { Button } from "@/components/ui/button";

export default function LogoutPage() {
  const cancel = () => {
    window.history.back();
  };

  return (
    <main className="py-24">
      <div className="w-fit mx-auto flex flex-col gap-5">
        <h1 className="text-2xl font-bold">로그아웃을 진행할까요?</h1>
        <div className="flex gap-1 w-full">
          <Button
            className="flex-1 cursor-pointer"
            variants="outline"
            onClick={cancel}
          >
            취소
          </Button>
          <Button className="flex-1 cursor-pointer" variants="destructive">
            로그아웃
          </Button>
        </div>
      </div>
    </main>
  );
}
