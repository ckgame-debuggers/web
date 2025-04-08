export default function CommentWriter() {
  return (
    <div className="w-full">
      <div className="mb-4 mt-2">
        <h4 className="mb-2 font-bold">댓글을 남겨보세요</h4>
        <p className="text-sm">
          202513158 이규연(으)로 로그인되어 있습니다.{" "}
          <span className="underline cursor-pointer hover:text-primary">
            로그아웃
          </span>
        </p>
      </div>
      <textarea className="border w-full border-border rounded-md p-3"></textarea>
      <div className="w-full flex justify-end">
        <button className="bg-primary text-primary-foreground px-10 py-2 rounded-md mt-5">
          작성
        </button>
      </div>
    </div>
  );
}
