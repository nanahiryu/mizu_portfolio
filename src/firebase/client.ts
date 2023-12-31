import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

// 必要な機能をインポート
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import {
  Firestore,
  connectFirestoreEmulator,
  getFirestore,
} from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const ENV = process.env.NEXT_PUBLIC_ENV ?? "";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "",
};
// Firebaseアプリの初期化
export const app = initializeApp(firebaseConfig);

// ローカルで実行中はエミュレータを使う
const isEmulating = ENV === "local";

export const initFirestore = (): Firestore => {
  try {
    console.log("isEmulating: ", isEmulating);
    const firestore: Firestore = getFirestore(app);
    if (isEmulating) {
      connectFirestoreEmulator(firestore, "localhost", 8080);
    }
    return firestore;
  } catch (error) {
    console.error("Error initializing database", error);
    throw error;
  }
};

export const initAuth = (): Auth => {
  const auth = getAuth(app);
  if (isEmulating) {
    connectAuthEmulator(auth, "http://localhost:9099");
  }
  return auth;
};

export const initStorage = () => {
  const storage = getStorage(app);
  if (isEmulating) {
    connectStorageEmulator(storage, "localhost", 9199);
  }
  return storage;
};

export const initFunctions = () => {
  const functions = getFunctions(app, "asia-northeast1");
  if (isEmulating) {
    connectFunctionsEmulator(functions, "localhost", 5001);
  }
  return functions;
};

export const firestore = initFirestore();
export const auth = initAuth();
export const storage = initStorage();
export const functions = initFunctions();

// 他ファイルで使うために機能をエクスポート
let analytics;
if (app.name && typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
