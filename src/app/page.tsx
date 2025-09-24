import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import ProfileAvatar from "@/components/ProfileAvatar";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header/>
      <ProfileAvatar/>
      {/* <div style={{ padding: '20px' }}>
        <h1>Welcome to GamesNGo</h1>
        <p>Your ultimate gaming destination!</p>
        <div style={{ marginTop: '20px' }}>
          <h3>Quick Navigation:</h3>
          <ul>
            <li><a href="/games">Games</a></li>
            <li><a href="/tournaments">Tournaments</a></li>
            <li><a href="/leaderboard">Leaderboard</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
      </div> */}
    </div>
  );
}

