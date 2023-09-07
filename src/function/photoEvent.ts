import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";

import { photoEventConverter } from "@/converter/photoEvent";
import { firestore } from "@/firebase/client";
import { EventPhoto } from "@/types/eventPhoto";
import { PhotoEvent } from "@/types/photoEvent";

export const fetchPhotoEvent = async (): Promise<PhotoEvent[]> => {
  const _collectionRef = collection(firestore, "photoEvent").withConverter(
    photoEventConverter
  );
  const _query = query(_collectionRef);
  const _querySnapshot = await getDocs(_query);
  const photoEventList = _querySnapshot.docs.map((doc) => doc.data());
  return photoEventList;
};

export const createPhotoEvent = async (
  photoEvent: PhotoEvent
): Promise<void> => {
  const _collectionRef = collection(firestore, "photoEvent").withConverter(
    photoEventConverter
  );
  await addDoc(_collectionRef, photoEvent);
};

export const updatePhotoEvent = async (
  photoEvent: PhotoEvent
): Promise<void> => {
  const _docRef = doc(firestore, "photoEvent", photoEvent.id).withConverter(
    photoEventConverter
  );
  await setDoc(_docRef, photoEvent);
};

export const deletePhotoEvent = async (id: string): Promise<void> => {
  const _docRef = doc(firestore, "photoEvent", id);
  await deleteDoc(_docRef);
};

export const deletePhotoEventCompletely = async (
  photoEventId: string,
  eventPhotoList: EventPhoto[]
): Promise<void> => {};
