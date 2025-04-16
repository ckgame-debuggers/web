import CreateCrewForm from "@/components/section/crew/create-crew-form";
import RequireLogin from "@/components/util/require-login";

export default function NewCrewPage() {
  return (
    <main>
      <RequireLogin />
      <CreateCrewForm />
    </main>
  );
}
