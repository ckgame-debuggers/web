"use client";

import { useEffect } from "react";

export function CarrotTyper() {
  useEffect(() => {
    let typedText = "";
    const target = "carrot";

    const handleKeyPress = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      console.log(activeElement?.tagName);
      if (
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      typedText += e.key;

      if (typedText.length > target.length) {
        typedText = typedText.slice(-target.length);
      }

      if (typedText === target) {
        window.location.href = "/carrot";
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return null;
}
