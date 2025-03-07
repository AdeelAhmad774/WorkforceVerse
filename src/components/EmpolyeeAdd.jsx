import { useEffect, useState } from "react";
import { HandleDropdown } from "./HandleDropdown";
import { PostEmployeeAdd } from "./GetApi";
import { IoClose } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export const EmployeeAdd = ({ isModalOpen, setIsModalOpen }) => {
  const [addEmployee, setAddEmployee] = useState({
    SiteId: "",
    EmployeeCode: "",
    FirstName: "",
    LastName: "",
    PositionId: "",
    Email: "",
    StartTime: "",
    WorkingHours: "",
    StartDate: "",
    EndDate: "",
    AnnualLeaves: "",
    Gender: "",
    CvPath: "",
    DateOfBirth: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const handleSiteSelect = (selectedSite) => {
    console.log("selected site", selectedSite);

    setAddEmployee((prev) => ({
      ...prev,
      SiteId: selectedSite, // Update the SiteId with the selected value
    }));
  };
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await PostEmployeeAdd(addEmployee);
      console.log(res.data);

      // Show success popup
      setShowSuccessPopup(true);

      // Hide popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);

      setAddEmployee({
        SiteId: "",
        EmployeeCode: "",
        FirstName: "",
        LastName: "",
        PositionId: "",
        Email: "",
        StartTime: "",
        WorkingHours: "",
        StartDate: "",
        EndDate: "",
        AnnualLeaves: "",
        Gender: "",
        CvPath: "",
        DateOfBirth: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddEmployee((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <>
      {isModalOpen && (
        <div>
          {/* Backdrop */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div
            className="modal-container"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "50%", // Half of the page width
              height: "100%", // Full viewport height
              backgroundColor: "white",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(10, 9, 9, 0.2)",
              zIndex: 1000,
              fontFamily: "serif",
              overflowY: "auto", // Enables scrolling
              maxHeight: "100vh", // Prevents overflow beyond the viewport
              paddingTop: "50px", // To avoid content getting hidden behind fixed div
            }}
          >
            <div
              style={{
                position: "fixed",
                top: 0,
                right: "15px",
                width: "48%", // Ensure it matches the modal width
                backgroundColor: "#ccc",
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "4px",
                padding: "6px",
                zIndex: 1001, // Ensures it's above everything else
              }}
            >
              <h3
                style={{
                  fontWeight: "600",
                  margin: "0px",
                  padding: "4px 0px 0px 6px",
                }}
              >
                Add Employee
              </h3>
              <span
                type="button"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  margin: "0px 6px 3px 6px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  padding: "10px",
                  fontSize: "25px", // Doesn't affect icon size
                  display: "flex", // Ensures proper alignment
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setIsModalOpen(false)}
              >
                <IoMdClose size={20} /> {/* Increase size here */}
              </span>
            </div>
            <form
              onSubmit={handleFormSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                fontWeight: "700",
              }}
            >
              {/* Row for Site and Employee Code */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  gap: "20px", // Space between inputs
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    width: "50%",
                    position: "relative",
                    marginTop: "20px",
                  }}
                >
                  <label
                    htmlFor="empSite"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      backgroundColor: "white",
                      padding: "0 5px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    Site*
                  </label>

                  <HandleDropdown
                    onSelect={handleSiteSelect}
                    style={{ width: "100%", height: "46px" }}
                  />
                </div>
                <div
                  style={{
                    width: "50%",
                    position: "relative",
                    marginTop: "20px",
                  }}
                >
                  <label
                    htmlFor="EmployeeCode"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      backgroundColor: "white",
                      padding: "0 5px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    Employee Code*
                  </label>
                  <input
                    id="empCode"
                    value={addEmployee.EmployeeCode}
                    type="number"
                    name="EmployeeCode"
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      marginBottom: "20px",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  gap: "20px",
                }}
              >
                <div style={{ width: "50%", position: "relative" }}>
                  <label
                    htmlFor="empFirstname"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      backgroundColor: "white",
                      padding: "0 5px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    First Name*
                  </label>
                  <input
                    id="empFirstname"
                    value={addEmployee.FirstName}
                    name="FirstName"
                    onChange={handleInputChange}
                    type="text"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <div style={{ width: "50%", position: "relative" }}>
                  <label
                    htmlFor="empLastname"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      backgroundColor: "white",
                      padding: "0 5px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    Last Name*
                  </label>
                  <input
                    id="empLastname"
                    value={addEmployee.LastName}
                    name="LastName"
                    onChange={handleInputChange}
                    type="text"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "20px",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  gap: "20px",
                }}
              >
                <div style={{ width: "50%", position: "relative" }}>
                  <label
                    htmlFor="empPosition"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      backgroundColor: "white",
                      padding: "0 5px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    Position*
                  </label>
                  <input
                    id="empPosition"
                    value={addEmployee.PositionId}
                    name="PositionId"
                    onChange={handleInputChange}
                    type="text"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "20px",
                    }}
                  />
                </div>
                <div style={{ width: "50%", position: "relative" }}>
                  <label
                    htmlFor="empEmail"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      backgroundColor: "white",
                      padding: "0 5px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    Email*
                  </label>
                  <input
                    id="empEmail"
                    value={addEmployee.Email}
                    name="Email"
                    onChange={handleInputChange}
                    type="text"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "20px",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  gap: "20px",
                }}
              >
                <div style={{ width: "50%", position: "relative" }}>
                  <label
                    htmlFor="empStarttime"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      backgroundColor: "white",
                      padding: "0 5px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    Start Time*
                  </label>
                  <input
                    id="empStarttime"
                    value={addEmployee.StartTime}
                    name="StartTime"
                    onChange={handleInputChange}
                    type="time"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "20px",
                    }}
                  />
                </div>
                <div style={{ width: "50%", position: "relative" }}>
                  <label
                    htmlFor="empWorking"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      backgroundColor: "white",
                      padding: "0 5px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    Working Hours*
                  </label>
                  <input
                    id="empWorking"
                    value={addEmployee.WorkingHours}
                    name="WorkingHours"
                    onChange={handleInputChange}
                    type="text"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "20px",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  gap: "20px",
                }}
              >
                <div style={{ width: "50%", position: "relative" }}>
                  <label
                    htmlFor="empStartdate"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      backgroundColor: "white",
                      padding: "0 5px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    Start Date*
                  </label>
                  <input
                    id="empStartdate"
                    value={addEmployee.StartDate}
                    name="StartDate"
                    onChange={handleInputChange}
                    type="date"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "20px",
                    }}
                  />
                </div>
                <div style={{ width: "50%", position: "relative" }}>
                  <label
                    htmlFor="empEnddate"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      backgroundColor: "white",
                      padding: "0 5px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    End Date*
                  </label>
                  <input
                    id="empEnddate"
                    value={addEmployee.EndDate}
                    name="EndDate"
                    onChange={handleInputChange}
                    type="date"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "20px",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  gap: "20px", // Space between inputs
                }}
              >
                <div style={{ width: "50%", position: "relative" }}>
                  <label
                    htmlFor="empAnnualleaves"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      backgroundColor: "white",
                      padding: "0 5px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    Annual Leaves*
                  </label>
                  <input
                    id="empAnnualleaves"
                    value={addEmployee.AnnualLeaves}
                    name="AnnualLeaves"
                    onChange={handleInputChange}
                    type="text"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "20px",
                    }}
                  />
                </div>
                <div style={{ width: "50%", position: "relative" }}>
                  <label
                    htmlFor="empgender"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      backgroundColor: "white",
                      padding: "0 5px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    Gender
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "20px",
                    }}
                    id="empgender"
                    name="Gender"
                    value={addEmployee.Gender}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  gap: "20px", // Space between inputs
                }}
              >
                <div style={{ width: "50%", position: "relative" }}>
                  <label
                    htmlFor="empCv"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      backgroundColor: "white",
                      padding: "0 5px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    CV
                  </label>
                  <input
                    id="empCv"
                    value={addEmployee.CvPath}
                    name="CvPath"
                    onChange={handleInputChange}
                    type="file"
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      display: "inline-block",
                      border: "1px solid #ccc",
                      marginBottom: "20px",
                    }}
                  />
                </div>
                <div style={{ width: "50%", position: "relative" }}>
                  <label
                    htmlFor="empDateofbirth"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      backgroundColor: "white",
                      padding: "0 5px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    Date of Birth
                  </label>
                  <input
                    id="empDateofbirth"
                    value={addEmployee.DateOfBirth}
                    name="DateOfBirth"
                    onChange={handleInputChange}
                    type="date"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "20px",
                    }}
                  />
                </div>
              </div>
              {/* Buttons */}
              <div
               
              >
                <button
                  type="submit"
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Success Popup */}
      {showSuccessPopup && (
        <div
          style={{
            position: "fixed",
            top: "3%",
            right: "0",
            transform: "translate(-50%, -50%)",
            backgroundColor: "green",
            color: "white",
            padding: "15px 30px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 2000,
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Employee Added Successfully!
        </div>
      )}
    </>
  );
};
