import RegisterSchoolNumbForm from "@/components/section/register/schoolnumb";

export default function RegisterPage() {
  return (
    <main className="h-[80vh] flex flex-col justify-center items-center gap-10">
      <h1 className="font-semibold text-3xl">회원가입</h1>
      <RegisterSchoolNumbForm />
    </main>
  );
}
