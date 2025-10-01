
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
      <Header/>
      <ProfileAvatar/>

      <BannerSlider/>
      <DailyCheckin/>
      <QuickAction/>
      <PopularToday/>
      <RestaurantGame/>        
      <ScratchAndWin/>
     
     
      <ShakeAndWin/>
      
      <ScratchAndWin/>
      <TabBar/>

    </div>
  );
}

