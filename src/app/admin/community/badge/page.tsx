"use client";
import ImageUploader from "@/components/ui/image-upload";

export default function AdminBadges() {
  return (
    <main className="p-10">
      <h1 className="font-bold text-2xl">공지사항 관리</h1>
      <ImageUploader onUpload={(e) => console.log(e.imageURL)} />
    </main>
  );
}
