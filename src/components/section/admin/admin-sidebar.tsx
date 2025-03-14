"use client";
import { sidebarItems } from "@/consts/admin/sidebar-items";
import { useState } from "react";
import AdminSideBarItem from "../../ui/admin-sidebar-item";

export default function AdminSideBar() {
  const [currentItem, setCurrentItem] = useState(sidebarItems[0]);

  return (
    <div className="flex">
      <div className="flex flex-col h-full border-r-border border-r">
        {sidebarItems.map((item, i) => {
          return (
            <button
              onClick={() => {
                setCurrentItem(item);
              }}
              key={i}
              className="cursor-pointer p-3"
              style={{
                background:
                  item === currentItem ? " var(--secondary-background)" : "",
              }}
            >
              {item.icon}
            </button>
          );
        })}
      </div>
      <div className=" border-r border-r-primary  w-60 flex flex-col p-4 gap-1 h-[100vh] ">
        <h3 className="font-bold mb-3 mt-3 text-sm">{currentItem.title}</h3>
        {currentItem.items?.map((item, i) => {
          return (
            <AdminSideBarItem title={item.title} href={item.href} key={i} />
          );
        })}
      </div>
    </div>
  );
}
