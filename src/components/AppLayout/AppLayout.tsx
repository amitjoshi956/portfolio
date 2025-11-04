import React, { type FC } from "react";
import AuroraBg from "../AuroraBg";

import "./AppLayout.scss";

type AppLayoutProps = {
  children?: React.ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <div className="app-layout__header"></div>
      <div className="app-layout__content">{children}</div>
      <div className="app-layout__footer"></div>
      <AuroraBg />
    </div>
  );
};

export default AppLayout;
