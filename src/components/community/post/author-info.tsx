import useCommunityStore from "@/store/community";
import useUserStore from "@/store/user";
import { useMemo } from "react";

interface User {
  username?: string;
  profile?: string;
  color?: string;
}

interface Writer {
  id: number;
  user?: User;
}

interface Badge {
  img?: string;
}

interface PostAuthorInfoProps {
  writer?: Writer;
  badge?: Badge;
  isUnknown?: boolean;
  createdAt: string | Date;
}

export default function PostAuthorInfo({
  writer,
  badge,
  isUnknown,
  createdAt,
}: PostAuthorInfoProps) {
  const { permission } = useUserStore();
  const { userId } = useCommunityStore();

  const isUnknownViewable = useMemo(() => {
    console.log(permission, userId);
    return permission >= 3;
  }, [permission, userId, writer]);

  const writerProfile = useMemo(() => {
    if (isUnknown && !isUnknownViewable) {
      return "/resources/profile/unknown.png";
    }

    if (!writer?.user?.profile || writer?.user.profile === "") {
      return `/resources/profile/${writer?.user?.color ?? ""}.png`;
    }

    return writer.user.profile;
  }, [writer, isUnknown, isUnknownViewable]);

  return (
    <div className="mt-4 flex gap-3 items-center font-bold">
      <div className="relative w-fit h-fit">
        <img
          src={writerProfile}
          width={35}
          className="rounded-md"
          alt="프로필 이미지"
        />
        {/* <img
          src={badge?.img ?? "none"}
          width={35}
          className="absolute right-[-20%] bottom-[-20%] w-5"
          style={{
            filter:
              "drop-shadow(2px 0 0 var(--background)) drop-shadow(-2px 0 0 var(--background)) drop-shadow(0 2px 0 var(--background)) drop-shadow(0 -2px 0 var(--background))",
          }}
          alt="프로필 뱃지"
        /> */}
      </div>
      <div className="flex flex-col justify-center">
        <p>
          {isUnknown && !isUnknownViewable ? "익명" : writer?.user?.username}
        </p>
        <p className="text-xs text-black/40 dark:text-white/50">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
