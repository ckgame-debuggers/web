"use client";
import { DebuggersAPI } from "@/components/util/api";
import CommuntiyHomeCategoryBody from "./category-body";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  isHot: boolean;
  isUnknown: boolean;
  permission: number;
  points: number;
  thumbnail: string;
  writer: {
    id: number;
    exp: number;
    point: number;
    banExpireAt: string | null;
    description: string;
    isBanned: boolean;
  };
}

interface Category {
  id: number;
  title: string;
  description: string;
}

export default function CommunityHomeCategoryLayout() {
  const debuggersAPI = DebuggersAPI.getInstance();
  const [categories, setCategories] = useState<
    { category: Category; posts: Post[] }[]
  >([]);

  useEffect(() => {
    const prepare = async () => {
      const res = await debuggersAPI.get("/community/recents");
      setCategories(res.data.data);
    };
    prepare();
  }, []);

  return (
    <div className="my-5 grid grid-cols-1 lg:grid-cols-2 gap-2">
      {categories.map((c, i) => (
        <CommuntiyHomeCategoryBody
          key={i}
          title={c.category.title}
          id={c.category.id}
          posts={c.posts}
        />
      ))}
    </div>
  );
}
