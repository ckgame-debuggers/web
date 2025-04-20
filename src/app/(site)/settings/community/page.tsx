import Image from "next/image";
import workingImage from "$/resources/working.png";

export default function CommunitySettingPage() {
  return (
    <main className="flex flex-col items-center my-20">
      <div className="text-center flex flex-col gap-3">
        <h1 className="font-bold text-3xl">공사 중인 페이지에요!</h1>
        <p>불편을 드려 죄송합니다. 빠른 시일 내에 찾아올게요!</p>
      </div>
      <Image className="w-96" src={workingImage} alt="working" />
    </main>
  );
}
