import Image from "next/image";
import styles from "./page.module.scss";
import { ScrollableScreen } from "./_components/scrollableScreen";

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main_screen_wrapper}>
        <Image
          src="/mainScreen/main.jpeg"
          alt=""
          fill
          className={styles.main_image}
        />
      </div>
      <ScrollableScreen index={1} />
      <ScrollableScreen index={2} visibleScreenItemNum={6} />
    </div>
  );
};

export default Home;
