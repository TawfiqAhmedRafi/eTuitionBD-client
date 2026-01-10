import React, { Suspense, lazy } from "react";
import Hero from "./Hero";
import StatsStrip from "../../Components/StatsStrip/StatsStrip";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "./WhyChooseUs";
import CTASection from "./CTASection";
import { SectionSkeleton } from "../../Components/Skeleton/SectionSkeleton";
import FAQ from "./FAQ";
import Blogs from "./Blogs";



// Lazy-loaded sections
const LatestTuitions = lazy(() => import("./LatestTuitions"));
const LatestTutors = lazy(() => import("./LatestTutors"));
const LatestReviews = lazy(() => import("./LatestReviews"));

const Home = () => {
  return (
    <div>
      <Hero />
      <StatsStrip />

      <Suspense fallback={<SectionSkeleton type="tuition" count={6} />}>
        <LatestTuitions />
      </Suspense>

      <Suspense fallback={<SectionSkeleton type="tutor" count={6} />}>
        <LatestTutors />
      </Suspense>

      <Suspense fallback={<SectionSkeleton type="review" count={6} />}>
        <LatestReviews />
      </Suspense>

      <HowItWorks />
      <WhyChooseUs />
      <FAQ></FAQ>
      
    
      <Blogs></Blogs>
      <CTASection />
    </div>
  );
};

export default Home;
