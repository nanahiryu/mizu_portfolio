import { PhotoEvent } from "./../types/photoEvent";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export const photoEventConverter: FirestoreDataConverter<PhotoEvent> = {
  toFirestore: (photoEvent: PhotoEvent): DocumentData => {
    const newDoc: Partial<PhotoEvent> = { ...photoEvent };
    delete newDoc.id;
    return newDoc;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): PhotoEvent => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: (data.title as string) ?? "",
      description: (data.description as string) ?? "",
    };
  },
};
