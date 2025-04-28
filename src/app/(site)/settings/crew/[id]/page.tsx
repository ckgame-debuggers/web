"use client";

import SettingCrewApplicates from "@/components/section/settings/crew/applicates";
import SettingCrewMemberList from "@/components/section/settings/crew/member-list";
import { DebuggersAPI } from "@/components/util/api";
import { useCheckCrew } from "@/components/util/crew/check-crew";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingCrewItemPage() {
  const [crew, setCrew] = useState<CrewType>({
    id: 0,
    isRecruiting: false,
    maxPeople: 0,
    title: "",
    description: "",
    createdAt: "",
  });
  const [permission, setPermission] = useState<
    "Owner" | "Sub-Owner" | "Member"
  >("Member");
  const { id } = useParams();
  const { data } = useCheckCrew(parseInt(id as string) || 0);
  const debuggersAPI = DebuggersAPI.getInstance();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const prepare = async () => {
      setLoading(true);
      try {
        const data: {
          isMember: boolean;
          permission?: "Owner" | "Sub-Owner" | "Member";
        } = (await debuggersAPI.get(`/crew/${id}/check-member`)).data.data;
        if (!data.isMember) {
          window.location.href = "/";
          return;
        }
        setPermission(data.permission || "Member");

        const found = (await debuggersAPI.get(`/crew/${id}`)).data.data;
        setCrew(found);
      } catch (e) {
        window.location.href = "/";
      } finally {
        setLoading(false);
      }
    };
    prepare();
  }, [id]);
  return (
    <main className="container py-10">
      {loading ? (
        <div>로딩중...</div>
      ) : (
        <div>
          <div className="flex justify-between flex-col md:flex-row">
            <div>
              <h1 className="text-2xl font-bold">{crew.title}</h1>
              <p className="text-secondary-foreground mt-2">
                {crew.description?.replace(/<[^>]*>/g, "")?.length > 20
                  ? crew.description.replace(/<[^>]*>/g, "").slice(0, 20) +
                    "..."
                  : crew.description.replace(/<[^>]*>/g, "")}
              </p>
            </div>
            <div className="mt-4">
              <span className="text-sm">
                현제 인원: {crew.maxPeople}명 | 모집 상태:{" "}
                {crew.isRecruiting ? "모집중" : "모집 완료"}
              </span>
            </div>
          </div>
          {["Owner", "Sub-Owner"].indexOf(permission) !== -1 ? (
            <SettingCrewApplicates />
          ) : (
            <></>
          )}
          <SettingCrewMemberList id={id?.toString() || ""} perm={permission} />
        </div>
      )}
    </main>
  );
}
