import { MdClear } from "react-icons/md";

import styles from "./button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  additionalClassName?: string;
}

export const PrimaryButton = (props: ButtonProps) => {
  const { children, additionalClassName, ...rest } = props;
  return (
    <button
      className={`${styles.primary_button} ${additionalClassName}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = (props: ButtonProps) => {
  const { children, additionalClassName, ...rest } = props;
  return (
    <button
      className={`${styles.secondary_button} ${additionalClassName}`}
      {...rest}
    >
      {children}
    </button>
  );
};

interface NoChildrenButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const CircleDeleteButton = (props: NoChildrenButtonProps) => {
  const { ...rest } = props;
  return (
    <button className={styles.circle_delete_button} {...rest}>
      <MdClear className={styles.delete_icon} size={24} color="#fff" />
    </button>
  );
};
