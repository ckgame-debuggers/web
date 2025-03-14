"use client";

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variants?: "default" | "outline" | "destructive" | "ghost";
    size?: "sm" | "md" | "lg";
  }
) {
  return (
    <button
      {...props}
      className={` ${buttonVariants({
        variants: props.variants || "default",
        size: props.size || "md",
      })} ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
}

export function buttonVariants({
  variants = "default",
  size = "md",
}: {
  variants?: "default" | "outline" | "destructive" | "ghost";
  size?: "sm" | "md" | "lg";
}): string {
  const classes = {
    default:
      "font-normal text-primary-foreground bg-primary hover:opacity-70 bg-background",
    outline: "border border-border hover:bg-white/40 bg-background",
    destructive: "font-bold bg-red-500 hover:opacity-90",
    ghost: "hover:bg-white/40",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs rounded-md",
    md: "px-2 py-2 text-sm rounded-md",
    lg: "px-3 py-3 text-base rounded-lg",
  };

  return [
    "transition-all",
    "box-border",
    "disabled:opacity-70",
    "disabled:cursor-not-allowed",
    "duration-300",
    sizes[size as keyof typeof sizes],
    classes[variants as keyof typeof classes],
  ].join(" ");
}
