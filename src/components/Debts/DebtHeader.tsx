import { useEffect, useRef, useState } from "react";
import styles from "./DebtStyles.module.less";

const DebtHeader = ({ setPhrase, setClickSearch }: {
  setPhrase: (val: string) => void;
  setClickSearch: (val: boolean) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPhrase(event.target.value);
  };

  const handleSearch = () => {
    setClickSearch(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setPhrase("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const canSearch = searchQuery.length >= 3;

  return (
    <div className={styles.header}>

      <label htmlFor="searchDebt">PODAJ NIP LUB NAZWĘ DŁUŻNIKA</label>
      <div className={styles.searchInputContainer}>
        <input
          type="text"
          id="searchDebt"
          placeholder="Minimum 3 znaki"
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={canSearch ? handleKeyDown : () => {
          }}
          ref={inputRef}
          className={styles.searchInput}
        />

        {searchQuery && (
          <button
            className={styles.searchInputClearButton}
            onClick={handleClear}
          >
            <div className={styles.clearIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="currentColor" />
              </svg>
            </div>
          </button>
        )}

        <button onClick={handleSearch} disabled={!canSearch}
                className={!canSearch ? styles.disabledButton : ""}>SZUKAJ
        </button>

      </div>
    </div>
  );
};

export default DebtHeader;