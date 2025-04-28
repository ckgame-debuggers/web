import { Button } from "@/components/ui/button";

export default function SettingCrewMemberItem({
  schoolNumber,
  name,
  permission,
  userPermission,
}: {
  schoolNumber: string;
  name: string;
  permission: string;
  userPermission: string;
}) {
  const checkBannable = (): boolean => {
    if (userPermission === "Owner") {
      if (permission === "Sub-Owner" || permission === "Member") return true;
      return false;
    }
    if (userPermission === "Sub-Owner" && permission === "Member") return true;
    return false;
  };
  return (
    <div className="flex justify-between p-4 items-center">
      <h4>
        {schoolNumber} {name}
      </h4>
      <div className="flex gap-3 items-center">
        <p className="text-secondary-foreground">{permission}</p>
        {checkBannable() ? (
          <Button variants="destructive" className="cursor-pointer">
            추방하기
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
