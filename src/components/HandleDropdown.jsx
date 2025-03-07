import { useEffect, useState } from "react";
import { PostSites } from "./GetApi";

export const HandleDropdown = ({ onSelect, style = {} }) => {
  const [site, setSite] = useState({
    fromDate: null,
    toDate: null,
    siteName: null,
  });

  const [sites, setSites] = useState([]); // Store site objects instead of just names

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found. Please log in.");
        return;
      }

      try {
        const res = await PostSites(site);
        console.log(res.data);

        const data = res.data.result;
        if (Array.isArray(data)) {
          setSites(data); // Store full site objects with siteId and siteName
        }
      } catch (error) {
        console.log(error.message || "An error occurred while fetching sites.");
      }
    };
    fetchData();
  }, []);

  const handleSiteChange = (e) => {
    const selectedSiteName = e.target.value;
    const selectedSite = sites.find((s) => s.siteName === selectedSiteName);

    if (selectedSite) {
      setSite((prevState) => ({
        ...prevState,
        siteName: selectedSite.siteName,
        siteId: selectedSite.siteId, // Store siteId as well
      }));

      // Send selected siteId and siteName to the parent component
      onSelect(selectedSite.siteId);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <select
        style={{
          width: "100%",
          height: "55px",
          padding: "7px",
          border: "1px solid #ccc",
          borderRadius: "6px",

          ...style,
        }}
        id="site-dropdown"
        value={site.siteName || ""}
        onChange={handleSiteChange}
      >
        <option value="" disabled>
          Select a site
        </option>
        {sites.map((site, index) => (
          <option key={index} value={site.siteName}>
            {site.siteName}
          </option>
        ))}
      </select>
    </div>
  );
};
