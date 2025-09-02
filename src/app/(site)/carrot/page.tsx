"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CarrotPage() {
  const [positions, setPositions] = useState<
    Array<{ x: number; y: number; rotation: number }>
  >([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const updatePositions = () => {
      setPositions((prev) =>
        prev.map((pos) => ({
          x: pos.x + (Math.random() - 0.5) * 10,
          y: pos.y + (Math.random() - 0.5) * 10,
          rotation: pos.rotation + (Math.random() - 0.5) * 20,
        }))
      );
    };

    const gridSize = Math.ceil(Math.sqrt(100));
    const cellWidth = window.innerWidth / gridSize;
    const cellHeight = window.innerHeight / gridSize;

    const initialPositions = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (initialPositions.length >= 100) break;

        const x = i * cellWidth + (Math.random() * 0.5 + 0.25) * cellWidth;
        const y = j * cellHeight + (Math.random() * 0.5 + 0.25) * cellHeight;

        initialPositions.push({
          x: Math.min(x, window.innerWidth - 100),
          y: Math.min(y, window.innerHeight - 100),
          rotation: Math.random() * 360,
        });
      }
    }

    setPositions(initialPositions);

    const interval = setInterval(updatePositions, 50);
    return () => clearInterval(interval);
  }, []);
  const searchParams = useSearchParams();
  const word = searchParams.get("word") || "";

  useEffect(() => {
    const baseText = (
      word === "" ? "나는이사이트를만들다죽고말거야" : word
    ).repeat(1000);
    setText(baseText);

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // 스크롤이 80% 이상 내려갔을 때 텍스트 추가
      if (scrollTop + clientHeight >= scrollHeight * 0.8) {
        setText(
          (prev) =>
            prev +
            (word === "" ? "나는이사이트를만들다죽고말거야" : word).repeat(100)
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="w-full min-h-screen relative overflow-x-hidden">
      <div className="text-center flex flex-col gap-3 pb-20">
        <p className="my-[-7px] whitespace-pre-wrap">{text}</p>
      </div>
      <div className="fixed w-screen h-screen top-0 left-0 z-[9999] pointer-events-none">
        {positions.map((pos, i) => (
          <img
            key={i}
            className="absolute transition-all duration-200"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotation}deg)`,
              width: "100px",
            }}
            src="/resources/carrot.png"
            alt={`carrot-${i + 1}`}
          />
        ))}
      </div>
    </main>
  );
}
