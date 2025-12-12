import { useState, type ChangeEvent, type FC } from "react";
import { classnames } from "@common/utils";
import { IcCancel } from "@assets/icons";
import Button from "@components/Button";

import "./Searchbar.scss";

type SearchbarProps = {
  className?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
  onClearSearch?: () => void;
};

const Searchbar: FC<SearchbarProps> = ({
  className = "",
  placeholder = "",
  onSearch,
  onClearSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchBarClass = classnames({
    searchbar__input: true,
    [className]: !!className,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onClearSearch?.();
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        className={searchBarClass}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && (
        <Button
          className="searchbar__clear-btn"
          variant="icon-only"
          iconSrc={IcCancel}
          onClick={clearSearch}
        />
      )}
    </div>
  );
};

export default Searchbar;
