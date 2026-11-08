import { type FC, useState } from "react";
import TabItem from "./TabItem";

import "./TabView.scss";

export type TabItem = {
  id: string;
  label: string;
  Content: FC;
  onClick?: (id: string) => void;
};

type TabViewProps = {
  activeTabId?: string;
  tabs: TabItem[];
};

const TabView: FC<TabViewProps> = ({ activeTabId = "", tabs }) => {
  const [activeId, setActiveId] = useState(activeTabId || tabs[0]?.id || "");

  const handleTabClick = (tabId: string, tabIndex: number) => {
    setActiveId(tabId);
    tabs[tabIndex]?.onClick?.(tabId);
  };

  const TabContent = () => {
    const current = tabs.find(({ id }) => id === activeId);
    if (!current) return null;
    const Content = current.Content;
    return <Content />;
  };

  return (
    <div className="tab-view">
      <div className="tab-view__header">
        <ul className="tab-view__tabs-list">
          {tabs.map((tab, idx) => {
            const isTabActive = tab.id === activeId;

            return (
              <TabItem
                {...tab}
                key={tab.id}
                isActive={isTabActive}
                onClick={(tabId: string) => handleTabClick(tabId, idx)}
              />
            );
          })}
        </ul>
      </div>
      <div className="tab-view__content">
        <TabContent />
      </div>
    </div>
  );
};

export default TabView;
