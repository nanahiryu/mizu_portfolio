"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import styles from "./page.module.scss";

import { PrimaryButton } from "@/components/button";
import { Input } from "@/components/input";
import { loginWithEmail } from "@/function/auth";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const onSignIn = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await loginWithEmail(email, password);
      router.push("/admin");
    } catch (e) {
      const error = e as Error;
      window.alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.card_title}>管理画面ログイン</p>
        <form onSubmit={(e) => onSignIn(e)}>
          <div className={styles.form_group}>
            <div className={styles.form_wrapper}>
              <p className={styles.form_row_title}>email</p>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
            <div className={styles.form_wrapper}>
              <p className={styles.form_row_title}>password</p>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <PrimaryButton additionalClassName={styles.login_button}>
              ログイン
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
