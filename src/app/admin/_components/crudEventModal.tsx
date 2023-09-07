import { SyntheticEvent, useEffect, useState } from "react";

import styles from "./crudEventModal.module.scss";

import { PrimaryButton, SecondaryButton } from "@/components/button";
import { Input, TextArea } from "@/components/input";
import ModalBase from "@/components/modal";
import { createPhotoEvent, updatePhotoEvent } from "@/function/photoEvent";
import { PhotoEvent } from "@/types/photoEvent";

interface CrudEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "create" | "edit";
  // updateの場合はphotoEventを渡す
  photoEvent?: PhotoEvent;
  fetchDisplayData: () => void;
}

const CrudEventModal = (props: CrudEventModalProps) => {
  const { isOpen, onClose, type, photoEvent, fetchDisplayData } = props;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onClickCreate = async (e: SyntheticEvent) => {
    e.preventDefault();
    const _photoEvent = {
      id: "",
      title,
      description,
    };
    await createPhotoEvent(_photoEvent);
    await fetchDisplayData();
    onClose();
  };

  const onClickUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!photoEvent) return;
    const _photoEvent = {
      id: photoEvent.id,
      title,
      description,
    };
    await updatePhotoEvent(_photoEvent);
    await fetchDisplayData();
    onClose();
  };

  const onClickCancel = () => {
    onClose();
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    if (type === "edit") {
      setTitle(photoEvent?.title ?? "");
      setDescription(photoEvent?.description ?? "");
    }
  }, [type, photoEvent]);

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      modalCardStyle={{
        padding: "24px",
      }}
    >
      <form
        className={styles.form}
        onSubmit={(e) =>
          type === "create" ? void onClickCreate(e) : void onClickUpdate(e)
        }
      >
        <p className={styles.modal_title}>
          {type === "create" ? "イベントを追加" : "イベントを編集"}
        </p>
        <div className={styles.form_row_wrapper}>
          <p className={styles.form_row_title}>title</p>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={styles.form_row_wrapper}>
          <p className={styles.form_row_title}>description</p>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.buttons_wrapper}>
          <PrimaryButton type="submit">追加</PrimaryButton>
          <SecondaryButton type="reset" onClick={onClickCancel}>
            キャンセル
          </SecondaryButton>
        </div>
      </form>
    </ModalBase>
  );
};

export default CrudEventModal;
