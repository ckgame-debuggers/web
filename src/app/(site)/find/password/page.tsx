"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

function validateSchoolNumber(schoolNumber: string) {
  if (!/^\d{9}$/.test(schoolNumber)) return false;
  if (schoolNumber.slice(4, 6) !== "13") return false;
  return true;
}

export default function FindPasswordPage() {
  const [schoolNumber, setSchoolNumber] = useState("");
  const [isContinuable, setContinuable] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (schoolNumber === "") {
      setContinuable(false);
      setError("");
      return;
    }
    if (validateSchoolNumber(schoolNumber)) {
      setContinuable(true);
      setError("");
    } else {
      setContinuable(false);
      setError("올바른 학번 형식이 아닙니다. (예: 200013001)");
    }
  }, [schoolNumber]);

  return (
    <main className="max-w-[500px] mx-auto p-10 text-center flex flex-col gap-5 h-[80vh] justify-center">
      <h1 className="font-bold text-3xl">비밀번호를 잊으셨나요?</h1>
      <div className="flex flex-col gap-4">
        <Input
          label="학번을 입력해 주세요."
          name="schoolnumber"
          onChange={(e) => {
            setSchoolNumber(e.target.value);
          }}
          type="number"
          value={schoolNumber}
        />
        {error && (
          <div className="text-red-500 text-sm text-start">{error}</div>
        )}
        <Button
          onClick={() => {
            window.location.href = `/find/password/continue?schoolnumber=${schoolNumber}`;
          }}
          disabled={!isContinuable}
        >
          계속하기
        </Button>
      </div>
    </main>
  );
}
