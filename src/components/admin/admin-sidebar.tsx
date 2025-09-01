"use client";
import { sidebarItems } from "@/consts/admin/sidebar-items";
import { useEffect, useRef, useState } from "react";
import AdminSideBarItem from "../ui/admin/admin-sidebar-item";
import useUserStore from "@/store/user";

export default function AdminSideBar() {
  const [currentItem, setCurrentItem] = useState(sidebarItems[0]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const { permission } = useUserStore();

  useEffect(() => {
    const header = document.getElementById("admin-header");
    setHeaderHeight(header?.offsetHeight ?? 0);

    if (window.location.pathname === "/admin") {
      window.location.href = "/admin/site/notice";
    }
  }, []);

  return (
    <>
      <div className="flex border-r border-r-primary">
        <div
          className="flex sticky top-0 flex-col border-r-border border-r py-5 "
          style={{ height: `calc(100vh - ${headerHeight}px)` }}
        >
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
        <div
          key={currentItem.title}
          className="w-60 sticky top-0 flex flex-col p-4 gap-1"
          style={{ height: `calc(100vh - ${headerHeight}px)` }}
        >
          <h3 className="font-bold mb-3 mt-3 text-sm">{currentItem.title}</h3>
          {currentItem.items?.map((item, i) => {
            if (item.permission && item.permission > permission) return;
            return (
              <AdminSideBarItem title={item.title} href={item.href} key={i} />
            );
          })}
        </div>
      </div>
    </>
  );
}
