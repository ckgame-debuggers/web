import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function SettingCrewItem({ crew }: { crew: CrewType }) {
  return (
    <div className="w-full flex items-center justify-between py-4">
      <h4 className="font-semibold text-xl">런닝 크루</h4>
      <Link
        href={`/settings/crew/${crew.id}`}
        className={buttonVariants({ size: "sm", variants: "outline" })}
      >
        크루 관리
      </Link>
    </div>
  );
}
