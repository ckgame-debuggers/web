"use client";
import React, { useState, useRef, useEffect } from "react";

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  position?: "left" | "right";
  onItemClick?: () => void;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
}

interface DropdownMenuProps {
  children: React.ReactElement[];
}

function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setOpen] = useState(false);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = () => {
    setOpen(false);
  };

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
        if (child.type === DropdownMenu.Content) {
          return (
            <div key={index} className={`${isOpen ? "" : "hidden"} relative`}>
              {React.cloneElement(
                child as unknown as React.ReactElement<DropdownMenuContentProps>,
                {
                  onItemClick: handleItemClick,
                }
              )}
            </div>
          );
        }
        return child;
      })}
    </div>
  );
}

DropdownMenu.Trigger = ({ children }: DropdownMenuTriggerProps) => {
  return <>{children}</>;
};

DropdownMenu.Content = ({
  children,
  position = "left",
  onItemClick,
}: DropdownMenuContentProps) => {
  const positionStyle =
    position === "left" ? { left: "0px" } : { right: "0px" };

  return (
    <div
      className="border z-50 bg-background border-border mt-2 rounded-md w-fit overflow-hidden absolute"
      style={{ ...positionStyle }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement<DropdownMenuItemProps>(child)) {
          return React.cloneElement(child, {
            onClick: () => {
              child.props.onClick?.();
              onItemClick?.();
            },
          });
        }
        return child;
      })}
    </div>
  );
};

DropdownMenu.Item = ({ children, onClick }: DropdownMenuItemProps) => {
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
