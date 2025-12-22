import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ReviewCardSkeleton from "./ReviewCardSkeleton";

const LatestReviews = () => {
  const axiosSecure = useAxiosSecure();

  const { data=[], isLoading, isError } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-reviews");
      return res.data.reviews;
    },
  });

  if (isError)
    return (
      <div className="text-center py-10 text-error">Failed to load reviews</div>
    );

  return (
    <div className="py-10 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary">
          What Our Students Are Saying
        </h2>
        <p className="text-gray-500 mt-2">
          Hear directly from students about our amazing tutors!
        </p>
      </div>

      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: 50,
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <SwiperSlide key={`skeleton-${i}`}>
                <ReviewCardSkeleton />
              </SwiperSlide>
            ))
          : data.map((review) => (
              <SwiperSlide key={review._id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default LatestReviews;
