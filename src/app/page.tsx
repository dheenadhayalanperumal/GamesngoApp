
import "./page.css";
import Header from "@/components/Header";
import ProfileAvatar from "@/components/ProfileAvatar";
import BannerSlider from "@/components/Banner";
import TabBar from "@/components/TabBar";
import CoinBox from "@/components/CoinBox";
import DailyCheckin from "@/components/DailyCheckin";
import ScratchAndWin from "@/components/ScratchAndWin";
import ShakeAndWin from "@/components/ShakeAndWin";
import QuickAction from "@/components/QuickAction";
import PopularToday from "@/components/PopularToday";
import RestaurantGame from "@/components/RestaurantGame";

export default function Home() {
  return (
    <div className="layout">
       <Header sx={{
        backgroundColor: '#4848DB',
        // paddingTop: '15px',
        textAlign: 'center',
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }} />

      
      <ProfileAvatar/>

      <BannerSlider/>
      <DailyCheckin/>
      <QuickAction/>
      <PopularToday/>
      <RestaurantGame/>        
      <ScratchAndWin/>

     
        <ShakeAndWin />
    

      <ScratchAndWin/>
      <TabBar/>

    </div>
  );
}

