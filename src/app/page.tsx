"use client";
import { useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  useEffect(() => {
    window.location.href = "/register";
  }, []);
  return <div className={styles.page}></div>;
}
