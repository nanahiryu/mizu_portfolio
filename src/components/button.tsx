import styles from "./button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const PrimaryButton = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return (
    <button className={styles.primary_button} {...rest}>
      {children}
    </button>
  );
};

export const SecondaryButton = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return (
    <button className={styles.secondary_button} {...rest}>
      {children}
    </button>
  );
};
