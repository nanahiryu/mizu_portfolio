import {
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/client";

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const _userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return _userCredential;
  } catch (e) {
    const error = e as Error;
    throw error;
  }
};

export const logout = (): Promise<void> => {
  return signOut(auth);
};
