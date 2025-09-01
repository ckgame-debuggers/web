"use client";

import { cn } from "@/lib/utils";

interface Avatar {
  imageUrl: string;
  userId?: string;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  const createDiscordProfileUrl = (userId: string) => {
    return `discord://discord.com/users/${userId}`;
  };

  const createDiscordWebProfileUrl = (userId: string) => {
    return `https://discord.com/users/${userId}`;
  };

  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => {
        return (
          <div
            key={index}
            rel="noopener noreferrer"
            onClick={(e) => {
              if (url.userId) {
                e.preventDefault();
                const appUrl = createDiscordProfileUrl(url.userId);
                const webUrl = createDiscordWebProfileUrl(url.userId);

                window.location.href = appUrl;

                setTimeout(() => {
                  if (document.hidden || (document as any).webkitHidden) {
                    return;
                  }
                  window.open(webUrl, "_blank");
                }, 3000);
              }
            }}
          >
            <img
              key={index}
              className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
              src={url.imageUrl}
              width={40}
              height={40}
              alt={`Avatar ${index + 1}`}
            />
          </div>
        );
      })}
      {(numPeople ?? 0) > 0 && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black">
          +{numPeople}
        </div>
      )}
    </div>
  );
};
