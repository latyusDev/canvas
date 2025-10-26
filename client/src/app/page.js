'use client';

import AiFeatures from "@/components/home/AiFeatures";
import Banner from "@/components/home/Banner";
import DesignTypes from "@/components/home/DesignTypes";
import Header from "@/components/home/Header";
import RecentDesigns from "@/components/home/RecentDesigns";
import Sidebar from "@/components/home/Sidebar";
import PremiumModal from "@/components/subscription/PremiumModal";
import { getUserDesigns } from "@/services/design-service";
import { getUserSubscription } from "@/services/subscription-service";
import { useEditorStore } from "@/store/useEditorStore";
import { useEffect } from "react";

export default function Home() {
  const {setUserSubscription,setUserDesigns,setShowPremiumModal,showPremiumModal} = useEditorStore();
  console.log(showPremiumModal)
  const fetchUserSubscription = async()=>{
    const response = await getUserSubscription();
    if(response.success){
      setUserSubscription(response?.data)
    }
  }

  const fetchUserDesigns = async()=>{
      const results = await getUserDesigns();
      setUserDesigns(results?.data)
      console.log(results,'result')
  }
  useEffect(()=>{
    fetchUserSubscription()
    fetchUserDesigns()
  },[])
  return (
    <div className="flex min-h-screen bg-white">
        <Sidebar/>
              <main className="flex-1 flex-col ml-[72px]">
                <Header/>
                  <div className="flex-1 p-6 overflow-y-auto pt-8">
                    <Banner/>
                    <DesignTypes/>
                    <AiFeatures/>
                    <RecentDesigns/>
                  </div>
              </main>
              <PremiumModal onClose={setShowPremiumModal} isOpen={showPremiumModal} />

    </div>
  );
}
