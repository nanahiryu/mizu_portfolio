import Image from "next/image";
import { useEffect, useState } from "react";

import CrudEventModal from "./crudEventModal";
import styles from "./scrollableField.module.scss";

import {
  CircleDeleteButton,
  PrimaryButton,
  SecondaryButton,
} from "@/components/button";
import UploadImageBox from "@/components/uploadImageBox";
import {
  createEventPhoto,
  deleteEventPhotoAndFile,
  fetchEventPhoto,
  updateEventPhoto,
} from "@/function/eventPhoto";
import { uploadImage } from "@/function/file";
import { deletePhotoEvent } from "@/function/photoEvent";
import useDisclosure from "@/hooks/useDisclosure";
import { EventPhoto } from "@/types/eventPhoto";
import { PhotoEvent } from "@/types/photoEvent";

interface ScrollableFieldProps {
  photoEvent: PhotoEvent;
  refetchPhotoEventList: () => void;
}

const ScrollableField = (props: ScrollableFieldProps) => {
  const { photoEvent, refetchPhotoEventList } = props;
  const [eventPhotoList, setEventPhotoList] = useState<EventPhoto[]>([]);
  const screenGap = 4;
  const screenSize = 200;
  const screenItemNumRow = 6;
  const imageFieldWidth =
    screenSize * screenItemNumRow + screenGap * (screenItemNumRow - 1);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const refetchEventPhotoList = async () => {
    const _eventPhotoList = await fetchEventPhoto(photoEvent.id);
    console.log(_eventPhotoList);
    setEventPhotoList(_eventPhotoList);
  };

  const deleteEvent = async () => {
    if (!confirm("本当に削除しますか？")) return;
    for (const eventPhoto of eventPhotoList) {
      await deleteEventPhotoAndFile(photoEvent.id, eventPhoto.id);
    }
    await deletePhotoEvent(photoEvent.id);
    await refetchPhotoEventList();
  };

  const deletePhoto = async (eventPhoto: EventPhoto) => {
    if (!confirm("本当に削除しますか？")) return;
    await deleteEventPhotoAndFile(photoEvent.id, eventPhoto.id);
    // orderを更新
    const _eventPhotoList = eventPhotoList.filter(
      (photo) => photo.id !== eventPhoto.id
    );
    for (const _eventPhoto of _eventPhotoList) {
      if (_eventPhoto.order <= eventPhoto.order) continue;
      _eventPhoto.order -= 1;
      await updateEventPhoto(photoEvent.id, _eventPhoto);
    }
    await refetchEventPhotoList();
  };

  const uploadProfileImageList = async (imageList: FileList | null) => {
    if (!imageList) return "";
    for (const [index, image] of Object.entries(Array.from(imageList))) {
      const _eventPhoto = {
        id: "",
        title: image.name,
        description: "",
        imageUrl: "",
        order: eventPhotoList.length + Number(index),
      };
      const _id = await createEventPhoto(photoEvent.id, _eventPhoto);
      const downloadUrl = await uploadImage(
        `photoEvent/${photoEvent.id}/eventPhoto/${_id}`,
        image
      );
      const _updatedEventPhoto = {
        ..._eventPhoto,
        id: _id,
        imageUrl: downloadUrl,
      };
      await updateEventPhoto(photoEvent.id, _updatedEventPhoto);
    }

    await refetchEventPhotoList();
  };

  useEffect(() => {
    void refetchEventPhotoList();
  }, []);

  return (
    <>
      <div className={styles.scrollable_field}>
        <div
          className={styles.scrollable_title_wrapper}
          style={{
            width: imageFieldWidth,
          }}
        >
          <p className={styles.scrollable_title}>{photoEvent.title}</p>
          <div className={styles.scrollable_edit_buttons_wrapper}>
            <PrimaryButton onClick={onOpen}>編集</PrimaryButton>
            <SecondaryButton onClick={deleteEvent}>削除</SecondaryButton>
          </div>
        </div>
        <div
          className={styles.image_field}
          style={{
            width: imageFieldWidth,
          }}
        >
          <UploadImageBox
            onChangeImageList={uploadProfileImageList}
            width={screenSize}
            height={screenSize}
          />
          {eventPhotoList
            .sort((a, b) => a.order - b.order)
            .map((eventPhoto) => (
              <div
                key={eventPhoto.id}
                className={styles.image_card}
                style={{ width: screenSize, height: screenSize }}
              >
                <div className={styles.delete_button_wrapper}>
                  <CircleDeleteButton onClick={() => deletePhoto(eventPhoto)} />
                </div>
                <Image
                  src={eventPhoto.imageUrl}
                  alt=""
                  fill
                  sizes={`${screenSize}px`}
                  className={styles.image}
                />
              </div>
            ))}
        </div>
      </div>
      <CrudEventModal
        isOpen={isOpen}
        onClose={onClose}
        type="edit"
        photoEvent={photoEvent}
        fetchDisplayData={refetchPhotoEventList}
      />
    </>
  );
};

export default ScrollableField;
