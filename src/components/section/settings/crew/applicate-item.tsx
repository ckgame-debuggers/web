import { Button } from "@/components/ui/button";
import { DebuggersAPI } from "@/components/util/api";
import { useEffect, useRef, useState } from "react";

export default function SettingCrewApplicateItem({
  applicate,
}: {
  applicate: CrewApplicateType;
}) {
  const [isOpened, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const debuggersApi = DebuggersAPI.getInstance();

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const acceptApplicate = async () => {
    try {
      await debuggersApi.post(`/crew/application/${applicate.id}/accept`, {});
    } catch (error) {
      console.error("Failed to accept application:", error);
    }
    window.location.reload();
  };
  const declineApplicate = async () => {
    try {
      await debuggersApi.delete(`/crew/application/${applicate.id}`);
    } catch (error) {
      console.error("Failed to accept application:", error);
    }
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(!isOpened);
        }}
        className="flex justify-between p-3 bg-background relative z-10 cursor-pointer"
      >
        <h4>
          {} {}
        </h4>
        <div className="flex gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-secondary-foreground transition-transform"
            style={{ rotate: isOpened ? "180deg" : "none" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </button>
      <div
        className="overflow-hidden relative z-0"
        style={{
          opacity: isOpened ? 1 : 0,
          transform: isOpened ? "translateY(0)" : "translateY(-100%)",
          height: isOpened ? `${contentHeight}px` : "0px",
          transition: "all 300ms ease-in-out",
        }}
      >
        <div ref={contentRef} className="p-3 flex flex-col gap-2">
          <p className="font-semibold text-lg mb-3">지원동기</p>
          <p>{applicate.motivation}</p>
          <div className="flex gap-2 mt-3">
            <Button className="flex-1" size="sm" onClick={acceptApplicate}>
              합격
            </Button>
            <Button
              variants="destructive"
              size="sm"
              className="flex-1"
              onClick={declineApplicate}
            >
              불합격
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
