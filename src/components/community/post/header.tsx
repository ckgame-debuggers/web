"use client";
import { Post } from "@/app/community/category/[id]/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MenuTriggerButton from "@/components/community/post/menu-trigger";
import OwnerActions from "@/components/community/post/owner-actions";
import ReportShareMenu from "@/components/community/post/report-share";
import useCommunityStore from "@/store/community";
import useUserStore from "@/store/user";
import { useMemo } from "react";
import DebuggersActions from "./debuggers-actions";

interface PostHeaderProps {
  title: string;
  post: Post;
}

export default function PostHeader({ title, post }: PostHeaderProps) {
  const { permission } = useUserStore();
  const { userId } = useCommunityStore();

  const isMyPost = useMemo(() => {
    return userId === post.writer?.id || permission >= 3;
  }, [permission, userId, post]);

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold my-1">{title}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuTriggerButton />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52" align="end">
          {permission > 2 ? <DebuggersActions /> : <></>}
          {isMyPost ? <OwnerActions postId={post.id} /> : <></>}
          <ReportShareMenu />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
