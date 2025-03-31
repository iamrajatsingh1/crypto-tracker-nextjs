import Image from "next/image";
import styles from "./page.module.css";
import CryptoTracker from "@/components/CryptoTracker";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className="text-2xl font-bold mb-4">Crypto Tracker App</h1>
      <CryptoTracker />
    </main>
  );
}
