"use client";
import Link from "next/link";

import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.menu_item}>
        <Link href="/portfolio">home</Link>
      </div>
      <div className={styles.menu_item}>
        <Link href="/portfolio/about">about</Link>
      </div>
      <div className={styles.menu_item}>
        <Link href="/portfolio/photo">photo</Link>
      </div>
      <div className={styles.menu_item}>
        <Link href="/portfolio/log">log</Link>
      </div>
    </div>
  );
};

export default Header;
