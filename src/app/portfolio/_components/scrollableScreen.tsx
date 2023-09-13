"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./scrollableScreen.module.scss";

import { fetchEventPhoto } from "@/function/eventPhoto";
import { EventPhoto } from "@/types/eventPhoto";
import { PhotoEvent } from "@/types/photoEvent";

interface ScrollableScreenProps {
  photoEvent: PhotoEvent;
  visibleScreenItemNum: number;

  // screenSizePxを指定すると、screen width/height を固定できる
  // 指定しない場合は、画面サイズを可変にし, 画面サイズに合わせて画像を表示する
  screenSizePx?: number;
}

export const ScrollableScreen = (props: ScrollableScreenProps) => {
  const { photoEvent, visibleScreenItemNum, screenSizePx } = props;
  const screenWindowRef = useRef<HTMLDivElement>(null);
  const [eventPhotoList, setEventPhotoList] = useState<EventPhoto[]>([]);

  const screenGap = 4;

  const screenSize = screenSizePx
    ? screenSizePx
    : (document.body.clientWidth - screenGap * (visibleScreenItemNum - 1)) /
      visibleScreenItemNum;

  const screenItemNum = eventPhotoList.length;
  const screenWindowWidth =
    screenSize * visibleScreenItemNum + screenGap * (visibleScreenItemNum - 1);
  const screenWrapperWidth =
    screenSize * screenItemNum + screenGap * (screenItemNum - 1);
  const scrollWidth = screenSize + screenGap;

  const refetchEventPhotoList = async () => {
    const _eventPhotoList = await fetchEventPhoto(photoEvent.id);
    setEventPhotoList(_eventPhotoList);
  };

  useEffect(() => {
    void refetchEventPhotoList();
  }, []);

  useEffect(() => {
    if (!screenWindowRef.current) return;

    screenWindowRef.current.onwheel = (e) => {
      if (e.deltaX !== 0) return;
      if (!screenWindowRef.current) return;
      e.preventDefault();
      const delta = (e.deltaY / Math.abs(e.deltaY)) * scrollWidth;
      screenWindowRef.current.scrollLeft += delta;
    };
  }, []);

  return (
    <div className={styles.scrollable_screen_field}>
      <p className={styles.scrollable_screen_title}>{photoEvent.title}</p>
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
          {eventPhotoList
            .sort((a, b) => a.order - b.order)
            .map((photo) => (
              <div
                key={photo.id}
                className={styles.scrollable_screen}
                style={{ width: screenSize, height: screenSize }}
              >
                <Image
                  src={photo.imageUrl}
                  alt=""
                  fill
                  sizes={`${screenSize}px`}
                  className={styles.image}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
