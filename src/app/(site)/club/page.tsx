import Link from "next/link";

export default function Club() {
  return (
    <main className="mx-auto max-w-[1200px]">
      <div className=" my-14 text-center">
        <h1 className="font-bold text-3xl mb-5">전공 동아리</h1>
        <p>게임스쿨에서만 만나볼 수 있는 동아리들을 찾아보세요.</p>
      </div>
      <div className="flex justify-between items-center my-5">
        <h3 className="font-bold text-lg">0개의 동아리를 발견했어요!</h3>
      </div>
      <div className="text-center my-20">
        <p className="text-3xl font-semibold mb-3">
          동아리 소개 페이지는 학생회가 관리할 거에요.
        </p>
        <p>
          동아리를 등록하고 싶은 전공 동아리 기장분들은 학생회장에게 말씀해
          주세요!
        </p>
      </div>
    </main>
  );
}

function ClubItem({
  title,
  href,
  createdAt,
  bg,
}: {
  title: string;
  href: string;
  createdAt: string;
  bg: string;
}) {
  return (
    <Link href={href} className="group/crew cursor-pointer text-white">
      <div
        className=" w-full h-52 relative overflow-hidden"
        style={{
          background: `url(${bg})`,
          backgroundSize: "cover",
        }}
      >
        <div className="z-10 p-5 absolute bottom-[-45px] group-hover/crew:bottom-0 transition-all">
          <p className="font-semibold text-lg scale-0 group-hover/crew:scale-80 transition-transform origin-bottom-left">
            전공 동아리
          </p>
          <h4 className="font-bold text-2xl">{title}</h4>
          <p className="text-sm mt-5">{createdAt}</p>
        </div>
        <div className="z-0 bg-black absolute left-0 top-0 w-full h-full opacity-30 group-hover/crew:opacity-60 transition-opacity"></div>
      </div>
    </Link>
  );
}
