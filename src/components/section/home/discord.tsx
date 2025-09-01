"use client";

import { useEffect, useState, useMemo } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { prettyConsole } from "@/lib/console-utils";

type DiscordMember = {
  id: string;
  username: string;
  avatar_url: string;
  status: string;
  channel_id?: string;
  nick?: string;
};

type DiscordChannel = {
  id: string;
  name: string;
  position: number;
};

type DiscordData = {
  instant_invite: string;
  members: DiscordMember[];
  channels: DiscordChannel[];
};

type DiscordProfile = {
  imageUrl: string;
};

export default function HomeDiscordSection() {
  const [discord, setDiscord] = useState<DiscordData | null>(null);
  const [avatars, setAvatars] = useState<DiscordProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const SERVER_ID = "1349300589036699712";

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://discordapp.com/api/servers/${SERVER_ID}/embed.json`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Discord API Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setDiscord(data);
        prettyConsole.discord("디스코드 정보를 불러왔습니다.");
        prettyConsole.info(
          `총 ${data.members?.length || 0}명의 멤버가 있습니다.`
        );
        prettyConsole.table(data.members?.slice(0, 5) || [], "최근 접속 멤버");

        const newAvatars = data?.members
          .slice(0, 5)
          .map((member: DiscordMember) => ({
            imageUrl: member.avatar_url,
            profileUrl: `/discord`,
          }));
        setAvatars(newAvatars || []);
        setLoading(false);
      })
      .catch((e) => {
        prettyConsole.error("Discord API 오류: " + e.message);
        setError("디스코드 정보를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, []);

  const onlineMembers = useMemo<DiscordMember[]>(() => {
    if (!discord?.members) return [];
    return discord.members;
  }, [discord]);

  const displayedMembers = useMemo<DiscordMember[]>(() => {
    return onlineMembers.slice(0, 15);
  }, [onlineMembers]);

  return (
    <section className="gap-10 w-full mb-[-calc(var(--spacing)*10)]">
      <div className="px-18 max-w-[1200px] mx-auto pt-20 justify-between flex flex-col gap-10">
        <div className="flex-1 flex justify-between">
          <div>
            <h3 className="font-bold text-3xl py-5">디스코드에 참여하세요!</h3>
            <p>
              디버거즈는 게임스쿨 디스코드 서버를 운영하고 있습니다.
              <br />
              게임스쿨 학생이라면 누구나 참여할 수 있어요!
              <br />
              아래 버튼을 통해 수많은 게임스쿨 학생들과 함께해 보세요.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 justify-start">
            <Link
              className={buttonVariants({}) + " mt-10 block w-fit px-5 h-fit"}
              href={"/discord"}
              target="_blank"
              rel="noopener noreferrer"
            >
              참여하기
            </Link>
            {loading && (
              <div className="text-center text-muted-foreground py-8">
                불러오는 중...
              </div>
            )}
            {error && (
              <div className="text-center text-red-500 py-8">{error}</div>
            )}
            {discord && (
              <AvatarCircles
                numPeople={discord.members.length - 5}
                avatarUrls={avatars}
              />
            )}
          </div>
        </div>
        <div className="rounded-t-lg flex-1 bg-background overflow-hidden w-full h-fit min-w-[320px]"></div>
      </div>
    </section>
  );
}
