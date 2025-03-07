import { IoMdClose } from "react-icons/io";
import { HandleDropdown } from "./HandleDropdown";
import { useEffect, useState } from "react";
import { GetEmployeeDataId, UpdateEmployeeBankDetails, UpdatePassportDetails, UpdateVisaDetails, } from "./GetApi";
import React from "react";


export const EditEmployeeForm = ({
  editForm,
  setEditForm,
  employeeId,
  res,
}) => {
  const [activeStep, setActiveStep] = useState(1); // Step state

  const [showForm, setShowForm] = useState(false);
  const [updateData, setUpdateData] = useState({
    siteName: "",
    employeeCode: "",
    firstName: "",
    lastName: "",
    positionId: "",
    email: "",
    startTime: "",
    workingHours: "",
    startDate: "",
    endDate: "",
    annualLeaves: "",
    gender: "",
    cv: "",
    dateOfBirth: "",
    contactNumber: "",
    niNo: "",
    addresses: "",
    emergencyContactDetail: "",
    bankDetail: {
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      accountType: "",
      country: "",
      securityCode: "",
      postalCode: "",
      bankDetailId: "",
    },
    passportDetail: {
      nationality: "",
      issueDate: "",
      expiryDate: "",
      documentId:"",
    },

    visaDetail: {
      category: "",
      issueDate: "",
      expiryDate: "",
      status: "",
      documentId:"",
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!employeeId) {
      console.error("Employee ID is not provided!");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await GetEmployeeDataId(employeeId);
        if (res.data?.result) {
          setUpdateData((prevData) => ({
            ...prevData,
            ...res.data.result,
            startTime: res.data.result.startTime
              ? res.data.result.startTime.split("T")[1].slice(0, 5)
              : "",
          }));
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [employeeId]);

  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
     
     
    }));
  };
  // Function to handle changes in the bank details
