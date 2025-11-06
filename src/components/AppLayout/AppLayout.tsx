import React, { type FC } from "react";
import AuroraBg from "../AuroraBg";
import Header from "@components/Header";

import "./AppLayout.scss";

type AppLayoutProps = {
  children?: React.ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <div className="app-layout__content">{children}</div>
      <AuroraBg />
    </div>
  );
};

export default AppLayout;
