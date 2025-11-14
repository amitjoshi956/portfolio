import type { FC } from "react";
import type { TabItem as TTabItem } from "@base/type";

import "./TabItem.scss";

export type TabItemProps = TTabItem & {
  isActive?: boolean;
};

const TabItem: FC<TabItemProps> = ({ id, label, isActive, onClick }) => {
  const tabItemClass = `tab-item ${isActive ? "tab-item--active" : ""}`.trim();

  return (
    <li key={id} className={tabItemClass}>
      <button className="tab-item__btn" onClick={() => onClick?.(id)}>
        {label}
      </button>
    </li>
  );
};

export default TabItem;
