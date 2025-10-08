import EventCard from "@/components/EventCard";
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";


export default function Tournaments() {
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

      {/* <EventCard
        id="1"
        title="Summer Championship"
        description="Compete in the Summer Championship for a chance to win big prizes!"
        image="/images/summer-championship.jpg"
        date="2024-07-15"
        location="Online"
        prizePool="$10,000"
        link="/tournaments/summer-championship"
      /> */}
      <TabBar />
    </div>
  );
}