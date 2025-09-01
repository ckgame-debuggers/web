import Link from "next/link";

export default function GlobalFooter() {
  return (
    <footer className="border-t border-t-border py-10 px-5 flex flex-col gap-3 w-full pb-25 items-center">
      <ul className="grid grid-cols-2 md:grid-cols-4 py-4 w-full max-w-[1200px] px-5 mx-auto">
        <li>
          <h5>Products</h5>
          <div className="my-3 flex flex-col text-sm text-secondary-foreground">
            <Link href={"/"}>디버거즈 웹 서비스</Link>
            <Link href={"/community"}>디버거즈 커뮤니티</Link>
            <Link href={"http://wiki.ckdebuggers.com/"}>청강 게임위키</Link>
          </div>
        </li>
        <li>
          <h5>Ck Game</h5>
          <div className="my-3 flex flex-col text-sm text-secondary-foreground">
            <Link href={"https://www.ck.ac.kr/school-department/game/"}>
              전공 소개
            </Link>
            <Link href={"/club"}>전공 동아리</Link>
            <Link href={"https://ckchronicle.com/"}>크로니클</Link>
          </div>
        </li>
        <li>
          <h5>Resources</h5>
          <div className="my-3 flex flex-col text-sm text-secondary-foreground">
            <Link href={"http://developers.ckdebuggers.com/"}>개발자 문서</Link>
            <Link href={"/community"}>디버거즈 커뮤니티</Link>
            <Link href={"/credit"}>크레딧</Link>
          </div>
        </li>
        <li>
          <h5>Social</h5>
          <div className="my-3 flex flex-col text-sm text-secondary-foreground">
            <Link href={"http://wiki.ckdebuggers.com/"}>디버거즈 커뮤니티</Link>
          </div>
        </li>
      </ul>
      <div className="px-5 max-w-[1200px] text-secondary-foreground w-full mx-auto flex justify-between">
        <p>
          Copyright © 2024 - {new Date().getFullYear()}{" "}
          <Link href={"/"} className="cursor-pointer">
            Debuggers
          </Link>
          . All rights reserved
        </p>
        <div className="flex gap-2">
          <Link href={"https://developers.ckdebuggers.com/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
          </Link>
          <Link href="https://github.com/ckgame-debuggers">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link href="https://instagram.com/ck_debugs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={0.01}
              stroke="currentColor"
              className="size-6"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
