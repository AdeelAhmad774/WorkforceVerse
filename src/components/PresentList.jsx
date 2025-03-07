import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { PostPresentList } from "./GetApi";

export const PresentList = () => {
  const [presentList, setPresentList] = useState({
    fromDate: null,
    toDate: null,
  });
  const [slicedData, setSlicedData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authtoken");
      try {
        const res = await PostPresentList(presentList);
        console.log(res.data);
        setSlicedData(res.data.result.slice(0, 20));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [presentList]);

  return (
    <>
      <div style={{ display: "flex", fontSize: "16px" }}>
        <input
          type="text"
          placeholder="Search..."
          style={{ flex: 1, width: "20%" }}
        />
        <button style={{ width: "10%" }}>
          <FaSearch />
        </button>
      </div>
      <div
        style={{
          height: "500px",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "10px",
        }}
      >
        <ul style={{ listStyleType: "none", paddingLeft: "10px" }}>
          {slicedData.map((curElem, index) => {
            const date = new Date(curElem.checkInTime); // Create a Date object
            const formattedDate = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const formattedTime = date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true, // Use 12-hour format
            });

            return (
              <li key={index}>
                <p
                  style={{
                    fontWeight: "500 ",
                    color: " #7940df",
                  }}
                >
                  {curElem.employeeName}
                </p>
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>

                <hr
                  style={{
                    width: "80%",
                    margin: "10px 40px",

                    borderTop: "1px solid red",
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
