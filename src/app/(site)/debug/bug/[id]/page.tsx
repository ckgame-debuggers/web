import DebugCommentBody from "@/components/section/debug/comment-body";
import CommentWriter from "@/components/section/debug/comment-writer";
import DebuggersAnswer from "@/components/section/debug/debuggers-answer";
import ReactHtmlParser from "react-html-parser";

export default function DebugItem() {
  return (
    <main>
      <div className="text-center py-5">
        <p className="text-primary">게임스쿨 버그 - #1</p>
        <h1 className="text-3xl font-black">용석이형이 운동을 안 해요</h1>
      </div>
      <div className="font-semibold max-w-[800px] px-5 mx-auto my-10">
        <div className="ql-snow">
          <div className="ql-editor">{ReactHtmlParser("formData.content")}</div>
        </div>
      </div>
      <div className="w-full max-w-[800px] mx-auto h-[1px] bg-border"></div>
      <DebuggersAnswer />
      <div className="max-w-[800px] mx-auto p-3 border border-border rounded-md">
        <CommentWriter />
      </div>
      <DebugCommentBody />
    </main>
  );
}
