import Image from "next/image";
import styles from "./page.module.css";
import CryptoTracker from "@/components/CryptoTracker";

export default function Home() {
  return (
    <main className={styles.main}>
      <CryptoTracker />
    </main>
  );
}
