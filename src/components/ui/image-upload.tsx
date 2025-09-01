"use client";
import { useEffect, useState } from "react";
import { DebuggersAPI } from "../util/api";

export default function ImageUploader({
  onUpload,
  className,
  label,
  style,
  defaultValue,
}: {
  onUpload?: (e: { imageURL: string; id: string }) => void;
  className?: string;
  label?: string;
  style?: string;
  defaultValue?: string;
}) {
  const [img, setImg] = useState<string | undefined>(defaultValue);
  const [isLoading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const debuggersAPI = DebuggersAPI.getInstance();
  const [componentId] = useState(() =>
    Math.random().toString(36).substring(2, 9)
  );

  const handleUpload = async (file: File) => {
    setLoading(true);
    const reqData: { id: string; uploadURL: string } = (
      await debuggersAPI.get("/upload-image")
    ).data;

    if (!reqData) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(reqData.uploadURL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const data = (
        await debuggersAPI.post("/upload-image", { id: reqData.id })
      ).data as { url: string };
      setImg(data.url);

      if (onUpload) {
        onUpload({ imageURL: data.url, id: reqData.id });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setLoading(false);
  };

  const handleCancel = async () => {
    if (onUpload) onUpload({ imageURL: "", id: "" });
    setImg(undefined);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (isLoading) return;
    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => {
        if (isLoading) return;
        if (img) {
          const input = document.querySelector(
            `#upload-cancel-button-${componentId}`
          ) as HTMLInputElement;
          input?.click();
        } else {
          const input = document.querySelector(
            `#file-input-${componentId}`
          ) as HTMLInputElement;
          input?.click();
        }
      }}
      className={`border relative group cursor-pointer overflow-hidden px-3 bg-cover bg-center transition-all duration-500 ease-in-out py-5 rounded-md text-xs${className ? ` ${className}` : ""}`}
      style={Object.assign({}, style, {
        borderColor: isDragging ? "var(--primary)" : "inherit",
        backgroundImage: img ? `url(${img})` : "",
        paddingTop: img ? "calc(var(--spacing) * 20)" : "",
        paddingBottom: img ? "calc(var(--spacing) * 20)" : "",
      })}
    >
      <button
        id={`upload-cancel-button-${componentId}`}
        onClick={handleCancel}
        className={`bg-black/70 w-full h-full absolute top-0 left-0 flex opacity-0 justify-center items-center cursor-pointer${img ? " group-hover:opacity-100" : ""} transition-opacity duration-500 ease-in-out`}
      >
        <div className="p-3 rounded-full bg-red-500 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      </button>
      {img ? (
        <div
          className={`bg-black/50 w-full h-full absolute top-0 left-0 flex justify-center items-center cursor-pointer${img ? " group-hover:bg-black/0" : ""} transition-colors duration-500 ease-in-out`}
        >
          <div className="p-3 text-xs rounded-full text-center px-5 bg-red-500 text-white group-hover:opacity-0 transition-opacity duration-500 ease-in-out">
            <p>
              업로드 대기 중인 이미지입니다.
              <br />
              여기를 눌러 삭제할 수 있습니다.
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      {isLoading ? (
        <div
          className={`py-5 bg-black/50 w-full h-full absolute top-0 left-0 flex justify-center items-center cursor-pointer${img ? " group-hover:bg-black/0" : ""} transition-colors duration-500 ease-in-out`}
        >
          <div className="animate-spin bg-primary p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        </div>
      ) : (
        <>
          <input
            id={`file-input-${componentId}`}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleUpload(file);
              }
            }}
            className="hidden"
          />
          <p
            className="transition-opacity duration-500 ease-in-out"
            style={{ opacity: img ? "0%" : "inherit" }}
          >
            {label ? (
              label.split("<br/>").map((t, i) => {
                return (
                  <span key={i}>
                    {t}
                    {i < label.split("<br/>").length - 1 && <br />}
                  </span>
                );
              })
            ) : (
              <>
                이미지를 드래그하거나
                <br />
                클릭하여 선택해 주세요.
              </>
            )}
          </p>
        </>
      )}
    </div>
  );
}
