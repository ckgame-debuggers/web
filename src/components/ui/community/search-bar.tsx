import { josa } from "es-hangul";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const randomWords = [
  "게임스쿨",
  "갸오",
  "디버거즈",
  "청강대",
  "오늘 급식",
  "기숙사",
  "학생회",
  "동아리",
  "학과사무실",
  "도서관",
  "강의실",
  "교수님",
  "수강신청",
  "시간표",
  "과제 제출",
  "중간고사",
  "기말고사",
  "학생증",
  "휴학",
  "복학",
  "장학금",
  "학점",
  "출석체크",
  "학교 식당",
  "동아리방",
  "봉사활동",
  "교수님 추천",
  "동아리 모집",
  "학과 행사",
  "학생회비",
  "학생 할인",
  "셔틀버스 정보",
  "학생 식당",
  "만화도서관",
  "학교 주변 맛집",
  "기숙사",
  "학교 행사",
  "교양 수업",
];

export default function SearchBar() {
  const searchParam = useSearchParams();
  searchParam.get("q");
  const [value, setValue] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    window.location.href = `/community/search?q=${formData.get("query")}`;
  };
  useEffect(() => {
    if (window.location.pathname.startsWith("/community/search")) {
      const query = searchParam.get("q");
      setValue((query as string) ?? "");
    }
  }, []);

  return (
    <form
      className="bg-secondary rounded-full w-full pl-4 text-secondary-foreground h-fit flex"
      onSubmit={onSubmit}
    >
      <input
        id="community-search-input"
        name="query"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder={`${josa(randomWords[Math.floor(Math.random() * randomWords.length)], "이라/라")}고 검색해 보세요!`}
        className="focus:outline-non text-foreground w-full py-2"
      />
      <button
        type="button"
        className="p-3 rounded-full flex justify-center items-center cursor-text"
        onClick={() => {
          const input = document.querySelector("#community-search-input");
          if (input) {
            (input as HTMLInputElement).focus();
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
}
