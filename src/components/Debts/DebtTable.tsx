import DebtTableStyles from "./DebtStyles.module.less";
import formatDate from "../../utils/dateFormat.ts";
import useDebtsTableSorting from "../../hooks/useDebtsTableSorting.ts";
import useGetTopDebts from "../../hooks/useGetTopDebts.ts";
import Loader from "../Loader/Loader.tsx";
import { useEffect, useState } from "react";
import type { Debt } from "../../../types/Dept.ts";

const DebtTable = ({ data, loading: filteredDebtsLoading }: { data: Debt[] | null; loading: boolean }) => {

  const { topDebtsData, loading } = useGetTopDebts(data);
  const { sortedDebts, requestSort, getSortIndicator } = useDebtsTableSorting({ topDebtsData });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 540);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 540);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderTableHeader = () => (
    <thead>
    <tr>
      <th onClick={() => requestSort("Name")}>DŁUŻNIK {getSortIndicator("Name")}</th>
      <th onClick={() => requestSort("NIP")}>NIP {getSortIndicator("NIP")}</th>
      <th onClick={() => requestSort("Value")}>KWOTA ZADŁUŻENIA {getSortIndicator("Value")}</th>
      <th onClick={() => requestSort("Date")}>DATA POWSTANIA ZOBOWIĄZANIA {getSortIndicator("Date")}</th>
    </tr>
    </thead>
  );

  const renderTableRow = (debt: Debt) => (
    <tr key={debt.Id}>
      <td>{debt.Name}</td>
      <td>{debt.NIP}</td>
      <td>{debt.Value}</td>
      <td>{formatDate(debt.Date)}</td>
    </tr>
  );

  const renderTable = () => (
    <table>
      {renderTableHeader()}
      <tbody>
      {!loading && !!sortedDebts.length && sortedDebts.map(renderTableRow)}
      </tbody>
    </table>
  );

  const renderCard = (debt: Debt) => (
    <div key={debt.Id} className={DebtTableStyles.debtCard}>
      <div className={DebtTableStyles.cardItem}>
        <label>Dłużnik:</label> <span>{debt.Name}</span>
      </div>
      <div className={DebtTableStyles.cardItem}>
        <label>NIP:</label> <span>{debt.NIP}</span>
      </div>
      <div className={DebtTableStyles.cardItem}>
        <label>Kwota Zadłużenia:</label> <span>{debt.Value}</span>
      </div>
      <div className={DebtTableStyles.cardItem}>
        <label>Data Powstania Zobowiązania:</label> <span>{formatDate(debt.Date)}</span>
      </div>
    </div>
  );

  const renderCards = () => (
    <div className={DebtTableStyles.debtCardsContainer}>
      {!loading && !!sortedDebts.length && sortedDebts.map(renderCard)}
    </div>
  );

  return (
    <div className={DebtTableStyles.debtTableContainer}>
      {loading || filteredDebtsLoading && <Loader />}
      {topDebtsData && (isMobile ? renderCards() : renderTable())}
    </div>
  );
};

export default DebtTable;