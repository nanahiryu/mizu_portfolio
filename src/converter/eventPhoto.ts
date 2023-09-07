import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { EventPhoto } from "@/types/eventPhoto";

export const eventPhotoConverter: FirestoreDataConverter<EventPhoto> = {
  toFirestore: (eventPhoto: EventPhoto): DocumentData => {
    const newDoc: Partial<EventPhoto> = { ...eventPhoto };
    delete newDoc.id;
    return newDoc;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): EventPhoto => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: (data.title as string) ?? "",
      description: (data.description as string) ?? "",
      imageUrl: (data.imageUrl as string) ?? "",
      order: (data.order as number) ?? 0,
    };
  },
};
