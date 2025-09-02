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

export default function DebuggersActions() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>학생회 메뉴</DropdownMenuLabel>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>글 관리</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem>글 수정하기</DropdownMenuItem>
            <DropdownMenuItem className="text-red-400 font-bold">
              글 완전 삭제 (이후 접근 불가)
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>사용자 관리</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem className="text-red-400 font-bold">
              이용 금지하기
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  );
}
