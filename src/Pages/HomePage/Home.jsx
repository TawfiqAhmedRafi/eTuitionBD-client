import React from "react";
import Hero from "./Hero";
import StatsStrip from "../../Components/StatsStrip/StatsStrip";
import LatestTuitions from "./LatestTuitions";
import LatestTutors from "./LatestTutors";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <StatsStrip></StatsStrip>
      <LatestTuitions></LatestTuitions>
      <LatestTutors></LatestTutors>
    </div>
  );
};

export default Home;
