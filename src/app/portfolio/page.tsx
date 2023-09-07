"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ScrollableScreen } from "./_components/scrollableScreen";
import styles from "./page.module.scss";

import { fetchPhotoEvent } from "@/function/photoEvent";
import { fetchTopImageDetail } from "@/function/topImage";
import { PhotoEvent } from "@/types/photoEvent";
import { TopImage } from "@/types/topImage";

const Home = () => {
  const [topImage, setTopImage] = useState<TopImage>();
  const [photoEventList, setPhotoEventList] = useState<PhotoEvent[]>([]);

  const refetchTopImage = async () => {
    const _topImage = await fetchTopImageDetail("topImage");
    setTopImage(_topImage);
  };

  const refetchPhotoEventList = async () => {
    const _photoEventList = await fetchPhotoEvent();
    setPhotoEventList(_photoEventList);
  };

  useEffect(() => {
    void refetchTopImage();
    void refetchPhotoEventList();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main_screen_wrapper}>
        <Image
          src={topImage?.imageUrl || "/mainScreen/main.jpeg"}
          alt=""
          fill
          className={styles.image}
        />
      </div>
      {photoEventList.map((event) => (
        <ScrollableScreen
          key={event.id}
          photoEvent={event}
          visibleScreenItemNum={6}
        />
      ))}
    </div>
  );
};

export default Home;
