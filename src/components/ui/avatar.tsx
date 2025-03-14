"use client";
import { useState, useEffect } from "react";

export default function Avatar({
  img,
  displayName,
  size = "md",
  className = "",
}: {
  img?: string;
  displayName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!img) return;
    setIsLoaded(false);
    const imgElement = new Image();
    imgElement.src = img;
    imgElement.onload = () => setIsLoaded(true);
  }, [img]);
  const sizeClass = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <div
      className={`flex-shrink-0 relative flex items-center justify-center rounded-xl overflow-hidden ${
        isLoaded ? "" : "border border-border"
      } ${sizeClass[size]} ${className}`}
      style={{ aspectRatio: "1 / 1" }}
    >
      {!isLoaded || !img ? (
        <p className="relative text-center select-none">{displayName}</p>
      ) : (
        <></>
      )}
      <img
        className="w-full h-full select-none object-cover"
        src={img}
        alt="avatar"
        style={{ display: isLoaded ? "block" : "none" }}
      />
    </div>
  );
}
