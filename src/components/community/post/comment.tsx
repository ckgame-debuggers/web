import CommunityPostCommentWriter from "./comment-writer";

export default function CommunityPostComment() {
  return (
    <div className="w-full border-border border rounded-md border-t border-t-border">
      <div>
        <h3 className="font-bold p-4">
          댓글 <span className="text-primary">3</span>개
        </h3>
      </div>
      <CommunityPostCommentWriter />
    </div>
  );
}
