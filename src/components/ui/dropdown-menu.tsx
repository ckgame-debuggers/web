"use client";
import React, { useState, useRef, useEffect } from "react";
function DropdownMenu({
  children,
}: {
  children: React.ReactElement<
    typeof DropdownMenu.Trigger | typeof DropdownMenu.Content
  >[];
}) {
  const [isOpen, setOpen] = useState(false);
  const [triggerHeight, setTriggerHeight] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleTriggerClick = () => {
    setOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    setTriggerHeight(triggerRef.current?.offsetHeight || 0);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-fit" ref={menuRef}>
      {React.Children.map(children, (child, index) => {
        if (child.type === DropdownMenu.Trigger) {
          return (
            <div
              ref={triggerRef}
              className="w-fit"
              key={index}
              onClick={handleTriggerClick}
            >
              {child}
            </div>
          );
        }
        return (
          <div
            key={index}
            className={`${isOpen ? "" : "hidden"} w-9 h-0`}
            style={{ top: triggerHeight + 3 }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

DropdownMenu.Trigger = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

DropdownMenu.Content = ({
  children,
  position = "left",
}: {
  children: React.ReactNode;
  position?: "left" | "right";
}) => {
  const positionStyle =
    position === "left" ? { left: "0px" } : { right: "0px" };

  return (
    <div
      className="border absolute z-50 bg-background border-border mt-2 rounded-md w-fit overflow-hidden"
      style={{ ...positionStyle }}
    >
      {children}
    </div>
  );
};

DropdownMenu.Item = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      className="min-w-48 text-left p-2 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DropdownMenu;
