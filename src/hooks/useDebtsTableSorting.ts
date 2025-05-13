import { useMemo, useState } from "react";
import type { ColumnSort, Debt } from "../../types/Dept.ts";

const useDebtsTableSorting = ({ topDebtsData }: { topDebtsData: Debt[] | null }) => {

  const [sortConfig, setSortConfig] = useState<ColumnSort>({ column: 'Name', direction: 'asc' });

  const sortedDebts = useMemo(
    () => {
      if (!topDebtsData) {
        return [];
      }

      if (!sortConfig.column) {
        return [...topDebtsData];
      }

      return [...topDebtsData].sort((a, b) => {
        const aValue = a[sortConfig.column];
        const bValue = b[sortConfig.column];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        } else {
          return 0;
        }
      });
    },
    [topDebtsData, sortConfig]
  );

  const requestSort = (column: keyof Debt) => {
    let direction: "asc" | "desc";
    if (sortConfig.column === column && sortConfig.direction === "asc") {
      direction = "desc";
    } else {
      direction = "asc";
    }
    setSortConfig({ column, direction });
  };

  const getSortIndicator = (column: keyof Debt): string | null => {
    if (sortConfig.column === column) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return null;
  };

  return {
    sortedDebts,
    requestSort,
    getSortIndicator
  };
};

export default useDebtsTableSorting;