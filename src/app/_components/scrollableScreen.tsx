"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./scrollableScreen.module.scss";
import { set } from "firebase/database";
import Image from "next/image";

interface ScrollableScreenProps {
  index: number;
}

export const ScrollableScreen = (props: ScrollableScreenProps) => {
  const { index } = props;
  const screenRef = useRef<HTMLDivElement>(null);
  const [scrollLeftIndex, setScrollLeftIndex] = useState(0);
  const screenItemNum = 8;
  const screenWrapperWidth = 250 * screenItemNum + 4 * (screenItemNum - 1);
  const scrollWidth = 250 + 4;

  useEffect(() => {
    if (!screenRef.current) return;

    screenRef.current.onwheel = (e) => {
      if (!screenRef.current) return;
      e.preventDefault();

      let delta = e.deltaY / Math.abs(e.deltaY);
      if (delta > 0) {
        setScrollLeftIndex((prev) => {
          console.log(prev);
          if (prev === screenItemNum - 4) return prev;
          return prev + 1;
        });
      } else {
        setScrollLeftIndex((prev) => {
          console.log(prev);
          if (prev === 0) return prev;
          return prev - 1;
        });
      }

      screenRef.current!.scrollLeft = scrollLeftIndex * scrollWidth;
    };
  }, [scrollLeftIndex, scrollWidth]);

  return (
    <div className={styles.scrollable_screen_field}>
      <p className={styles.scrollable_screen_index}>{index}</p>
      <div className={styles.scrollable_window} ref={screenRef}>
        <div
          className={styles.scrollable_screen_wrapper}
          style={{ width: screenWrapperWidth }}
        >
          <div className={styles.scrollable_screen}>
            <Image
              src="/scrollable/cat1.jpeg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.scrollable_screen}>
            <Image
              src="/scrollable/cat2.jpeg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.scrollable_screen}>
            <Image
              src="/scrollable/cat3.jpeg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.scrollable_screen}>
            <Image
              src="/scrollable/cat4.jpeg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.scrollable_screen}>
            <Image
              src="/scrollable/cat5.jpeg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.scrollable_screen}>
            <Image
              src="/scrollable/cat6.jpeg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.scrollable_screen}>
            <Image
              src="/scrollable/cat7.jpeg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.scrollable_screen}>
            <Image
              src="/scrollable/cat8.jpeg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
