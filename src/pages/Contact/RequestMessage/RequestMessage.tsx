import type { FC } from "react";
import type { IconSvgElement } from "@hugeicons/react";
import { classnames } from "@common/utils";
import Icon from "@components/Icon";

import "./RequestMessage.scss";

export type RequestMessageProps = {
  iconSrc: IconSvgElement;
  variant: "success" | "error";
  title: string;
  message: string;
};

const RequestMessage: FC<RequestMessageProps> = ({
  iconSrc,
  variant,
  title,
  message,
}) => {
  const iconClass = classnames({
    "request-message__icon": true,
    [`request-message__icon--${variant}`]: !!variant,
  });

  return (
    <div className="request-message">
      <div className="request-message__header">
        <Icon className={iconClass} src={iconSrc} />
        <h3 className="request-message__title">{title}</h3>
      </div>

      <p className="request-message__text">{message}</p>
    </div>
  );
};

export default RequestMessage;
