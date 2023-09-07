import styles from "./input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputProps) => {
  return <input className={styles.input} {...props} />;
};

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = (props: TextAreaProps) => {
  return <textarea className={styles.textarea} {...props} />;
};
