"use client";
import Link from "next/link";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.menu_item}>
        <Link href="/about">about</Link>
      </div>
      <div className={styles.menu_item}>
        <Link href="/photo">photo</Link>
      </div>
      <div className={styles.menu_item}>
        <Link href="/log">log</Link>
      </div>
    </div>
  );
};

export default Header;
