import { type FC } from "react";

import "./Loader.scss";

type LoaderProps = {
  message?: string;
};

const Loader: FC<LoaderProps> = ({ message }) => {
  return (
    <div className="loader">
      <div className="loader__spinner">
        <div className="loader__spinner-ring"></div>
        <div className="loader__spinner-ring"></div>
        <div className="loader__spinner-ring"></div>
      </div>
      {message && <p className="loader__message">{message}</p>}
    </div>
  );
};

export default Loader;
