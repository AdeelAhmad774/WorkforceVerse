// import { createContext, useState, useEffect } from "react";
// import { PostSites } from "./GetApi";

// export const SiteContext = createContext();

// export const SiteProvider = ({ children }) => {
//   const [site, setSite] = useState({
//     fromDate: null,
//     toDate: null,
//     siteName: null,
//   });
//   const [siteNames, setSiteNames] = useState([]);

//   const fetchData = async () => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       console.error("No auth token found. Please log in.");
//       return;
//     }

//     try {
//       const res = await PostSites(site);
//       console.log(res.data);

//       const data = res.data.result;
//       if (Array.isArray(data)) {
//         const names = data.map((item) => item.siteName);
//         setSiteNames(names);
//       }
//     } catch (error) {
//       console.log(error.message || "An error occurred while fetching sites.");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <SiteContext.Provider value={{ site, setSite, siteNames, fetchData }}>
//       {children}
//     </SiteContext.Provider>
//   );
// };
