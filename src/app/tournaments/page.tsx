import Header from "@/components/Header";

export default function Tournaments() {
  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>Tournaments</h1>
        <p>Join exciting tournaments and compete with players from around the world.</p>
        <div style={{ marginTop: '20px' }}>
          <h3>Upcoming Tournaments:</h3>
          <ul>
            <li>Summer Championship - Prize Pool: $10,000</li>
            <li>Weekly Battle Royale - Prize Pool: $2,500</li>
            <li>Speed Run Challenge - Prize Pool: $1,000</li>
            <li>Team Tournament - Prize Pool: $5,000</li>
            <li>Rookie Cup - Prize Pool: $500</li>
          </ul>
        </div>
      </div>
    </div>
  );
}