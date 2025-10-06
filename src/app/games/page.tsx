import Header from "@/components/Header";
import TabBar from "@/components/TabBar";

export default function Games() {
  return (
    <div>
       <Header sx={{
        backgroundColor: '#4848DB',
        textAlign: 'center',
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }} />
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
      <TabBar />
    </div>
  );
}