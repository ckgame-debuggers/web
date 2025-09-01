"use client";

import { useState } from "react";

export function Input({
  label,
  name,
  ...inputProps
}: {
  label: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState(inputProps.value || "");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (inputProps.onChange) {
      inputProps.onChange(e);
    }
  };

  return (
    <div className="relative w-full">
      <label
        htmlFor={name}
        className="absolute text-foreground/50 left-3 top-1/2 transition-all transform -translate-y-1/2 z-0 cursor-text select-none origin-left"
        style={
          value != ""
            ? {
                scale: "70%",
                left: `5px`,
                top: "0px",
                backgroundColor: "var(--background)",
                padding: "0 10px",
              }
            : {}
        }
      >
        {label}
      </label>
      <input
        {...inputProps}
        className={`bg-transparent w-full border border-border p-2 rounded-md focus:outline-none focus:border-primary transition-all ${inputProps.className ? inputProps.className : ""}`}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
