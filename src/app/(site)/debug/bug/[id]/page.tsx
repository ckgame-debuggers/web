import DebugCommentBody from "@/components/section/debug/comment-body";
import CommentWriter from "@/components/section/debug/comment-writer";
import DebuggersAnswer from "@/components/section/debug/debuggers-answer";

export default function DebugItem() {
  return (
    <main>
      <div className="text-center py-5">
        <p className="text-primary">게임스쿨 버그 - #1</p>
        <h1 className="text-3xl font-black">용석이형이 운동을 안 해요</h1>
      </div>
      <div className="font-semibold max-w-[800px] px-5 mx-auto my-10">
        <p>안녕하세요, 게임스쿨 학생입니다.</p>
        <p>요즘 제게 고민이 하나 있는데요,</p>
        <p>그건 바로 용석이형이 운동을 정말 조금도 하지 않는다는 것입니다.</p>
        <p>이러다 용석이형이 성인병 3종세트를 모두 모으게 되고,</p>
        <p>30살을 넘기지 못할 것 같아 고민입니다.</p>
        <p>어떻게 해야 할까요 ㅠㅠ정.</p>
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
