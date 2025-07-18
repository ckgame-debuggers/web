"use client";

import { useState, useEffect } from "react";

type CheckboxType = "checkbox" | "text";

interface CheckboxProps {
  id?: string;
  onChange?: (checked: boolean) => any;
  type?: CheckboxType;
  text?: string;
  className?: string;
  value?: boolean;
}

export function Checkbox({
  id,
  onChange,
  type = "checkbox",
  text,
  className = "",
  value,
}: CheckboxProps) {
  const [isChecked, setChecked] = useState(value ?? false);

  useEffect(() => {
    if (typeof value === "boolean") {
      setChecked(value);
    }
  }, [value]);

  const handleClick = () => {
    if (typeof value === "boolean") {
      if (onChange) onChange(!value);
    } else {
      setChecked((prev) => {
        const next = !prev;
        if (onChange) onChange(next);
        return next;
      });
    }
  };

  if (type === "text" && text) {
    return (
      <span
        {...{ id: id ?? "" }}
        className={`cursor-pointer select-none transition-colors ${className}`}
        style={{
          color: isChecked ? "var(--primary)" : "var(--foreground-secondary)",
          fontWeight: isChecked ? "bold" : "normal",
        }}
        onClick={handleClick}
      >
        {text}
      </span>
    );
  }

  return (
    <span
      {...{ id: id ?? "" }}
      className={`border-secondary-foreground h-fit w-fit border-[1px] p-1 rounded-full text-secondary-foreground cursor-pointer ${className}`}
      style={{
        color: isChecked ? "white" : "",
        backgroundColor: isChecked ? "var(--primary)" : "",
        border: isChecked ? "1px solid var(--primary)" : "",
        transition: "all 0.15s",
      }}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
        style={{
          opacity: isChecked ? 1 : 0.2,
          transition: "opacity 0.15s",
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    </span>
  );
}
