import { useEffect, useState } from "react";
import { DebuggersAPI } from "../api";

export const useCheckCrew = (id: number) => {
  const [data, setData] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: "",
  });

  const debuggersAPI = DebuggersAPI.getInstance();
  useEffect(() => {
    const prepare = async () => {
      try {
        setLoading(true);
        setError({ status: false, message: "" });

        const found: CrewType[] | undefined = (
          await debuggersAPI.get("/crew/my")
        ).data.data;
        if (!found) {
          setError({
            status: true,
            message: "크루 정보를 불러올 수 없습니다.",
          });
          return;
        }
        const res = found.find((crew) => crew.id === id);
        setData(!!res);
      } catch (e) {
        setError({
          status: true,
          message: "크루 정보를 확인하는 중 오류가 발생했습니다.",
        });
      } finally {
        setLoading(false);
      }
    };
    prepare();
  }, [id]);

  return { data, loading, error };
};
