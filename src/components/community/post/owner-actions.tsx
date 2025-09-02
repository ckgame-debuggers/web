"use client";

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DebuggersAPI } from "@/components/util/api";
import { toast } from "sonner";

interface OwnerActionsProps {
  postId: number | string;
}

export default function OwnerActions({ postId }: OwnerActionsProps) {
  const debuggersAPI = DebuggersAPI.getInstance();

  return (
    <>
      <DropdownMenuLabel>글 관리</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => {
            window.location.href = `/community/post/${postId}/edit`;
          }}
        >
          글 업데이트
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            (window.location.href =
              "/carrot?word=당근할아버지당근을뺏으면그냥할아버지")
          }
        >
          당근 흔들기
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            try {
              await debuggersAPI.delete(`/community/post/${postId}`);
              window.location.href = "/community";
            } catch (e: any) {
              toast.error(e.message);
            }
          }}
          className="text-red-400 font-bold"
        >
          글 삭제하기
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  );
}
