import Header from "@/components/Header";
import ProfileAvatar from "@/components/ProfileAvatar";

export default function Profile() {
  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>Profile</h1>
        <div style={{ marginBottom: '20px' }}>
          <ProfileAvatar />
        </div>
        <p>Manage your profile, view your game statistics, and achievements.</p>
        <div style={{ marginTop: '20px' }}>
          <h3>Player Stats:</h3>
          <ul>
            <li>Games Played: 142</li>
            <li>Win Rate: 68%</li>
            <li>Total Score: 8,450</li>
            <li>Rank: Gold III</li>
            <li>Achievements Unlocked: 23/50</li>
          </ul>
        </div>
      </div>
    </div>
  );
}