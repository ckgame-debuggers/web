import { useEffect, useState } from "react";
import SettingCrewMemberItem from "./member-item";
import { DebuggersAPI } from "@/components/util/api";

type CrewMemberType = {
  userId: number;
  crewId: number;
  permission: string;
  user: {
    schoolNumber: string;
    fullname: string;
  };
};

export default function SettingCrewMemberList({ id }: { id: string }) {
  const [crewMember, setCrewMember] = useState<CrewMemberType[]>([]);
  const debuggersApi = DebuggersAPI.getInstance();
  useEffect(() => {
    const prepare = async () => {
      const found = (await debuggersApi.get(`/crew/${id}/members`)).data.data;
      console.log(found);
      if (!found) return;
      setCrewMember(found);
    };
    prepare();
  }, []);
  return (
    <div>
      <div className="flex gap-5 items-center mt-10">
        <p>크루 인원</p>
        <div className="flex-1 h-[1px] bg-border"></div>
      </div>
      <div className="mt-5">
        {crewMember.map((crewMember, i) => (
          <SettingCrewMemberItem
            name={crewMember.user.fullname}
            permission={crewMember.permission}
            schoolNumber={crewMember.user.schoolNumber}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
