import { type FC, useState } from "react";
import type { TabItem as TTabItem } from "@base/type";
import TabItem from "./TabItem";

import "./TabView.scss";

type TabViewProps = {
  activeTabId?: string;
  tabs: TTabItem[];
};

const TabView: FC<TabViewProps> = ({ activeTabId = "", tabs }) => {
  const [activeId, setActiveId] = useState(activeTabId || tabs[0].id);

  const handleTabClick = (tabId: string, tabIndex: number) => {
    setActiveId(tabId);
    tabs[tabIndex].onClick?.(tabId);
  };

  const TabContent = () => {
    const Content = tabs.find(({ id }) => id === activeId)!.Content;
    return <Content />;
  };

  return (
    <div className="tab-view">
      <ul className="tab-view__header">
        {tabs.map((tab, idx) => {
          const isTabActive = tab.id === activeId;

          return (
            <TabItem
              {...tab}
              key={tab.id}
              isActive={isTabActive}
              onClick={(tabId) => handleTabClick(tabId, idx)}
            />
          );
        })}
      </ul>
      <div className="tab-view__content">
        <TabContent />
      </div>
    </div>
  );
};

export default TabView;
