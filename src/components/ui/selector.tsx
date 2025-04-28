"use client";
import React, { useState, useRef, useEffect } from "react";

interface SelectorItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  value: string;
}

const SelectorItem = ({ children, onClick }: SelectorItemProps) => {
  return (
    <button
      type="button"
      className="w-full text-left px-4 py-2 text-sm hover:bg-accent cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface SelectorProps {
  children: React.ReactElement<SelectorItemProps>[];
  onSelect?: (selectedValue: string) => void;
  defaultValue?: string;
  placeholder?: React.ReactNode;
}

function Selector({
  children,
  onSelect,
  defaultValue,
  placeholder = "Please select",
}: SelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<React.ReactNode>(
    defaultValue || null
  );
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelect = (value: string, displayValue: React.ReactNode) => {
    setSelectedValue(displayValue || placeholder);
    if (onSelect) {
      onSelect(value);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={menuRef}>
      <button
        type="button"
        className="flex items-center justify-between px-4 py-2 text-sm border border-border rounded-md bg-background hover:bg-accent w-full"
        onClick={toggleMenu}
      >
        <span>{selectedValue || placeholder}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-3 ml-2 transition-transform"
          style={{
            rotate: isOpen ? "180deg" : "",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg">
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return null;

            return React.cloneElement(child, {
              onClick: () =>
                handleSelect(child.props.value, child.props.children),
            });
          })}
        </div>
      )}
    </div>
  );
}

Selector.Item = SelectorItem;

export default Selector;
