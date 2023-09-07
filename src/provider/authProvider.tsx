import { onAuthStateChanged, User } from "firebase/auth";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { auth } from "@/firebase/client";
import { userAtom } from "@/globalState/user";

interface Props {
  children: ReactNode;
}

const AuthProvider = (props: Props) => {
  const router = useRouter();

  const [user, setUser] = useAtom(userAtom);

  const setUserFunc = async (user: User | null) => {
    if (user) {
      console.log("loged in user", user);
      setUser(user);
    } else {
      setUser(null);
      router.push("/signin");
    }
  };

  useEffect(() => {
    // authの情報が変更されたらsetCurrentUserFuncを実行する
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => void setUserFunc(user)
    );
    return () => unsubscribe();
  }, []);

  return <>{props.children}</>;
};

export default AuthProvider;
