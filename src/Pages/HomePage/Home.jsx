import React from "react";
import Hero from "./Hero";
import StatsStrip from "../../Components/StatsStrip/StatsStrip";
import LatestTuitions from "./LatestTuitions";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <StatsStrip></StatsStrip>
      <LatestTuitions></LatestTuitions>
    </div>
  );
};

export default Home;
