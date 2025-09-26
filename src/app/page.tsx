
import "./page.css";
import Header from "@/components/Header";
import ProfileAvatar from "@/components/ProfileAvatar";
import BannerSlider from "@/components/Banner";
import TabBar from "@/components/TabBar";

export default function Home() {
  return (
    <div className="layout">
      <Header/>
      <ProfileAvatar/>
      <BannerSlider/>
      <TabBar/>
    </div>
  );
}

