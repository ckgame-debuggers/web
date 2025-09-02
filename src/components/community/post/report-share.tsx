"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

export default function ReportShareMenu() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>커뮤니티</DropdownMenuLabel>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>신고하기</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem>글 내용 신고</DropdownMenuItem>
            <DropdownMenuItem>기능 부정 사용 신고</DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href="https://ckdebuggers.channel.io/" target="_blank">
              <DropdownMenuItem>기타...</DropdownMenuItem>
            </Link>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
      <DropdownMenuItem
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.success("URL이 클립보드에 복사되었습니다.");
        }}
      >
        공유하기
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
