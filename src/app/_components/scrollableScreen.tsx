"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./scrollableScreen.module.scss";
import Image from "next/image";

interface ScrollableScreenProps {
  title: string;
  visibleScreenItemNum: number;

  // screenSizePxを指定すると、screen width/height を固定できる
  // 指定しない場合は、画面サイズを可変にし, 画面サイズに合わせて画像を表示する
  screenSizePx?: number;
}

export const ScrollableScreen = (props: ScrollableScreenProps) => {
  const { title, visibleScreenItemNum, screenSizePx } = props;
  const screenWindowRef = useRef<HTMLDivElement>(null);
  const [scrollLeftIndex, setScrollLeftIndex] = useState(0);

  const screenGap = 4;

  const screenSize = screenSizePx
    ? screenSizePx
    : (document.body.clientWidth - screenGap * (visibleScreenItemNum - 1)) /
      visibleScreenItemNum;

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
      <p className={styles.scrollable_screen_title}>{title}</p>
      <div
        className={styles.scrollable_window}
        ref={screenWindowRef}
        style={{
          width: screenWindowWidth,
        }}
      >
        <div
          className={styles.scrollable_screen_wrapper}
          style={{ width: screenWrapperWidth, gap: screenGap }}
        >
          {indexArray.map((index) => (
            <div
              key={index}
              className={styles.scrollable_screen}
              style={{ width: screenSize, height: screenSize }}
            >
              <Image
                src={`/scrollable/cat${index}.jpeg`}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
