import Header from "@/components/Header";

export default function Leaderboard() {
  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>Leaderboard</h1>
        <p>Check your ranking and see how you compare to other players.</p>
        <div style={{ marginTop: '20px' }}>
          <h3>Top Players:</h3>
          <ol>
            <li>ProGamer123 - 15,250 points</li>
            <li>GameMaster - 14,890 points</li>
            <li>SkillPlayer - 13,670 points</li>
            <li>ChampionX - 12,445 points</li>
            <li>EliteGamer - 11,230 points</li>
          </ol>
        </div>
      </div>
    </div>
  );
}