import { SyntheticEvent, useState } from "react";

import styles from "./createEventModal.module.scss";

import { PrimaryButton, SecondaryButton } from "@/components/button";
import { Input, TextArea } from "@/components/input";
import ModalBase from "@/components/modal";
import { createPhotoEvent } from "@/function/photoEvent";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchPhotoEventList: () => void;
}

const CreateEventModal = (props: CreateEventModalProps) => {
  const { isOpen, onClose, refetchPhotoEventList } = props;
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
    await refetchPhotoEventList();
    onClose();
  };

  const onClickCancel = () => {
    onClose();
    setTitle("");
    setDescription("");
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      modalCardStyle={{
        padding: "24px",
      }}
    >
      <form className={styles.form} onSubmit={(e) => void onClickCreate(e)}>
        <p className={styles.modal_title}>イベントを追加</p>
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

export default CreateEventModal;
