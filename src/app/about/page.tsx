import Header from "@/components/Header";

export default function About() {
  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>About GamesNGo</h1>
        <p>Welcome to the ultimate gaming platform where players connect, compete, and conquer.</p>
        <div style={{ marginTop: '20px' }}>
          <h3>Our Mission:</h3>
          <p>To create the best gaming experience by connecting players worldwide and providing exciting tournaments, competitions, and social features.</p>

          <h3>Features:</h3>
          <ul>
            <li>Wide variety of games</li>
            <li>Competitive tournaments</li>
            <li>Global leaderboards</li>
            <li>Player profiles and statistics</li>
            <li>Social gaming community</li>
          </ul>
        </div>
      </div>
    </div>
  );
}