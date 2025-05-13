import { useEffect, useState } from "react";
import type { Debt } from "../../types/Dept.ts";

const fetchFilteredDebts = async ({ phrase, setData, setLoading }: {
  phrase: string;
  setData: (data: Debt[] | null) => void;
  setLoading: (loading: boolean) => void;
}) => {

  setLoading(true);

  try {
    const response = await fetch("https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetFilteredDebts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phrase })
    });
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const useGetFilteredDebts = ({ phrase, clickSearch, setClickSearch }: {
  phrase?: string;
  clickSearch: boolean;
  setClickSearch: (val: boolean) => void
}) => {

  const [data, setData] = useState<Debt[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!phrase?.length) {
      setData(null);
    }

    if (phrase && clickSearch) {
      fetchFilteredDebts({
        phrase,
        setLoading,
        setData
      });
      setClickSearch(false);
    }
  }, [phrase, clickSearch, setClickSearch]);

  return {
    filteredDebtsData: data,
    loading
  };


};

export default useGetFilteredDebts;