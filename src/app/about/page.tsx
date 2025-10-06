import BannerSlider from "@/components/Banner";
import Header from "@/components/Header";
import ProfileAvatar from "@/components/ProfileAvatar";
import TabBar from "@/components/TabBar";

export default function About() {
  return (
    <div className="">
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
      <ProfileAvatar/>
      <BannerSlider/>
      <TabBar />
    </div>
  );
}