"use client";
import { DebuggersAPI } from "@/components/util/api";
import Link from "next/link";
import { useEffect, useState } from "react";

type advertise = {
  thumbnail: string;
  href: string;
};

export default function CommunityAdvertise() {
  const [advertise, setAdvertise] = useState<advertise | undefined>();

  const debuggersAPI = DebuggersAPI.getInstance();
  useEffect(() => {
    const prepare = async () => {
      const data = (await debuggersAPI.get("/community/advertise")).data.data;
      setAdvertise(data as advertise);
    };
    prepare();
  }, []);
  return (
    <Link
      href={advertise?.href || ""}
      target="_blank"
      className="block rounded-md overflow-hidden h-fit mb-5 shadow-2xl dark:shadow-white/2"
    >
      <img src={advertise?.thumbnail} className="w-full h-28 object-cover" />
    </Link>
  );
}
