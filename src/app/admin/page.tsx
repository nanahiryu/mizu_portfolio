"use client";

import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

import CreateEventModal from "./_components/createEventModal";
import ScrollableField from "./_components/scrollableField";
import TopImageField from "./_components/topImageField";
import styles from "./page.module.scss";

import { PrimaryButton } from "@/components/button";
import { fetchPhotoEvent } from "@/function/photoEvent";
import useDisclosure from "@/hooks/useDisclosure";
import { PhotoEvent } from "@/types/photoEvent";

const Admin = () => {
  const [photoEventList, setPhotoEventList] = useState<PhotoEvent[]>([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const refetchPhotoEventList = async () => {
    const _photoEventList = await fetchPhotoEvent();
    setPhotoEventList(_photoEventList);
  };

  useEffect(() => {
    void refetchPhotoEventList();
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <TopImageField />
        <div>
          <PrimaryButton onClick={onOpen}>
            <MdAdd size="16" />
            イベントを追加
          </PrimaryButton>
        </div>
        {photoEventList.map((event) => (
          <ScrollableField key={event.id} photoEvent={event} />
        ))}
        <div />
      </div>
      <CreateEventModal
        isOpen={isOpen}
        onClose={onClose}
        refetchPhotoEventList={refetchPhotoEventList}
      />
    </>
  );
};

export default Admin;
