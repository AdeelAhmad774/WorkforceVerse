import { HandleDropdown } from "./HandleDropdown";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaUserClock, FaUserMinus } from "react-icons/fa";
import { HiMiniExclamationTriangle } from "react-icons/hi2";
import { ApexChart } from "./WeeklyChart";
import { HandleOntime } from "./HandleOntime";
import { PresentList } from "./PresentList";
import { useEffect, useState } from "react";
import { ShortHours } from "./ShortHoursChart";
import { LeaveChart } from "./LeaveChart";
export const DashboardList = () => {
  const [restData, setRestData] = useState({
    present: 0,
    absent: 0,
    late: 0,
    leave: 0,
    positionCount: 0,
  });
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);
  return (
    <div
      style={{
        margin: "7% 0% 0% 0%",

        width: "98%",
      }}
    >
      <div
        style={{
          display: "flex",

          width: "100%",
        }}
      >
        <span
          style={{
            width: "30%",

            padding: "12px",
          }}
        >
          Total Employee:{restData.positionCount}
        </span>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "30%",
            width: "70%",
          }}
        >
          <HandleDropdown style={{ width: "100%" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              border: "1px solid #ccc",
              height: "55px",
              marginLeft: "3%",
              padding: "8px",
              borderRadius: "6px",
            }}
          >
            <label
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "rgb(196, 124, 96)",
              }}
            >
              Date
            </label>
            <input
              style={{
                height: "17px",
                fontWeight: "400",
                border: "none",
                outline: "none",
              }}
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          margin: "2% 0% 0% 0%",
        }}
      >
        <div
          style={{
            width: "24%",
            borderRadius: "8px",
            fontSize: "30px",
            display: "flex",
            backgroundColor: " #dcfce7",

            color: "#65ac84",
            justifyContent: "space-between",
            cursor: "pointer",
            padding: "1% 2% 0% 2%",
          }}
        >
          <div>
            <MdAccessTimeFilled style={{ fontSize: "40px" }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <HandleOntime setRestData={setRestData} />
            <p style={{ margin: "0px" }}>On Time</p>

            <p>{restData.present}</p>
          </div>
        </div>
        <div
          style={{
            width: "24%",
            borderRadius: "8px",
            fontSize: "30px",
            display: "flex",
            backgroundColor: "#fee2e1",
            color: "#bd2b34",
            justifyContent: "space-between",
            cursor: "pointer",
            padding: "1% 2% 0% 2%",
          }}
        >
          <div>
            <FaUserMinus style={{ fontSize: "40px" }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <p style={{ margin: "0px" }}>Absent</p>
            <p>{restData.absent}</p>
          </div>
        </div>
        <div
          style={{
            width: "24%",
            borderRadius: "8px",
            fontSize: "30px",
            display: "flex",
            backgroundColor: "#ffedd5",
            color: "#c06b3f",
            justifyContent: "space-between",
            cursor: "pointer",
            padding: "1% 2% 0% 2%",
          }}
        >
          <div>
            <HiMiniExclamationTriangle style={{ fontSize: "40px" }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <p style={{ margin: "0px" }}>Late</p>
            <p>{restData.late}</p>
          </div>
        </div>
        <div
          style={{
            width: "24%",
            borderRadius: "8px",
            fontSize: "30px",
            display: "flex",
            backgroundColor: "#edeaff",
            color: "#7940df",
            justifyContent: "space-between",
            cursor: "pointer",
            padding: "1% 2% 0% 2%",
          }}
        >
          <div>
            <FaUserClock style={{ fontSize: "40px" }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <p style={{ margin: "0px" }}>Leave</p>
            <p>{restData.leave}</p>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            margin: "2% 0% 0% 0%",
            border: "2px solid  rgba(202, 232, 235, 0.66)",
            borderRadius: "8px",

            width: "70%",
          }}
        >
          <ApexChart></ApexChart>
        </div>
        <div
          style={{
            marginTop: "2%",
            marginLeft: "1%",
            width: "30%",
            border: "2px solid  rgba(202, 232, 235, 0.66)",
            borderRadius: "8px",
          }}
        >
          <PresentList></PresentList>
        </div>
      </div>
      <div
        style={{
          marginTop: "1%",
          border: "2px solid  rgba(202, 232, 235, 0.66)",
          borderRadius: "8px",
        }}
      >
        <ShortHours></ShortHours>
      </div>
      <div
        style={{
          marginTop: "1%",
          border: "2px solid  rgba(187, 230, 233, 0.66)",
          borderRadius: "8px",
        }}
      >
        <LeaveChart></LeaveChart>
      </div>
    </div>
  );
};
