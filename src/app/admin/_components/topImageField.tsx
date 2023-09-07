import { useEffect, useState } from "react";

import styles from "./topImageField.module.scss";

import UploadImageBox from "@/components/uploadImageBox";
import { uploadImage } from "@/function/file";
import { fetchTopImageDetail, updateTopImage } from "@/function/topImage";
import { TopImage } from "@/types/topImage";

const TopImageField = () => {
  const [topImage, setTopImage] = useState<TopImage>();

  const refetchTopImage = async () => {
    const _topImage = await fetchTopImageDetail("topImage");
    setTopImage(_topImage);
  };

  const uploadTopImage = async (image: File | null) => {
    if (!image) return;
    const downloadUrl = await uploadImage(
      `topImage/${image?.name ?? ""}`,
      image
    );
    if (topImage) {
      await updateTopImage({
        id: "topImage",
        title: topImage.title,
        description: topImage.description,
        imageUrl: downloadUrl,
      });
    } else {
      await updateTopImage({
        id: "topImage",
        title: "",
        description: "",
        imageUrl: downloadUrl,
      });
    }
    await refetchTopImage();
  };

  useEffect(() => {
    refetchTopImage();
  }, []);

  return (
    <div className={styles.main_screen_field}>
      <UploadImageBox
        imageUrl={topImage ? topImage.imageUrl : ""}
        onChangeImage={uploadTopImage}
        height={400}
      />
    </div>
  );
};

export default TopImageField;
