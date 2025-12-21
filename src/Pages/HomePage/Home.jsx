import React from "react";
import Hero from "./Hero";
import StatsStrip from "../../Components/StatsStrip/StatsStrip";
import LatestTuitions from "./LatestTuitions";
import LatestTutors from "./LatestTutors";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "./WhyChooseUs";
import CTASection from "./CTASection";
import LatestReviews from "./LatestReviews";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <StatsStrip></StatsStrip>
      <LatestTuitions></LatestTuitions>
      <LatestTutors></LatestTutors>
      <LatestReviews></LatestReviews>
      <HowItWorks></HowItWorks>
      <WhyChooseUs></WhyChooseUs>
      <CTASection></CTASection>
    </div>
  );
};

export default Home;
