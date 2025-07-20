import CommunityHomeCategoryLayout from "@/components/community/home/category-layout";
import CommunityHomeHot from "@/components/community/home/hot";

export default function CommunityHome() {
  return (
    <main>
      <CommunityHomeHot />
      <CommunityHomeCategoryLayout />
    </main>
  );
}
