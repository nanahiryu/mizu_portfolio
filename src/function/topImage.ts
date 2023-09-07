import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";

import { topImageConverter } from "@/converter/topImage";
import { firestore } from "@/firebase/client";
import { TopImage } from "@/types/topImage";

export const fetchTopImage = async (): Promise<TopImage> => {
  const _collectionRef = collection(firestore, "topImage").withConverter(
    topImageConverter
  );
  const _query = query(_collectionRef);
  const _querySnapshot = await getDocs(_query);
  const topImageList = _querySnapshot.docs.map((doc) => doc.data());
  return topImageList[0];
};

export const fetchTopImageDetail = async (
  id: string
): Promise<TopImage | undefined> => {
  const _docRef = doc(firestore, "topImage", id).withConverter(
    topImageConverter
  );
  const _docSnapshot = await getDoc(_docRef);
  if (!_docSnapshot.exists()) return;
  return _docSnapshot.data();
};

export const createTopImage = async (topImage: TopImage): Promise<void> => {
  const _collectionRef = collection(firestore, "topImage").withConverter(
    topImageConverter
  );
  await addDoc(_collectionRef, topImage);
};

export const updateTopImage = async (topImage: TopImage): Promise<void> => {
  const _docRef = doc(firestore, "topImage", topImage.id).withConverter(
    topImageConverter
  );
  await setDoc(_docRef, topImage);
};
