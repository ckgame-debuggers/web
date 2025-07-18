"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    ChannelIO?: ((...args: any[]) => void) & {
      q?: any[];
      c?: (args: any) => void;
    };
    ChannelIOInitialized?: boolean;
  }
}

export default function ChannelTalk() {
  useEffect(() => {
    if (window.ChannelIOInitialized) {
      return;
    }

    (function () {
      const w = window as Window;
      if (w.ChannelIOInitialized) {
        return;
      }
      const ch = function (this: any) {
        (ch.c as any)(arguments);
      } as any;
      ch.q = [];
      ch.c = function (args: any) {
        (ch.q as any[]).push(args);
      };
      w.ChannelIO = ch;
      function l() {
        if (w.ChannelIOInitialized) {
          return;
        }
        w.ChannelIOInitialized = true;
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
        const x = document.getElementsByTagName("script")[0];
        if (x.parentNode) {
          x.parentNode.insertBefore(s, x);
        }
      }
      if (document.readyState === "complete") {
        l();
      } else {
        w.addEventListener("DOMContentLoaded", l);
        w.addEventListener("load", l);
      }
    })();

    const bootChannelIO = () => {
      if (typeof window.ChannelIO === "function") {
        window.ChannelIO!("boot", {
          pluginKey: "6c85c4e8-3608-4bf8-a39c-64cb5b51e882",
        });
      }
    };

    const interval = setInterval(() => {
      if (typeof window.ChannelIO === "function") {
        bootChannelIO();
        clearInterval(interval);
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
}
