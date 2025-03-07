import { useEffect, useState } from "react";
import { PostDashboardData } from "./GetApi";


export const HandleOntime = ({setRestData}) => {
  
  

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found. Please log in.");
        return;
      }

      try {
        
        const res = await PostDashboardData({
          siteId: null, 
          todayDate: null, 
        });
       console.log(res.data)
        setRestData(res.data.result.dayData);

      } catch (error) {
        console.error("Error during API call:", error.message);
      }
    };

    fetchData();
  }, [setRestData]);
  

  return  null;
};
