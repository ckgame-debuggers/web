import parse from "react-html-parser";

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <>
      <div className="h-[1px] bg-secondary w-full my-5"></div>
      <div className="font-semibold max-w-[800px] mx-auto">
        <div className="ql-snow">
          <div className="ql-editor">{parse(content)}</div>
        </div>
      </div>
    </>
  );
}