const handleBankInputChange = (e) => {
  const { name, value } = e.target;
  setUpdateData((prevData) => ({
    ...prevData,
    bankDetail: {
      ...prevData.bankDetail,
      [name]: value,
    },
  }));
};
const handlePassportDetailChange=(e)=>{
e.preventDefault();
const {name,value}= e.target;
setUpdateData((prevData)=>({
...prevData,
passportDetail:{
  ...prevData.passportDetail,
  [name]:value,
}
}));
};
const handleVisaDetailChange=(e)=>{
e.preventDefault();
const {name,value}= e.target;
setUpdateData((prevData)=>({
...prevData,
visaDetail:{
  ...prevData.visaDetail,
  [name]:value,
}

}))
}
const handleVisaDetailSubmit = async (e) => {
  e.preventDefault();
  
  const formattedVisaDetails = new FormData();
  formattedVisaDetails.append("EmployeeId", employeeId);
  formattedVisaDetails.append("Category", updateData.visaDetail.category || "");
  formattedVisaDetails.append("IssueDate", updateData.visaDetail.issueDate || "");
  formattedVisaDetails.append("ExpiryDate", updateData.visaDetail.expiryDate || "");
  formattedVisaDetails.append("Status", updateData.visaDetail.status || "");

  // If documentId exists, convert it to an integer, otherwise append null
  formattedVisaDetails.append(
    "DocumentId",
    updateData.visaDetail.documentId ? parseInt(updateData.visaDetail.documentId, 10) : ""
  );

  try {
    const response = await UpdateVisaDetails(formattedVisaDetails);
    console.log("Visa details updated successfully:", response);
  } catch (error) {
    console.error("Failed to update visa details:", error);
  }
};


  const handleBankDetailUpdate = async (e) => {
    e.preventDefault();
  
   // Mapping the bank details to match the expected API field names
    const formattedBankDetails = new FormData();

      formattedBankDetails.append("EmployeeId", employeeId);
     formattedBankDetails.append("BankName", updateData.bankDetail.bankName); 
      formattedBankDetails.append("AccountHolderName", updateData.bankDetail.accountHolderName);
      formattedBankDetails.append("AccountNumber", updateData.bankDetail.accountNumber)
      formattedBankDetails.append("AccountType", updateData.bankDetail.accountType);
      formattedBankDetails.append("Country", updateData.bankDetail.country);
      formattedBankDetails.append("SecurityCode", updateData.bankDetail.securityCode); 
      formattedBankDetails.append("PostalCode", updateData.bankDetail.postalCode); 
      
      formattedBankDetails.append(
        "BankDetailId",
        updateData.bankDetail.bankDetailId ? parseInt(updateData.bankDetail.bankDetailId, 10) : ""
      );
    
  
    try {
      const response = await UpdateEmployeeBankDetails(
       
        formattedBankDetails // Send formatted data
      );
      console.log("Bank details updated successfully:", response);
    } catch (error) {
      console.error("Failed to update bank details:", error);
    }
  };
  const handlePassportDetailSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId) {
        console.error("Employee ID is missing!");
        return;
    }

    const formData = new FormData();
    formData.append("EmployeeId", parseInt(employeeId, 10)); // Ensure integer
    formData.append("DocumentId", updateData.passportDetail.documentId ? parseInt(updateData.passportDetail.documentId, 10) : ""); 
    formData.append("Nationality", updateData.passportDetail.nationality || "");
    formData.append("IssueDate", updateData.passportDetail.issueDate || "");
    formData.append("ExpiryDate", updateData.passportDetail.expiryDate || "");

    try {
        const response = await UpdatePassportDetails(formData); // ✅ Pass FormData
        console.log("Passport details updated successfully:", response);
    } catch (error) {
        console.error("Failed to update passport details:", error);
    }
};
  return (
    <>
      {editForm && (
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
            onClick={() => setEditForm(false)}
          ></div>

          {/* Modal Content */}
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
            {/* Fixed Header */}
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
                Edit Employee
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
                onClick={() => setEditForm(false)}
              >
                <IoMdClose size={20} /> {/* Increase size here */}
              </span>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginTop: "20px",
                  justifyContent: "center",
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((step, index, array) => (
                  <React.Fragment key={step}>
                    <button
                      onClick={() => setActiveStep(step)}
                      style={{
                        backgroundColor: activeStep === step ? "blue" : "#ccc",
                        color: "white",
                        padding: "8px 15px",
                        border: "none",
                        borderRadius: "50%",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {step}
                    </button>

                    {/* Add a line between buttons except after the last one */}
                    {index < array.length - 1 && (
                      <div
                        style={{
                          width: "70px", // Adjust line length
                          height: "2px", // Line thickness
                          backgroundColor: "gray",
                          alignSelf: "center",
                        }}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <form
                onSubmit={handleFormSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  fontWeight: "700",
                  marginTop: "8px",
                }}
              >
                {/* Row for Site and Employee Code */}
                {activeStep === 1 && (
                  <div style={{ marginTop: "10px" }}>
                    <h4 style={{ fontWeight: "600", marginBottom: "5px" }}>
                      Employee Details
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                        gap: "20px", // Space between inputs
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
                          value={updateData.siteName || ""} // Ensure it has a default value
                          onChange={(selectedValue) =>
                            setUpdateData((prevData) => ({
                              ...prevData,
                              siteName: selectedValue, // Ensure siteName updates correctly
                            }))
                          }
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
                          type="number"
                          name="employeeCode"
                          value={updateData.employeeCode}
                          onChange={handleInputChange}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            marginBottom: "20px",
                            borderRadius: "4px",
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
                          name="firstName"
                          value={updateData.firstName}
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
                          name="lastName"
                          value={updateData.lastName}
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
                          name="positionId"
                          value={updateData.positionId}
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
                          name="email"
                          value={updateData.email}
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
                          name="startTime"
                          value={updateData.startTime}
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
                          name="workingHours"
                          value={updateData.workingHours}
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
                          name="startDate"
                          value={updateData.startDate.split("T")[0]}
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
                          name="endDate"
                          value={
                            updateData.endDate.split("T")[0] // Directly use the date if it's valid
                          }
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
                          name="annualLeaves"
                          value={updateData.annualLeaves}
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
                          name="gender"
                          value={updateData.gender}
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
                          name="cv"
                          value={updateData.cv}
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
                          name="dateOfBirth"
                          value={
                            updateData.dateOfBirth
                              ? new Date(updateData.dateOfBirth).split("T")[0]
                              : "" // If null or undefined, set value to an empty string
                          }
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
                    <div>
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
                        Save & Next
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
                        onClick={() => setEditForm(false)}
                      >
                        Save & Exit
                      </button>
                    </div>
                  </div>
                )}
                {activeStep === 2 && (
                  <div style={{ marginTop: "10px" }}>
                    <h4 style={{ fontWeight: "600", marginBottom: "25px" }}>
                      Contact Details
                    </h4>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",

                        gap: "20px", // Space between inputs
                      }}
                    >
                      <div style={{ width: "50%", position: "relative" }}>
                        <label
                          htmlFor="EmpcontactNumbere"
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
                          Phone*
                        </label>

                        <input
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                          id="EmpcontactNumber"
                          name="contactNumber"
                          value={updateData?.contactNumber || ""}
                          onChange={handleInputChange}
                          type="number"
                        />
                      </div>
                      <div
                        style={{
                          width: "50%",
                          position: "relative",
                        }}
                      >
                        <label
                          htmlFor="EmpniNo"
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
                          NI Number*
                        </label>
                        <input
                          id="EmpniNo"
                          name="niNo"
                          value={updateData?.niNo || ""}
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
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",

                        gap: "20px", // Space between inputs
                      }}
                    >
                      <div
                        style={{
                          width: "50%",
                          position: "relative",
                          marginTop: "25px",
                        }}
                      >
                        <label
                          htmlFor="Empaddresses"
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
                          Address*
                        </label>
                        <input
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                          id="Empaddresses"
                          name="addresses"
                          type="text"
                          value={updateData?.addresses || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div
                        style={{
                          width: "50%",
                          position: "relative",
                          marginTop: "25px",
                        }}
                      >
                        <label
                          htmlFor="GraEmpemergencyContactDetailde"
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
                          Emergency Contact Detail*
                        </label>
                        <input
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                          id="EmpemergencyContactDetail"
                          type="text"
                          name="emergencyContactDetail"
                          value={updateData?.emergencyContactDetail || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: "30px" }}>
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
                        Update & Next
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
                        onClick={() => setEditForm(false)}
                      >
                        Update & Exit
                      </button>
                    </div>
                  </div>
                )}
                {activeStep === 3 && (
                  <div style={{ marginTop: "10px" }}>
                    {!showForm ? (
                      <>
                        <h4 style={{ fontWeight: "600", marginBottom: "25px" }}>
                          Educational Documents
                        </h4>
                        <table
                          style={{ border: "1px solid #ccc", width: "100%" }}
                        >
                          <thead>
                            <tr
                              style={{ backgroundColor: "rgb(202, 229, 233)" }}
                            >
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
                                style={{
                                  padding: "10px",
                                  width: "20%",
                                  fontSize: "16px",
                                }}
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {updateData?.educationDetail?.map((edu, index) => (
                              <tr
                                key={index}
                                style={{
                                  borderBottom: "1px solid rgb(207, 194, 194)",
                                  fontWeight: "normal",
                                }}
                              >
                                <td
                                  style={{
                                    padding: "10px",
                                    fontSize: "16px",
                                  }}
                                >
                                  {edu.qualification || "N/A"}
                                </td>
                                <td
                                  style={{
                                    padding: "10px",
                                    fontSize: "16px",
                                  }}
                                >
                                  {edu.degree || "N/A"}
                                </td>
                                <td
                                  style={{
                                    padding: "10px",
                                    fontSize: "16px",
                                  }}
                                >
                                  {edu.year || "N/A"}
                                </td>
                                <td
                                  style={{
                                    padding: "10px",
                                    fontSize: "16px",
                                  }}
                                >
                                  {edu.grade || "N/A"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div style={{ marginTop: "30px" }}>
                          <button
                            type="button"
                            style={{
                              backgroundColor: "blue",
                              color: "white",
                              padding: "10px 20px",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                            onClick={() => setShowForm(true)} // Hide table and show form
                          >
                            Update & Next
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
                            onClick={() => setEditForm(false)}
                          >
                            Update & Exit
                          </button>
                        </div>
                      </>
                    ) : (
                      <div>
                        <h4 style={{ fontWeight: "600", marginBottom: "25px" }}>
                          Update Educational Details
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "20px",
                          }}
                        >
                          <div style={{ width: "50%", position: "relative" }}>
                            <label
                              htmlFor="Qualification"
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
                              Qualification*
                            </label>
                            <input
                              style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                              type="text"
                              name="Qualification"
                            />
                          </div>
                          <div style={{ width: "50%", position: "relative" }}>
                            <label
                              htmlFor="Degree"
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
                              Degree*
                            </label>
                            <input
                              name="Degree"
                              type="text"
                              style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                            />
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "50%",
                              position: "relative",
                              marginTop: "25px",
                            }}
                          >
                            <label
                              htmlFor="Year"
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
                              Year*
                            </label>
                            <input
                              style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                              name="Year"
                              type="text"
                            />
                          </div>
                          <div
                            style={{
                              width: "50%",
                              position: "relative",
                              marginTop: "25px",
                            }}
                          >
                            <label
                              htmlFor="Grade"
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
                              Grade*
                            </label>
                            <input
                              style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                              type="text"
                              name="Grade"
                            />
                          </div>
                        </div>

                        <div style={{ marginTop: "30px" }}>
                          <button
                            type="button"
                            style={{
                              backgroundColor: "green",
                              color: "white",
                              padding: "10px 20px",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                            onClick={() => setShowForm(false)} // Hide form and show table again
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
                            onClick={() => setEditForm(false)}
                          >
                            Exit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </form>
              <form onSubmit={handleBankDetailUpdate}>
                {activeStep === 4 && (
                  <div style={{ marginTop: "10px" }}>
                    <h4 style={{ fontWeight: "600", marginBottom: "25px" }}>
                      Bank Details
                    </h4>

                    <div style={{ width: "70%", position: "relative" }}>
                      <label
                        htmlFor="EmpbankName"
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
                        Bank Name*
                      </label>

                      <input
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        id="EmpbankName"
                        type="text"
                        name="bankName"
                        value={updateData.bankDetail?.bankName}
                        onChange={handleBankInputChange}
                      />
                    </div>
                    <div
                      style={{
                        width: "70%",
                        position: "relative",
                        marginTop: "25px",
                      }}
                    >
                      <label
                        htmlFor="EmpaccountHolderName"
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
                        Account Holder Name*
                      </label>
                      <input
                        id="EmpaccountHolderName"
                        name="accountHolderName"
                        type="text"
                        value={updateData.bankDetail?.accountHolderName}
                        onChange={handleBankInputChange}
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        width: "70%",
                        position: "relative",
                        marginTop: "25px",
                      }}
                    >
                      <label
                        htmlFor="EmpaccountNumber"
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
                        Account Number*
                      </label>
                      <input
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        id="EmpaccountNumber"
                        name="accountNumber"
                        type="number"
                        value={updateData.bankDetail?.accountNumber}
                        onChange={handleBankInputChange}
                      />
                    </div>
                    <div
                      style={{
                        width: "70%",
                        position: "relative",
                        marginTop: "25px",
                      }}
                    >
                      <label
                        htmlFor="EmpaccountType"
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
                        Account Type*
                      </label>
                      <input
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        id="EmpaccountType"
                        type="text"
                        name="accountType"
                        value={updateData.bankDetail?.accountType}
                        onChange={handleBankInputChange}
                      />
                    </div>
                    <div
                      style={{
                        width: "70%",
                        position: "relative",
                        marginTop: "25px",
                      }}
                    >
                      <label
                        htmlFor="Empcountry"
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
                        Country
                      </label>
                      <input
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        id="Empcountry"
                        type="text"
                        name="country"
                        value={updateData.bankDetail?.country}
                        onChange={handleBankInputChange}
                      />
                    </div>
                    <div
                      style={{
                        width: "70%",
                        position: "relative",
                        marginTop: "25px",
                      }}
                    >
                      <label
                        htmlFor="EmpsecurityCode"
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
                        Seurity Code
                      </label>
                      <input
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        id="EmpsecurityCode"
                        type="number"
                        name="securityCode"
                        value={updateData.bankDetail?.securityCode}
                        onChange={handleBankInputChange}
                      />
                    </div>
                    <div
                      style={{
                        width: "70%",
                        position: "relative",
                        marginTop: "25px",
                      }}
                    >
                      <label
                        htmlFor="EmppostalCode"
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
                        Postal Code
                      </label>
                      <input
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        id="EmppostalCode"
                        type="number"
                        name="postalCode"
                        value={updateData.bankDetail?.postalCode}
                        onChange={handleBankInputChange}
                      />
                    </div>

                    <div style={{ marginTop: "30px" }}>
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
                        Update & Next
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
                        onClick={() => setEditForm(false)}
                      >
                        Update & Exit
                      </button>
                    </div>
                  </div>
                )}
              </form>
              <form onSubmit={handlePassportDetailSubmit}>
              {activeStep === 5 && (
                  <div style={{ marginTop: "10px" }}>
                    <h4 style={{ fontWeight: "600", marginBottom: "25px" }}>
                      Passport Details
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",

                        gap: "20px", // Space between inputs
                      }}
                    >
                      <div style={{ width: "50%", position: "relative" }}>
                        <label
                          htmlFor="EmpFirstname"
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
                          Image
                        </label>

                        <input
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                          type="file"
                          name="Qualification"
                        />
                      </div>
                      <div
                        style={{
                          width: "50%",
                          position: "relative",
                        }}
                      >
                        <label
                          htmlFor="Empnationality"
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
                          Nationality*
                        </label>
                        <input
                          id="Empnationality"
                          name="nationality"
                          type="text"
                          value={updateData.passportDetail?.nationality}
                          onChange={handlePassportDetailChange}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",

                        gap: "20px", // Space between inputs
                      }}
                    >
                      <div
                        style={{
                          width: "50%",
                          position: "relative",
                          marginTop: "25px",
                        }}
                      >
                        <label
                          htmlFor="EmpissueDate"
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
                          Issue Date*
                        </label>
                        <input
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                          id="EmpissueDate"
                          name="issueDate"
                          type="date"
                          value={updateData.passportDetail?.issueDate ? updateData.passportDetail.issueDate.split("T")[0] : ""}
                          onChange={handlePassportDetailChange}
                        />
                      </div>
                      <div
                        style={{
                          width: "50%",
                          position: "relative",
                          marginTop: "25px",
                        }}
                      >
                        <label
                          htmlFor="EmpexpiryDate"
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
                          Expiry Date*
                        </label>
                        <input
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                          id="EmpexpiryDate"
                          type="date"
                          name="expiryDate"
                          value={updateData.passportDetail?.expiryDate ? updateData.passportDetail.expiryDate.split("T")[0] : ""}
                          onChange={handlePassportDetailChange}
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: "30px" }}>
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
                        Update & Next
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
                        onClick={() => setEditForm(false)}
                      >
                        Update & Exit
                      </button>
                    </div>
                  </div>
                )}
              </form>
              <form onSubmit={handleVisaDetailSubmit}>
              {activeStep === 6 && (
                  <div style={{ marginTop: "10px" }}>
                    <h4 style={{ fontWeight: "600", marginBottom: "25px" }}>
                      Visa Details
                    </h4>

                    <div style={{ width: "70%", position: "relative" }}>
                      <label
                        htmlFor="EmpFirstname"
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
                        Image
                      </label>

                      <input
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        type="file"
                        name="Qualification"
                      />
                    </div>
                    <div
                      style={{
                        width: "70%",
                        position: "relative",
                        marginTop: "25px",
                      }}
                    >
                      <label
                        htmlFor="Empcategory"
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
                        Category*
                      </label>
                      <input
                        id="Empcategory"
                        name="category"
                        type="text"
                        value={updateData.visaDetail?.category || ""}
                        onChange={handleVisaDetailChange}
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        width: "70%",
                        position: "relative",
                        marginTop: "25px",
                      }}
                    >
                      <label
                        htmlFor="EmpissueDate"
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
                        Issue Date*
                      </label>
                      <input
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        id="EmpissueDate"
                        name="issueDate"
                        type="date"
                        
                        value={updateData.visaDetail?.issueDate ? updateData.visaDetail.issueDate.split("T")[0] : ""}
                        onChange={handleVisaDetailChange}
                      />
                    </div>
                    <div
                      style={{
                        width: "70%",
                        position: "relative",
                        marginTop: "25px",
                      }}
                    >
                      <label
                        htmlFor="EmpexpiryDate"
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
                        Expiry Date*
                      </label>
                      <input
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        id="EmpexpiryDate"
                        name="expiryDate"
                        type="date"
                        value={updateData.visaDetail?.expiryDate ? updateData.visaDetail.expiryDate.split("T")[0] : ""}
                        
                        onChange={handleVisaDetailChange}
                      />
                    </div>
                    <div
                      style={{
                        width: "70%",
                        position: "relative",
                        marginTop: "25px",
                      }}
                    >
                      <label
                        htmlFor="Empstatus"
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
                        Status*
                      </label>
                      <input
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        id="Empstatus"
                        name="status"
                        type="text"
                        value={updateData.visaDetail?.status || ""}
                        onChange={handleVisaDetailChange}
                      />
                    </div>

                    <div style={{ marginTop: "30px" }}>
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
                        Update & Next
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
                        onClick={() => setEditForm(false)}
                      >
                        Update & Exit
                      </button>
                    </div>
                  </div>
                )}
              </form>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};
