"use client";

import CrewApplicationForm from "@/components/section/crew/applicate-form";
import { DebuggersAPI } from "@/components/util/api";
import RequireLogin from "@/components/util/require-login";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CrewApplicateId() {
  const [crew, setCrew] = useState<CrewType>({
    id: 0,
    createdAt: "",
    description: "",
    isRecruiting: false,
    maxPeople: 0,
    title: "",
  });
  const [notFound, setNotFound] = useState(false);
  const debuggersAPI = DebuggersAPI.getInstance();
  const { id } = useParams();

  useEffect(() => {
    const prepare = async () => {
      let found: CrewType = {
        id: 0,
        createdAt: "",
        description: "",
        isRecruiting: false,
        maxPeople: 0,
        title: "",
      };
      try {
        found = (await debuggersAPI.get(`/crew/${id}`)).data.data;
      } catch (e) {
        setNotFound(true);
      }
      setCrew(found);
    };
    prepare();
  }, [id]);
  if (notFound) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">찾을 수 없는 페이지입니다</h2>
        <p className="text-gray-600 mt-2">요청하신 소모임을 찾을 수 없습니다</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-5 my-20">
      <RequireLogin />
      <div className="text-center pb-5">
        <p className="text-primary">소모임 지원하기</p>
        <h1 className="text-3xl font-black">{crew.title}에 지원합니다.</h1>
      </div>
      <CrewApplicationForm id={crew.id} crewName={crew.title} />
    </main>
  );
}
