import styles from "./circle.module.scss";

interface CircleProps {
  size: number;
}
export const Circle = (props: CircleProps) => {
  const { size } = props;
  return (
    <div
      className={styles.circle}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};
