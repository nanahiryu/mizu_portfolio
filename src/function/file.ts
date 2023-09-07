import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { storage } from "@/firebase/client";

export const uploadImage = async (
  path: string,
  image: File
): Promise<string> => {
  const storageRef = ref(storage, path);
  const uploadSnapshot = await uploadBytes(storageRef, image);
  const downloadUrl = await getDownloadURL(uploadSnapshot.ref);
  return downloadUrl;
};

export const deleteImage = async (path: string): Promise<void> => {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
};
