import Header from "@/components/Header";

export default function Games() {
  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>Games</h1>
        <p>Browse and discover various games available on our platform.</p>
        <div style={{ marginTop: '20px' }}>
          <h3>Featured Games:</h3>
          <ul>
            <li>Action Adventure Game</li>
            <li>Strategy RPG</li>
            <li>Racing Championship</li>
            <li>Puzzle Master</li>
            <li>Battle Arena</li>
          </ul>
        </div>
      </div>
    </div>
  );
}