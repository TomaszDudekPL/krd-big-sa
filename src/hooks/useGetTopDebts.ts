import { useEffect, useState } from "react";
import type { Debt } from "../../types/Dept.ts";

const fetchTopDebts = async ({ setData, setLoading }: {
  setData: (data: Debt[] | null) => void;
  setLoading: (loading: boolean) => void;
}) => {

  setLoading(true);

  try {
    const response = await fetch("https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetTopDebts");
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const useGetTopDebts = (filteredData: Debt[] | null) => {

  const [data, setData] = useState<Debt[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filteredData) {
      return;
    }
    fetchTopDebts({
      setLoading,
      setData
    });
  }, [filteredData]);

  return {
    topDebtsData: filteredData || data,
    loading
  };


};

export default useGetTopDebts;