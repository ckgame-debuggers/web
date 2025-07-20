import Link from "next/link";

export default function CommunityAdvertise() {
  return (
    <Link
      href={"https://ckdebuggers.channel.io"}
      target="_blank"
      className="block rounded-md overflow-hidden h-fit mb-5 shadow-2xl dark:shadow-white/2"
    >
      <img
        src="/advertisement/default.png"
        className="w-full h-28 object-cover"
      />
    </Link>
  );
}
