import { Button } from "@/components/ui/button";
import useUserStore from "@/store/user";
import { useRef, useEffect } from "react";

export default function CommunityPostCommentWriter() {
  const { profile } = useUserStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  return (
    <div className="w-full border-border border flex p-3 rounded-md border-t border-t-border">
      <div>
        <img
          src={profile}
          width={50}
          className="rounded-full border border-border mr-4"
        />
      </div>
      <div className="flex-1 flex flex-col items-end">
        <div className="w-full rounded-md overflow-hidden border-border border">
          <textarea
            ref={textareaRef}
            className="bg-secondary w-full p-2 min-h-[100px] h-auto resize-none"
            onChange={adjustHeight}
          />
        </div>
        <div className="mt-2 flex gap-1">
          <Button className="rounded-full px-8 font-bold" size="sm">
            작성
          </Button>
        </div>
      </div>
    </div>
  );
}
