
import "./page.css";
import Header from "@/components/Header";
import ProfileAvatar from "@/components/ProfileAvatar";
import BannerSlider from "@/components/Banner";
import TabBar from "@/components/TabBar";
import CoinBox from "@/components/CoinBox";
import DailyCheckin from "@/components/DailyCheckin";

export default function Home() {
  return (
    <div className="layout">
      <Header/>
      <ProfileAvatar/>
      
      <BannerSlider/>
      <DailyCheckin/>
      <TabBar/>

    </div>
  );
}

