import type { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import { IcCancel } from "@assets/icons";
import Button from "@components/Button";

import "./Modal.scss";

export enum ModalSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

type ModalProps = {
  open?: boolean;
  className?: string;
  headerClassName?: string;
  title?: string;
  size?: ModalSize;
  children?: ReactNode;
  onClose?: () => void;
};

const Modal: FC<ModalProps> = ({
  open = false,
  className = "",
  headerClassName = "",
  title = "",
  size = ModalSize.Small,
  children = "",
  onClose,
}) => {
  if (!open) return null;

  return createPortal(
    <>
      <div className="modal-backdrop"></div>
      <div className={`modal modal--${size} ${className}`}>
        <div className={`modal__header ${headerClassName}`}>
          <h4 className="modal__title">{title}</h4>
          <Button
            className="modal__close-btn"
            variant="icon-only"
            iconSrc={IcCancel}
            onClick={onClose}
          />
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </>,
    document.getElementById("popper-container")!
  );
};

export default Modal;
