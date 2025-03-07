import { IoSettings } from "react-icons/io5";
import { PostEmployeeList } from "./GetApi";

import { FilterComponent } from "./FilterComponent";

import { EmployeeAdd } from "./EmpolyeeAdd";
import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

import { IconForm } from "./IconForm";

export const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iconform, setIconForm] = useState(false);
  const [showIconForm, setShowIconForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // Store clicked row's data
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const employeeData = {
    fromDate: null,
    toDate: null,
    employee_Name: null,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await PostEmployeeList(employeeData);
        console.log(res.data);
        if (res.data.responseType === 1 && Array.isArray(res.data.result)) {
          setEmployee(res.data.result.slice(0, 50));
          console.log(employee);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const searchData = employee.filter((curEle) =>
    `${curEle.firstName} ${curEle.lastName} ${curEle.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const handleIconClick = (event, rowIndex, rowData) => {
    event.stopPropagation(); // Prevents click from affecting other elements
    setSelectedRow(rowData);
    const rect = event.target.getBoundingClientRect();

    setIconForm((prev) => {
      const isSameRowClicked = prev.open && prev.rowIndex === rowIndex;

      return isSameRowClicked
        ? { open: false, rowIndex: null, iconRef: null } // Close dropdown if same row clicked
        : {
            open: true,
            x: rect.left + window.scrollX,
            y: rect.bottom + window.scrollY,
            rowIndex,
            iconRef: event.target,
          };
    });

    setSelectedRow(rowData);
  };

  return (
    <div
      style={{
        margin: "7% 0% 0% 0%",

        width: "98%",
      }}
    >
      <h3>Employee Dashboard</h3>
      <div
        style={{
          width: "100%",
          margin: "4% 0% 4% 0%",
          display: "flex",
        }}
      >
        <input
          style={{
            padding: "5px 0px 6px 20px",
            width: "30%",
            borderRadius: "4px",
            border: "1px solid #ccc",
            outline: "none",
          }}
          type="text"
          placeholder="Search.."
          value={search}
          onChange={(e) => setSearch(e.target.value.replace(/\s+/g, " "))}
        />

        <FilterComponent />

        <button className="butt" onClick={() => setIsModalOpen(true)}>
          Add Employee
        </button>
      </div>

      <table
        style={{
          width: "100%",
          color: "black",
          border: "1px solid #ccc",
        }}
      >
        <thead>
          <tr
            style={{
              height: "55px",
              borderBottom: "1px solid rgb(204, 191, 191)",
              color: "@",
            }}
          >
            <th
              style={{
                width: "15%",

                padding: "0px 16px ",
                textAlign: "left",
                fontSize: "15px",
              }}
            >
              First Name
            </th>
            <th
              style={{
                width: "15%",
                padding: "0px 16px",
                textAlign: "left",
                fontSize: "15px",
              }}
            >
              Site Name
            </th>
            <th
              style={{
                width: "20%",
                padding: "0px 16px",
                textAlign: "left",
                fontSize: "15px",
              }}
            >
              Email
            </th>
            <th
              style={{
                width: "15%",

                padding: "0px 16px",
                textAlign: "left",
                fontSize: "15px",
              }}
            >
              Passport
            </th>
            <th
              style={{
                width: "10%",
                padding: "0px 16px",
                textAlign: "left",
                fontSize: "15px",
              }}
            >
              Visa
            </th>
            <th
              style={{
                width: "20%",
                padding: "0px 16px",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              Date of Joining
            </th>

            <th
              style={{
                width: "5%",
                padding: "0px 16px",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  backgroundColor: "white",
                  fontSize: "25px",
                  border: "none",
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "30px",
                  height: "30px",
                }}
              >
                <IoSettings
                  style={{
                    animation: "rotate 8s linear infinite",
                  }}
                />
              </span>

              <style>
                {`
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `}
              </style>
            </th>
          </tr>
        </thead>
        <tbody>
          {searchData.map((curElem, index) => (
            <tr
              style={{ height: "55px", borderBottom: "1px dashed  #ccc" }}
              key={index}
            >
              <td
                style={{
                  padding: "6px 16px",
                  width: "15%",
                  fontSize: "14px",
                  display: "flex", // Keeps elements in a row
                  alignItems: "center", // Vertically aligns content
                  gap: "10px", // Adds spacing between icon & text
                }}
              >
                {/* Profile Icon */}
                <span
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.3rem",
                    fontWeight: "500",
                    color: "#444",
                    border: "2px solid",
                    flexShrink: 0,
                    lineHeight: "55px", // Ensures proper vertical centering
                  }}
                >
                  {curElem.firstName?.charAt(0).toUpperCase()}
                </span>

                {/* Name Link */}
                <NavLink
                  to={`/Dashboard/ShowEmployeeeList/${curElem.employeeId}`}
                  style={{
                    color: "inherit",
                    flexGrow: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {curElem.firstName || "Company ID Not Provided"}
                </NavLink>
              </td>
              <td
                style={{
                  padding: "0px 16px",
                  width: "15%",
                  fontSize: "14px",
                }}
              >
                {curElem.siteName || "Not Specified"}
              </td>
              <td
                style={{
                  width: "20%",
                  padding: "0px 16px",
                  textAlign: "left",
                  fontSize: "14px",
                }}
              >
                {curElem.email || "Company ID Not Provided"}
              </td>
              <td
                style={{
                  padding: "0px 16px",
                  width: "15%",
                  textAlign: "left",
                  fontSize: "14px",
                }}
              >
                <button
                  style={{
                    backgroundColor: "rgb(214, 44, 14)",
                    width: "75%", // Set width to auto to adjust based on content
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  Add Passport
                </button>
              </td>
              <td
                style={{
                  width: "10%",
                  padding: "0px 16px",
                  textAlign: "left",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                {curElem.startTime
                  ? (() => {
                      const date = new Date(curElem.startTime);
                      const formattedDate = new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                        .format(date)
                        .replace(/\//g, "-");

                      return `${formattedDate}`;
                    })()
                  : "Not Specified"}
              </td>
              <td
                style={{
                  width: "20%",
                  padding: "0px 16px",
                  textAlign: "left",
                  fontSize: "14px",
                }}
              >
                {curElem.startTime
                  ? (() => {
                      const date = new Date(curElem.startTime);
                      const formattedDate = new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(date);

                      const formattedTime = new Intl.DateTimeFormat("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      }).format(date);

                      return `${formattedDate}, ${formattedTime}`;
                    })()
                  : "Not Specified"}
              </td>
              <td
                style={{
                  padding: "0px 20px",
                  textAlign: "left",
                  width: "5%",
                }}
              >
                <BsThreeDotsVertical
                  id={`icon-${index}`}
                  onClick={(event) => handleIconClick(event, index, curElem)} // Pass row data
                  style={{ cursor: "pointer" }}
                />
              </td>
              {/* Render dropdown only for the clicked row */}
              {iconform.open && iconform.rowIndex === index && (
                <IconForm
                  iconform={iconform}
                  setIconForm={setIconForm}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  curElem={curElem} // Pass clicked row's data
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <EmployeeAdd isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};
