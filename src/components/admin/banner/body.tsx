"use client";

import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { DebuggersAPI } from "@/components/util/api";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
  Dispatch,
  SetStateAction,
} from "react";

type Banner = {
  id?: number;
  title: string;
  contents: string;
  image?: string;
  url: string;
};

export default function BannerBody() {
  const [banners, setBanner] = useState<Banner[]>([]);

  const handleAddNotice = useCallback(() => {
    setBanner((prev) => [
      ...prev,
      {
        title:
          "방금 생성된 배너입니다. 저장 버튼을 누르기 전까지 서버에 적용되지 않습니다.",
        contents: "",
        url: "/path/to/example",
      },
    ]);
  }, []);

  const debuggersAPI = DebuggersAPI.getInstance();
  useEffect(() => {
    const prepare = async () => {
      const res = (await debuggersAPI.get("/global/banners")).data.data;
      setBanner(res);
    };
    prepare();
  }, []);

  return (
    <>
      <div className="pt-5 w-full">
        {banners.length !== 0 ? (
          banners.map((banner, i) => (
            <MemoizedBannerItem
              title={banner.title}
              contents={banner.contents}
              id={banner.id}
              thumbnail={banner.image}
              url={banner.url}
              setBanners={setBanner}
              index={i}
              key={i}
            />
          ))
        ) : (
          <div className="border rounded-md w-full p-5 text-center">
            <p>
              사이트에 배너가 하나도 없는 것 같아요. 아래 버튼을 눌러 추가해
              주세요.
            </p>
          </div>
        )}
      </div>
      <button
        onClick={handleAddNotice}
        className="group border p-2 w-full hover:border-primary hover:text-primary transition-colors duration-500 ease-in-out rounded-md flex justify-center my-4 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </>
  );
}

const BannerItem = memo(function BannerItem({
  id,
  title,
  contents,
  thumbnail,
  setBanners,
  url,
  index,
}: {
  id?: number;
  title: string;
  contents: string;
  thumbnail?: string;
  url: string;
  setBanners: Dispatch<SetStateAction<Banner[]>>;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [innerContents, setInnerContents] = useState(contents);
  const [innerTitle, setInnerTitle] = useState(title);
  const [innerUrl, setInnerUrl] = useState(url);
  const [innerThumbnail, setInnerThumbnail] = useState<string>(
    thumbnail ?? "/gyao/example.png"
  );
  const [error, setError] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);
  const debuggersAPI = DebuggersAPI.getInstance();

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [innerContents]);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInnerTitle(e.target.value);
      setError("");
    },
    []
  );

  const handleHrefChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInnerUrl(e.target.value);
      setError("");
    },
    []
  );

  const handleContentsChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
      setInnerContents(e.target.value);
      setError("");
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!innerTitle) {
      setError("제목을 입력해주세요.");
      return;
    }
    if (!innerContents) {
      setError("내용을 입력해주세요.");
      return;
    }
    if (!innerUrl) {
      setError("URL을 입력해주세요.");
      return;
    }
    if (!innerThumbnail) {
      setError("이미지를 업로드해주세요.");
      return;
    }

    const params: any = {
      title: innerTitle,
      contents: innerContents,
      thumbnail: innerThumbnail,
      url: innerUrl,
    };
    if (id) params.id = id;
    await debuggersAPI.post("/admin/banner", params);
    window.location.reload();
  }, [debuggersAPI, id, innerContents, innerTitle, innerThumbnail, innerUrl]);

  const handleDelete = useCallback(async () => {
    if (id) {
      await debuggersAPI.delete(`/admin/banner?id=${id}`);
      window.location.reload();
    }
    setBanners((prev) => {
      const newBanners = [...prev];
      newBanners.splice(index, 1);
      return newBanners;
    });
  }, [id, index, setBanners]);

  return (
    <div
      className="my-1 font-bold border-border rounded-md border w-full overflow-hidden transition-colors duration-500 ease-in-out"
      style={{
        borderColor: isOpen ? "var(--primary)" : "inherit",
      }}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-5 py-4 w-full flex items-center justify-between cursor-pointer"
      >
        <p>{title}</p>
        <div
          className="transition-transform duration-500 ease-in-out"
          style={{
            rotate: isOpen ? "180deg" : "inherit",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
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
        className="w-full h-[1px] bg-border opacity-0 transition-colors duration-500 ease-in-out"
        style={{
          opacity: isOpen ? "100%" : "inherit",
          backgroundColor: isOpen ? "var(--primary)" : "inherit",
        }}
      ></div>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentHeight + 40}px` : "0px",
          padding: isOpen ? "1.25rem" : "0px 1.25rem",
        }}
      >
        <div ref={contentRef}>
          <Input
            label="타이틀을 입력해주세요"
            name="title"
            value={innerTitle}
            onChange={handleTitleChange}
          />
          <div className="mt-3">
            <Input
              label="연결될 url을 입력해주세요"
              name="href"
              value={innerUrl}
              onChange={handleHrefChange}
            />
          </div>
          <div className="mt-3">
            <ImageUploader
              label="배너에 적용할 이미지를 선택해 주세요.<br/>여기를 클릭하거나 이미지를 드래그해 업로드할 수 있습니다."
              defaultValue={innerThumbnail}
              onUpload={(e) => {
                setInnerThumbnail(e.id);
                setError("");
              }}
            />
          </div>
          <div className="relative my-3">
            <p
              className="absolute top-[-8px] px-2 mx-1 z-10 transition-all text-foreground/50 duration-150 ease-in-out"
              style={{
                fontSize: innerContents !== "" ? "var(--text-xs)" : "inherit",
                top: innerContents !== "" ? "-8px" : "8px",
                backgroundColor:
                  innerContents !== "" ? "var(--background)" : "",
              }}
            >
              내용을 입력해주세요
            </p>
            <div className="relative z-0 border border-border overflow-hidden rounded-md my-2">
              <textarea
                className="w-full focus:outline-none resize-none p-2"
                onChange={handleContentsChange}
                value={innerContents}
                style={{
                  minHeight: "100px",
                  height: "auto",
                  overflow: "hidden",
                }}
              />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-2 font-normal">{error}</div>
          )}
          <Button onClick={handleSave} className="block w-full">
            <p className="font-bold">저장하기</p>
          </Button>
          <Button
            onClick={handleDelete}
            variants="destructive"
            className="block w-full mt-1"
          >
            <p className="font-bold">삭제하기</p>
          </Button>
        </div>
      </div>
    </div>
  );
});

const MemoizedBannerItem = memo(BannerItem);
