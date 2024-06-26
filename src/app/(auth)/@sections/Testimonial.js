"use client";
import { useStoreContext } from "@/Context/store";
import Card2 from "@/app/@components/ui/Card2";
import CircularLoader from "@/app/@components/ui/CircularLoader";
import Heading from "@/app/@components/ui/Heading";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Testimonial() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setSonner, handleSnackbarOpen } = useStoreContext();

  const handleFetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/getReviews`);

      if (!response.ok) {
        setSonner({
          severity: "error",
          message: "Server Error Please Refresh The Page",
        });
        handleSnackbarOpen();
      }

      const data = await response.json();
      setReviews(data?.result?.reviews);
    } catch (error) {
      setSonner({
        severity: "error",
        message: "Error Fetching Testimonials",
      });
      handleSnackbarOpen();
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleFetchReviews();
  }, []);
  console.log("reviews", reviews);

  const sliderRef = useRef(null);
  const settings = {
    dots: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => {
    sliderRef.current.slickPause();
  };

  const handleMouseLeave = () => {
    sliderRef.current.slickPlay();
  };

  return (
    <section>
      <div className="mx-auto max-w-[1340px] x-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
        <div className="max-w-xl text-centr">
              <h2 className="text-4xl font-bold tracking-tight lg:text-4xl">
                Testimonials
              </h2>
          {reviews?.length == 0 ? (
            ""
          ) : (
            
<>
              <p className="mt-4 text-gray-700">
                Read about our customers' experiences and how we’ve made
                recycling easier and more effective for them.
              </p>

              <div className="flex gap-4 mt-2">
                <IconButton onClick={() => sliderRef.current.slickPrev()}>
                  <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
                </IconButton>
                <IconButton onClick={() => sliderRef.current.slickNext()}>
                  <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </IconButton>
              </div>
              </>
          )}
   </div>
          <div className=" lg:col-span-2 lg:mx-0">
            {isLoading ? (
              <CircularLoader></CircularLoader>
            ) : reviews?.length == 0 ? (
              <p>No Testimonials Found</p>
            ) : (
              <Slider ref={sliderRef} {...settings}>
                {reviews?.map((item, index) => {
                  return (
                    <Card2
                      key={index}
                      image2={item?.profile_photo_url}
                      title={item?.author_name}
                      desc={item?.text}
                      value={item?.rating}
                      time={item?.relative_time_description}
                    ></Card2>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
