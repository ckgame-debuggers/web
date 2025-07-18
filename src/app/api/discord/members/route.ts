import { NextRequest, NextResponse } from "next/server";

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const SERVER_ID = "1349300589036699712";

export async function GET(request: NextRequest) {
  try {
    if (!DISCORD_BOT_TOKEN) {
      return NextResponse.json(
        { error: "Discord Bot Token not configured" },
        { status: 500 }
      );
    }

    // Discord Bot API를 사용하여 서버 멤버 정보 가져오기
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${SERVER_ID}/members?limit=100`,
      {
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Discord API Error: ${response.status}`);
    }

    const members = await response.json();

    // 필요한 정보만 추출
    const memberData = members.map((member: any) => ({
      id: member.user.id,
      username: member.user.username,
      avatar_url: member.user.avatar
        ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${member.user.discriminator % 5}.png`,
      status: member.status || "offline",
      nick: member.nick,
    }));

    return NextResponse.json({
      members: memberData,
      total: memberData.length,
    });
  } catch (error) {
    console.error("Discord API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Discord members" },
      { status: 500 }
    );
  }
}
