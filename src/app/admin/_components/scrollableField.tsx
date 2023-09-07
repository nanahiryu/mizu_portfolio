import Image from "next/image";
import { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";

import styles from "./scrollableField.module.scss";

import UploadImageBox from "@/components/uploadImageBox";
import {
  createEventPhoto,
  deleteEventPhoto,
  fetchEventPhoto,
  updateEventPhoto,
} from "@/function/eventPhoto";
import { deleteImage, uploadImage } from "@/function/file";
import { EventPhoto } from "@/types/eventPhoto";
import { PhotoEvent } from "@/types/photoEvent";

interface ScrollableFieldProps {
  photoEvent: PhotoEvent;
}

const ScrollableField = (props: ScrollableFieldProps) => {
  const { photoEvent } = props;
  const [eventPhotoList, setEventPhotoList] = useState<EventPhoto[]>([]);
  const screenGap = 4;
  const screenSize = 200;
  const screenItemNumRow = 6;
  const imageFieldWidth =
    screenSize * screenItemNumRow + screenGap * (screenItemNumRow - 1);

  const refetchEventPhotoList = async () => {
    const _eventPhotoList = await fetchEventPhoto(photoEvent.id);
    setEventPhotoList(_eventPhotoList);
  };

  const deletePhoto = async (eventPhoto: EventPhoto) => {
    if (!confirm("本当に削除しますか？")) return;
    await deleteEventPhoto(photoEvent.id, eventPhoto.id);
    await deleteImage(
      `photoEvent/${photoEvent.id}/eventPhoto/${eventPhoto.id}`
    );
    await refetchEventPhotoList();
  };

  const uploadProfileImage = async (image: File | null) => {
    if (!image) return "";
    const _eventPhoto = {
      id: "",
      title: image.name,
      description: "",
      imageUrl: "",
      order: eventPhotoList.length,
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
    await refetchEventPhotoList();
  };

  useEffect(() => {
    void refetchEventPhotoList();
  }, []);

  return (
    <div className={styles.scrollable_field}>
      <p className={styles.scrollable_title}>{photoEvent.title}</p>
      <div
        className={styles.image_field}
        style={{
          width: imageFieldWidth,
        }}
      >
        <UploadImageBox
          onChangeImage={uploadProfileImage}
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
              <div
                className={styles.delete_button}
                onClick={() => deletePhoto(eventPhoto)}
              >
                <MdClear
                  className={styles.delete_icon}
                  size={24}
                  color="#fff"
                />
              </div>
              <Image
                src={eventPhoto.imageUrl}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ScrollableField;
