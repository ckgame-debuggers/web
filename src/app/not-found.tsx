import GlobalHeader from "@/components/section/global/global-header";
import GlobalFooter from "@/components/section/global/global-footer";

export default function NotFound() {
  return (
    <>
      <GlobalHeader />
      <main className="py-15">
        <h1 className="font-bold text-4xl text-center">404 Not Found..</h1>
      </main>
      <GlobalFooter />
    </>
  );
}
