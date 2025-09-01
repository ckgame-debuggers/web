"use client";
import { useTheme } from "next-themes";

export default function ThemeChanger({
  theme: preferedTheme,
}: {
  theme?: string;
}) {
  const { setTheme, theme } = useTheme();
  return (
    <button
      className={`cursor-pointer p-2 flex justify-center items-center rounded-full ${preferedTheme ? (preferedTheme === "light" ? "fill-white hover:bg-white/10" : "fill-black hover:bg-black/10") : "fill-foreground/50 hover:bg-foreground/10"}`}
      onClick={() => {
        switch (theme) {
          case "light":
            setTheme("dark");
            break;
          case "dark":
            setTheme("light");
            break;
          default:
            setTheme(
              window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "light"
                : "dark"
            );
            break;
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="none"
        className="size-5 mb-[-2px] scale-100 dark:scale-0 dark:hidden transition-transform duration-300 ease-in-out"
      >
        <path
          fillRule="evenodd"
          d="M12 8.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M6.5 12a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0M12 2a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1m0 16.5a1 1 0 0 1 1 1V21a1 1 0 1 1-2 0v-1.5a1 1 0 0 1 1-1M5.5 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1.5a1 1 0 0 1 1 1M22 12a1 1 0 0 1-1 1h-1.5a1 1 0 1 1 0-2H21a1 1 0 0 1 1 1M7.404 16.596a1 1 0 0 1 0 1.414l-1.06 1.061a1 1 0 0 1-1.415-1.414l1.06-1.06a1 1 0 0 1 1.415 0ZM19.071 4.929a1 1 0 0 1 0 1.414l-1.06 1.06a1 1 0 1 1-1.415-1.413l1.06-1.061a1 1 0 0 1 1.415 0m-2.475 11.667a1 1 0 0 1 1.414 0l1.061 1.06a1 1 0 0 1-1.414 1.415l-1.06-1.06a1 1 0 0 1 0-1.415ZM4.929 4.929a1 1 0 0 1 1.414 0l1.06 1.06A1 1 0 1 1 5.99 7.405l-1.061-1.06a1 1 0 0 1 0-1.415Z"
          clipRule="evenodd"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="none"
        className="size-5 mb-[-2px] scale-0 hidden dark:scale-100 dark:block transition-transform duration-300 ease-in-out"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
      </svg>
    </button>
  );
}
