"use client";
import Link from "next/link";

import styles from "./header.module.scss";

import { SecondaryButton } from "@/components/button";
import { logout } from "@/function/auth";

const Header = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.menu_items_left}>
        <div className={styles.menu_item}>
          <Link href="#">about</Link>
        </div>
        <div className={styles.menu_item}>
          <Link href="#">photo</Link>
        </div>
        <div className={styles.menu_item}>
          <Link href="#">log</Link>
        </div>
      </div>
      <div className={styles.menu_items_right}>
        <SecondaryButton onClick={logout}>ログアウト</SecondaryButton>
      </div>
    </div>
  );
};

export default Header;
