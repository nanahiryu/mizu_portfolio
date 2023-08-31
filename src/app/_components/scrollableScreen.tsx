"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./scrollableScreen.module.scss";
import Image from "next/image";

interface ScrollableScreenProps {
  index: number;
}

export const ScrollableScreen = (props: ScrollableScreenProps) => {
  const { index } = props;
  const screenWindowRef = useRef<HTMLDivElement>(null);
  const [scrollLeftIndex, setScrollLeftIndex] = useState(0);
  const screenSize = 250;
  const screenGap = 4;
  const visibleScreenItemNum = 4;
  const screenItemNum = 8;
  const screenWindowWidth =
    screenSize * visibleScreenItemNum + screenGap * (visibleScreenItemNum - 1);
  const screenWrapperWidth =
    screenSize * screenItemNum + screenGap * (screenItemNum - 1);
  const scrollWidth = screenSize + screenGap;

  useEffect(() => {
    if (!screenWindowRef.current) return;

    screenWindowRef.current.onwheel = (e) => {
      if (!screenWindowRef.current) return;
      e.preventDefault();

      let delta = e.deltaY / Math.abs(e.deltaY);
      if (delta > 0) {
        setScrollLeftIndex((prev) => {
          console.log(prev);
          if (prev === screenItemNum - visibleScreenItemNum) return prev;
          return prev + 1;
        });
      } else {
        setScrollLeftIndex((prev) => {
          console.log(prev);
          if (prev === 0) return prev;
          return prev - 1;
        });
      }

      screenWindowRef.current!.scrollLeft = scrollLeftIndex * scrollWidth;
    };
  }, [scrollLeftIndex, scrollWidth]);

  const indexArray: number[] = Array.from(
    { length: screenItemNum },
    (_, index) => index + 1
  );

  return (
    <div className={styles.scrollable_screen_field}>
      <p className={styles.scrollable_screen_index}>{index}</p>
      <div
        className={styles.scrollable_window}
        style={{ width: screenWindowWidth }}
        ref={screenWindowRef}
      >
        <div
          className={styles.scrollable_screen_wrapper}
          style={{ width: screenWrapperWidth, gap: screenGap }}
        >
          {indexArray.map((i) => (
            <div
              key={i}
              className={styles.scrollable_screen}
              style={{
                width: screenSize,
                height: screenSize,
              }}
            >
              <Image
                src={`/scrollable/cat${i}.jpeg`}
                alt=""
                fill
                className={styles.scrollable_image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
