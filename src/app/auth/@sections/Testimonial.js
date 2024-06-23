"use client"
import { GOOGLE_API_KEY, PLACE_ID } from '@/Constant';
import { useStoreContext } from '@/Context/store';
import Card from '@/app/@components/ui/Card'
import Card2 from '@/app/@components/ui/Card2';
import CircularLoader from '@/app/@components/ui/CircularLoader';
import Heading from '@/app/@components/ui/Heading'
import Loading from '@/app/@components/ui/Loading';
import React, { useEffect, useState } from 'react'

function Testimonial() {
  const [reviews, setReviews] = useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const {setSonner,handleSnackbarOpen}=useStoreContext()

  const handleFetchReviews = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&key=${GOOGLE_API_KEY}`);
  
      if (!response.ok) {
        setSonner({
          severity: "error",
          message: "Server Error",
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
      console.error('Error fetching reviews:', error);
    }finally{
      setIsLoading(false)
    }
  };
  useEffect(()=>{
    handleFetchReviews()
  },[])
  console.log("reviews",reviews)
  return (
    <>
    <Heading title="Testimonial"></Heading>
    {
      isLoading?<CircularLoader></CircularLoader>:
    
    <div className="flex flex-col md:grid grid-cols-2 w-[100%] gap-4">
      {
        reviews?.length==0?<p>Error Fetching Testimonials</p>:reviews?.map((item,index)=>{
          return(
            <Card2 key={index} image2={item?.profile_photo_url} title={item?.author_name} desc={item?.text} value={item?.rating} time={item?.relative_time_description}></Card2>
          )
        })

      
    }
    </div>}
    </>
  )
}

export default Testimonial