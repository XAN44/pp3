import React, { Suspense } from "react";
import HomePageHeader from "../components/homepage/HomePageHeader";
import HomePageContent from "../components/homepage/HomePageContent";
import HomePageContent1 from "@/components/homepage/HomePageContent1";

export default function Home() {
  return (
    <>
      <div
        className="
        h-96
        w-screen
        -mt-[400px] 
      "
      >
        {/* Cover Image */}
        <div className="">
          <HomePageHeader />
        </div>
        {/* Main Content Section */}
        <div className="  grid  text-center items-center justify-center">
          <HomePageContent />
        </div>
        <div className="mt-14 text-center items-center justify-center">
          <HomePageContent1 />
        </div>
      </div>
    </>
  );
}
