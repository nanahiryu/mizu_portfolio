import { MdAddCircleOutline } from "react-icons/md";

import styles from "./uploadImageBox.module.scss";

interface UploadImageBoxProps {
  onChangeImage?: (file: File | null) => void;
  onChangeImageList?: (fileList: FileList | null) => void;
  imageUrl?: string;
  width?: number;
  height?: number;
}

const UploadImageBox = (props: UploadImageBoxProps) => {
  const { onChangeImage, onChangeImageList, imageUrl, width, height } = props;
  return (
    <label
      className={styles.input_field_wrapper}
      style={{
        width: width ? width : "100%",
        height: height ? height : "300px",
      }}
    >
      <div
        className={styles.input_field}
        style={
          imageUrl
            ? {
                backgroundImage: `url(${imageUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }
            : undefined
        }
      >
        <MdAddCircleOutline className={styles.icon} size="36px" />
        <p className={styles.icon_note}>ファイルをアップロード</p>
      </div>
      {onChangeImage && (
        <input
          type="file"
          className={styles.input}
          onChange={(e) => {
            onChangeImage(e.target.files ? e.target.files[0] : null);
          }}
        />
      )}
      {onChangeImageList && (
        <input
          type="file"
          className={styles.input}
          onChange={(e) => {
            onChangeImageList(e.target.files);
          }}
          multiple
        />
      )}
    </label>
  );
};

export default UploadImageBox;
