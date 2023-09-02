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
      <ScrollableScreen
        title="Sep"
        visibleScreenItemNum={4}
        screenSizePx={250}
      />
      <ScrollableScreen title="Oct" visibleScreenItemNum={6} />
    </div>
  );
};

export default Home;
