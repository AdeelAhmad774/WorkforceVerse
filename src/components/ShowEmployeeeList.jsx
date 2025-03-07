import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import {
  DeleteDocument,
  GetEmployeeDataId,
  PostEmployeeEducation,
} from "./GetApi";
import { IoIosArrowBack, IoMdAdd } from "react-icons/io";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EducationForm } from "./EducationForm";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PassportForm } from "./PasspostForm";

export const ShowEmployeeeList = () => {
  const [showEmployee, setShowEmployee] = useState("");
  const { employeeId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [education, setEducation] = useState({
    Id: "",
  });

  const [updateData, setUpdateData] = useState({});
  const [passportForm, setPassportForm] = useState(false);

  const isEmpty = !updateData || Object.keys(updateData).length === 0;
  const goback = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetEmployeeDataId(employeeId);
        console.log(res.data.result);
        setShowEmployee(res.data.result);
      } catch (error) {
        console.error(
          "Error fetching employee data:",
          error.response?.data || error.message
        );
      }
    };
    if (employeeId) {
      fetchData();
    }
  }, [employeeId]);
  const handleGoBack = () => {
    goback(-1);
  };
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/default-placeholder.png"; // Fallback image
    return `http://192.168.100.96:7182${imagePath.replace("~", "")}`; // Replace '~' with baseURL
  };
  const HandleDelete = async (edu) => {
    try {
      const res = await DeleteDocument(edu.Id);
      alert("You want to delete this record ");

      if (employeeId) {
        const updatedRes = await GetEmployeeDataId(employeeId);
        setShowEmployee(updatedRes.data.result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUpdate = (edu) => {
    setShowForm(true);
    setUpdateData(edu);
  };
  const handleBankDetails = () => {};
  return (
    <div style={{ margin: "7% 0% 0% 0%", width: "98%" }}>
      <div
        style={{
          backgroundColor: "blue",
          color: "white",
          width: "100%",
          padding: "6px",
          borderRadius: "8px",
          display: "flex",

          alignItems: "center",

          gap: "29.5%",
        }}
      >
        <h3
          style={{
            fontWeight: "700",

            width: "60%",
            marginLeft: "1%",
          }}
        >
          {showEmployee.firstName} Profile
        </h3>
        <button className="btnprofile" onClick={handleGoBack}>
          <IoIosArrowBack />
          Back
        </button>
      </div>
      <div
        style={{
          fontFamily: "revert",
          display: "flex",

          gap: "10px",
          margin: "10px 0% 0% 0%",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "30%",
            border: "1px solid #ccc",
            overflow: "hidden",
            whiteSpace: "normal",
            wordBreak: "break-word",
            borderRadius: "6px",
            padding: "10px",
          }}
        >
          <div
            style={{
              width: "65px",
              height: "10vh",
              margin: "5% 36% 5%",
              borderRadius: "50%",
              backgroundColor: "#ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "45px",
              fontWeight: "bold",
              color: "#555",
              border: "4px solid",
            }}
          >
            {showEmployee.firstName?.charAt(0).toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <span style={{ width: "34%", fontWeight: "bold" }}>
                First Name:
              </span>
              <span style={{ flex: 1 }}>
                {showEmployee.firstName || "----"}
              </span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <span style={{ width: "34%", fontWeight: "bold" }}>
                Last Name:
              </span>
              <span style={{ flex: 1 }}>{showEmployee.lastName || "----"}</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <span style={{ width: "34%", fontWeight: "bold" }}>CNIC:</span>
              <span style={{ flex: 1 }}></span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <span style={{ width: "34%", fontWeight: "bold" }}>Email:</span>
              <span style={{ flex: 1 }}>{showEmployee.email || "----"}</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <span style={{ width: "34%", fontWeight: "bold" }}>Gender:</span>
              <span style={{ flex: 1 }}>{showEmployee.gender || "----"}</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <span style={{ width: "34%", fontWeight: "bold" }}>Mobile:</span>
              <span style={{ flex: 1 }}>
                {showEmployee.contactNumber || "----"}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <span style={{ width: "34%", fontWeight: "bold" }}>
                BirthDate:
              </span>
              <span style={{ flex: 1 }}>
                {showEmployee.dateOfBirth || "----"}
              </span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <span style={{ width: "34%", fontWeight: "bold" }}>
                Postal Address:
              </span>
              <span style={{ flex: 1 }}>
                {showEmployee.addresses || "----"}
              </span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <span style={{ width: "34%", fontWeight: "bold" }}>
                Permanent Address:
              </span>
              <span style={{ flex: 1 }}>
                {showEmployee.addresses || "----"}
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: "revert",
            width: "75%",
            border: "1px solid #ccc",
            borderRadius: "6px",
            // maxHeight: "87vh", // Set a fixed height
            overflowY: "auto", // Enable vertical scrolling
            scrollbarWidth: "5px",
          }}
          className="custom-scrollbar"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "2% 4% 0% 4%",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: "700", fontSize: "30px" }}>
              Education
            </span>
            <button
              className="btninfo"
              onClick={() => {
                setUpdateData(null);
                setShowForm(true);
              }}
            >
              <IoMdAdd />
              Add
            </button>
          </div>
          <div style={{ padding: "1% 4% 0% 4%" }}>
            <table style={{ border: "1px solid #ccc", width: "100%" }}>
              <thead>
                <tr style={{ backgroundColor: "rgb(202, 229, 233)" }}>
                  <th
                    style={{
                      padding: "10px",
                      width: "20%",
                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Qualification
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      width: "20%",
                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Degree
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      width: "20%",
                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Year
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      width: "20%",
                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Grade
                  </th>
                  <th
                    style={{ padding: "10px", width: "20%", fontSize: "16px" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {showEmployee?.educationDetail?.map((edu, index) => (
                  <tr
                    key={index}
                    style={{ borderBottom: "1px solid rgb(207, 194, 194)" }}
                  >
                    <td style={{ padding: "10px", fontSize: "16px" }}>
                      {edu.qualification || "N/A"}
                    </td>
                    <td style={{ padding: "10px", fontSize: "16px" }}>
                      {edu.degree || "N/A"}
                    </td>
                    <td style={{ padding: "10px", fontSize: "16px" }}>
                      {edu.year || "N/A"}
                    </td>
                    <td style={{ padding: "10px", fontSize: "16px" }}>
                      {edu.grade || "N/A"}
                    </td>
                    <td
                      style={{
                        padding: "4px ",
                        fontSize: "20px",
                      }}
                    >
                      <span
                        style={{
                          marginLeft: "40px",
                          cursor: "pointer",
                          marginRight: "2px",

                          borderRadius: "6px",
                        }}
                        onClick={() => handleUpdate(edu)}
                      >
                        <FaRegEdit />
                      </span>
                      <span
                        style={{
                          cursor: "pointer",
                          marginLeft: "10px",
                          borderRadius: "6px",
                        }}
                        onClick={() =>
                          HandleDelete({
                            Id: edu.educationId,
                          })
                        }
                      >
                        <MdDelete />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "2% 4% 0% 4%",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: "700", fontSize: "30px" }}>
              Bank Details
            </span>
            <button className="btninfo">
              <IoMdAdd />
              Add
            </button>
          </div>
          <div style={{ padding: "1% 4% 0% 4%" }}>
            <table style={{ border: "1px solid #ccc", width: "100%" }}>
              <thead>
                <tr style={{ backgroundColor: "rgb(202, 229, 233)" }}>
                  <th
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Bank Name
                  </th>

                  <th
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Account holder Name
                  </th>

                  <th
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Account Number
                  </th>

                  <th
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  >
                    Account Type
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgb(207, 194, 194)" }}>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  >
                    {showEmployee.bankDetail?.bankName || "----"}
                  </td>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  >
                    {showEmployee.bankDetail?.accountHolderName || "----"}
                  </td>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  >
                    {showEmployee.bankDetail?.accountNumber || "----"}
                  </td>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  >
                    {showEmployee.bankDetail?.accountType || "----"}
                  </td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "2% 4% 0% 4%",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: "700", fontSize: "30px" }}>
              Passport Details
            </span>
            <button className="btninfo" onClick={() => setPassportForm(true)}>
              <IoMdAdd />
              Add
            </button>
          </div>
          <div style={{ padding: "1% 4% 0% 4%" }}>
            <table style={{ border: "1px solid #ccc", width: "100%" }}>
              <thead>
                <tr style={{ backgroundColor: "rgb(202, 229, 233)" }}>
                  <th
                    style={{
                      padding: "10px",
                      width: "28%",
                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Nationality
                  </th>

                  <th
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Issue Date
                  </th>

                  <th
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Expiry Date
                  </th>

                  <th style={{ padding: "10px", fontSize: "16px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgb(207, 194, 194)" }}>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  >
                    {showEmployee.passportDetail?.nationality || "----"}
                  </td>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  >
                    {showEmployee.passportDetail?.issueDate
                      ? (() => {
                          const date = new Date(
                            showEmployee.passportDetail.issueDate
                          );
                          return new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }).format(date);
                        })()
                      : "----"}
                  </td>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  >
                    {showEmployee.passportDetail?.expiryDate
                      ? (() => {
                          const date = new Date(
                            showEmployee.passportDetail.expiryDate
                          );
                          return new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }).format(date);
                        })()
                      : "----"}
                  </td>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  ></td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "2% 4% 0% 4%",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: "700", fontSize: "30px" }}>
              Visa Details
            </span>
            <button className="btninfo">
              <IoMdAdd />
              Add
            </button>
          </div>
          <div style={{ padding: "1% 4% 0% 4%" }}>
            <table style={{ border: "1px solid #ccc", width: "100%" }}>
              <thead>
                <tr style={{ backgroundColor: "rgb(202, 229, 233)" }}>
                  <th
                    style={{
                      padding: "10px",
                      width: "20%",
                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Category
                  </th>

                  <th
                    style={{
                      padding: "10px",
                      width: "20%",

                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Issue Date
                  </th>

                  <th
                    style={{
                      padding: "10px",
                      width: "20%",
                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Expiry Date
                  </th>

                  <th
                    style={{
                      padding: "10px",
                      width: "20%",
                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgb(207, 194, 194)" }}>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  >
                    {showEmployee.visaDetail?.category || "----"}
                  </td>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  >
                    {showEmployee.visaDetail?.issueDate
                      ? (() => {
                          const date = new Date(
                            showEmployee.visaDetail.issueDate
                          );
                          return new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }).format(date);
                        })()
                      : "----"}
                  </td>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  >
                    {showEmployee.visaDetail?.expiryDate
                      ? (() => {
                          const date = new Date(
                            showEmployee.visaDetail.expiryDate
                          );
                          return new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }).format(date);
                        })()
                      : "----"}
                  </td>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  >
                    {showEmployee.visaDetail?.status || "----"}
                  </td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "2% 4% 0% 4%",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: "700", fontSize: "30px" }}>
              Complaince Documents
            </span>
            <button className="btninfo">
              <IoMdAdd />
              Add
            </button>
          </div>
          <div style={{ padding: "1% 4% 0% 4%", marginBottom: "2%" }}>
            <table style={{ border: "1px solid #ccc", width: "100%" }}>
              <thead>
                <tr style={{ backgroundColor: "rgb(202, 229, 233)" }}>
                  <th
                    style={{
                      padding: "10px",
                      width: "25%",
                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Category
                  </th>

                  <th
                    style={{
                      padding: "10px",
                      width: "20%",
                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Status
                  </th>

                  <th
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Issue Date
                  </th>

                  <th
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                      borderRight: "2px solid #ccc",
                    }}
                  >
                    Expiry Date
                  </th>

                  <th style={{ padding: "10px", fontSize: "16px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgb(207, 194, 194)" }}>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  ></td>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  ></td>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  ></td>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  ></td>
                  <td
                    style={{
                      padding: "10px",

                      fontSize: "16px",
                    }}
                  ></td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showForm && (
        <EducationForm
          showForm={showForm}
          setShowForm={setShowForm}
          employeeId={employeeId}
          updateData={updateData}
          setUpdateData={setUpdateData}
          isEmpty={isEmpty}
          updateEmployeeData={() => {
            if (employeeId) {
              GetEmployeeDataId(employeeId).then((res) =>
                setShowEmployee(res.data.result)
              );
            }
          }}
        />
      )}
      {passportForm && (
        <PassportForm
          passportForm={passportForm}
          setPassportForm={setPassportForm}
          isEmpty={isEmpty}
          employeeId={employeeId}
        />
      )}
    </div>
  );
};
