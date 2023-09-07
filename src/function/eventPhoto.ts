import { eventPhotoConverter } from "@/converter/eventPhoto";
import { firestore } from "@/firebase/client";
import { EventPhoto } from "@/types/eventPhoto";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export const fetchEventPhoto = async (
  photoEventId: string
): Promise<EventPhoto[]> => {
  const _collectionRef = collection(
    firestore,
    "photoEvent",
    photoEventId,
    "eventPhoto"
  ).withConverter(eventPhotoConverter);
  const _querySnapshot = await getDocs(_collectionRef);
  const eventPhotoList = _querySnapshot.docs.map((doc) => doc.data());
  return eventPhotoList;
};

export const createEventPhoto = async (
  photoEventId: string,
  eventPhoto: EventPhoto
): Promise<string> => {
  const _collectionRef = collection(
    firestore,
    "photoEvent",
    photoEventId,
    "eventPhoto"
  ).withConverter(eventPhotoConverter);
  const _docRef = await addDoc(_collectionRef, eventPhoto);
  return _docRef.id;
};

export const updateEventPhoto = async (
  photoEventId: string,
  eventPhoto: EventPhoto
): Promise<void> => {
  const _docRef = doc(
    firestore,
    "photoEvent",
    photoEventId,
    "eventPhoto",
    eventPhoto.id
  ).withConverter(eventPhotoConverter);
  await setDoc(_docRef, eventPhoto);
};

export const deleteEventPhoto = async (
  photoEventId: string,
  eventPhotoId: string
): Promise<void> => {
  const _docRef = doc(
    firestore,
    "photoEvent",
    photoEventId,
    "eventPhoto",
    eventPhotoId
  );
  await deleteDoc(_docRef);
};
