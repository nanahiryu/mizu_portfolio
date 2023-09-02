import { TopImage } from "@/types/topImage";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export const topImageConverter: FirestoreDataConverter<TopImage> = {
  toFirestore: (topImage: TopImage): DocumentData => {
    const newDoc: Partial<TopImage> = { ...topImage };
    delete newDoc.id;
    return newDoc;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): TopImage => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: (data.title as string) ?? "",
      description: (data.description as string) ?? "",
      imageUrl: (data.imageUrl as string) ?? "",
    };
  },
};
