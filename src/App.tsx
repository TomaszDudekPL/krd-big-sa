import React, { useState } from "react";
import DebtTable from "./components/Debts/DebtTable.tsx";
import DebtHeader from "./components/Debts/DebtHeader.tsx";
import styles from "./App.module.less";
import useGetFilteredDebts from "./hooks/useGetFilteredDebts.ts";

const App: React.FC = () => {
  const [phrase, setPhrase] = useState("");
  const [clickSearch, setClickSearch] = useState(false);

  const { filteredDebtsData, loading } = useGetFilteredDebts({ phrase, clickSearch, setClickSearch });

  return (
    <div className={styles.appContainer}>
      <DebtHeader setPhrase={setPhrase} setClickSearch={setClickSearch} />
      <DebtTable data={!phrase.length ? null : filteredDebtsData} loading={loading} />
    </div>
  );
};

export default App;
