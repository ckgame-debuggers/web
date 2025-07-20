import CommuntiyHomeCategoryBody from "./category-body";

export default function CommunityHomeCategoryLayout() {
  return (
    <div className="my-5 grid grid-cols-1 lg:grid-cols-2 gap-2">
      <CommuntiyHomeCategoryBody id={1} title="자유" />
      <CommuntiyHomeCategoryBody id={1} title="질문" />
      <CommuntiyHomeCategoryBody id={1} title="자휴게시판" />
    </div>
  );
}
