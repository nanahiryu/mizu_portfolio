import { CSSProperties, ReactNode } from "react";

import styles from "./modal.module.scss";

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  // divのstyleを指定する
  modalCardStyle?: CSSProperties;
}

const ModalBase = (props: ModalBaseProps) => {
  const { isOpen, onClose, children, modalCardStyle } = props;
  return (
    <div
      className={isOpen ? styles.overlay : styles.overlay_hidden}
      onClick={onClose}
    >
      <div
        className={styles.modal_flame}
        style={modalCardStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalBase;
