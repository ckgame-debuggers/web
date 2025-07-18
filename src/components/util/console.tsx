"use client";
import { prettyConsole } from "@/lib/console-utils";
import { useEffect } from "react";

export default function ConsoleWriter() {
  useEffect(() => {
    const writeCode = () => {
      prettyConsole.gameschool("조심하세요!");
      prettyConsole.warning(
        "여기에 타인이 준 무언가를 입력한다면, 계정을 탈취당할 수 있어요!"
      );
      prettyConsole.warning(
        "숙련된 개발자가 아니시라면, 아무것도 입력하지 않는 것을 추천해요."
      );
      prettyConsole.log(
        "그런데 혹시라도, 어떤 작업을 하고 계신지 완벽하게 이해하고 계신다면.."
      );
      console.log(
        "%c%s",
        "color: #3b82f6; font-size: 24px; font-weight: bold; text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; padding: 8px 16px; text-decoration: underline;",
        "학생회에 들어와 저희와 함께 일해보실래요?"
      );
      console.log("https://ckdebuggers.com/job");
    };
    setTimeout(writeCode, 3000);
  }, []);
  return <></>;
}
