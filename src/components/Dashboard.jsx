import { FaCalendarCheck, FaTasks, FaUserCheck } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FcLeave } from "react-icons/fc";
import { GiReceiveMoney, GiTakeMyMoney, GiWorld } from "react-icons/gi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoMdHome } from "react-icons/io";
import { IoAdd, IoCalendarClearOutline } from "react-icons/io5";
import {
  MdAdminPanelSettings,
  MdHolidayVillage,
  MdOutlineAdd,
  MdOutlinePriceChange,
  MdOutlinePriceCheck,
  MdPriceChange,
} from "react-icons/md";
import { RiMoneyDollarCircleFill, RiUserReceivedFill } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

// export const Dashboard = () => {
//   return (
//     <div>
//       <div>
//         <div style={{ margin: "30px", width: "14%" }}>
//           <img src="src/assets/images/logo.png" width="100%" alt="Logo" />
//         </div>

//         <div
//           style={{
//             margin: "100px 0px 0px 25px",
//             fontSize: "20px",
//             width: "14%",
//           }}
//         >
//           <nav
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "15px",
//               listStyle: "none",
//               background: "rgb(214, 244, 253)",
//             }}
//           >
//             <NavLink
//               to="/"
//               style={{
//                 color: "black",
//                 textDecoration: "none",
//               }}
//             >
//               + Home
//             </NavLink>
//             <NavLink to="/" style={{ color: "black", textDecoration: "none" }}>
//               Check In/Out
//             </NavLink>
//             <NavLink to="/" style={{ color: "black", textDecoration: "none" }}>
//               Attendence
//             </NavLink>
//             <NavLink to="/" style={{ color: "black", textDecoration: "none" }}>
//               Leave Management
//             </NavLink>

//             <NavLink to="/" style={{ color: "black", textDecoration: "none" }}>
//               Employee Management
//             </NavLink>
//             <NavLink to="/" style={{ color: "black", textDecoration: "none" }}>
//               Loan Management
//             </NavLink>
//             <NavLink to="/" style={{ color: "black", textDecoration: "none" }}>
//               Office Holiday
//             </NavLink>
//             <NavLink to="/" style={{ color: "black", textDecoration: "none" }}>
//               Reports
//             </NavLink>
//             <NavLink to="/" style={{ color: "black", textDecoration: "none" }}>
//               Task Management
//             </NavLink>
//             <NavLink to="/" style={{ color: "black", textDecoration: "none" }}>
//               Visitor Management
//             </NavLink>
//             <NavLink to="/" style={{ color: "black", textDecoration: "none" }}>
//               Admin
//             </NavLink>
//             <NavLink to="/" style={{ color: "black", textDecoration: "none" }}>
//               Upgrade to Premium
//             </NavLink>
//           </nav>
//         </div>
//       </div>
//       <div>
//         <h1>heelo</h1>
//       </div>
//     </div>
//   );
// };
export const Dashboard = () => {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      {/* Left-side content: Image and Navigation Links */}
      <div
        style={{
          width: "20%",
        }}
      >
        <div style={{ margin: "10px 0px 0px 30px" }}>
          <img src="\images\logo.png" width="90%" alt="Logo" />
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            listStyle: "none",
            padding: "6%",
            marginTop: "50px",
            marginLeft: "15px",
            fontSize: "20px",

            height: "calc(100vh - 120px)",
          }}
          className="nav-scroll"
        >
          <div>
            <NavLink to="/Dashboard" className="nav-link">
              <span style={{ display: "flex", alignItems: "center" }}>
                <MdOutlineAdd style={{ marginRight: "5px" }} />
                Home
              </span>
              <div className="icon">
                <IoMdHome />
              </div>
            </NavLink>
          </div>
          <NavLink to="/" className="nav-link">
            <span>Check In/Out</span>
            <div className="icon">
              <FaCalendarCheck />
            </div>
          </NavLink>
          <NavLink to="/" className="nav-link">
            <span>Attendence</span>
            <div className="icon">
              <FaUserCheck />
            </div>
          </NavLink>
          <NavLink to="/" className="nav-link">
            Leave Management
            <div className="icon">
              <IoCalendarClearOutline />
            </div>
          </NavLink>
          <NavLink to="EmployeeList" className="nav-link">
            Employee Management
            <div className="icon">
              <HiMiniUserGroup />
            </div>
          </NavLink>
          <NavLink to="/" className="nav-link">
            Loan Management
            <div className="icon">
              <FaHandHoldingDollar />
            </div>
          </NavLink>
          <NavLink to="/" className="nav-link">
            Public Holiday
            <div className="icon">
              <GiWorld />
            </div>
          </NavLink>
          <NavLink to="/" className="nav-link">
            Reports
            <div className="icon">
              <TbReport />
            </div>
          </NavLink>
          <NavLink to="/" className="nav-link">
            Task Management
            <div className="icon">
              <FaTasks />
            </div>
          </NavLink>
          <NavLink to="/" className="nav-link">
            Visitor Management
            <div className="icon">
              <RiUserReceivedFill />
            </div>
          </NavLink>
          <NavLink to="/" className="nav-link">
            Admin
            <div className="icon">
              <MdAdminPanelSettings />
            </div>
          </NavLink>
          <NavLink to="/" className="nav-link">
            Upgrade to Premium
            <div className="icon">
              <MdOutlinePriceCheck />
            </div>
          </NavLink>
        </nav>
      </div>
      <div
        style={{
          padding: "20px",

          width: "80%",
          overflowY: "auto", // Allow vertical scrolling
          height: "100vh", // Full height of the viewport
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};
