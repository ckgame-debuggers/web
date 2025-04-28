import SettingCrewContainer from "@/components/section/settings/crew/crew-container";

export default function CrewSettingPage() {
  return (
    <main className="py-5">
      <div>
        <h1 className="font-semibold text-2xl">소모임 설정</h1>
        <p className="mt-1 text-secondary-foreground">
          소모임과 관련된 설정들을 저장하고 관리합니다.
        </p>
      </div>
      <SettingCrewContainer />
    </main>
  );
}
