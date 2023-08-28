import styles from "./scrollableScreen.module.scss";

interface ScrollableScreenProps {
  index: number;
}

export const ScrollableScreen = (props: ScrollableScreenProps) => {
  const { index } = props;
  return (
    <div className={styles.scrollable_screen_field}>
      <p className={styles.scrollable_screen_index}>{index}</p>
      <div className={styles.scrollable_screen_wrapper}>
        <div className={styles.scrollable_screen}></div>
        <div className={styles.scrollable_screen}></div>
        <div className={styles.scrollable_screen}></div>
        <div className={styles.scrollable_screen}></div>
      </div>
    </div>
  );
};
