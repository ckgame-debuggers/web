export default function SearchBar() {
  return (
    <div className="bg-secondary-background rounded-full w-full py-2 px-4 h-fit flex items-center">
      <input
        placeholder="검색어를 입력하세요"
        className="focus:outline-none w-full"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4 text-secondary-foreground"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
}
