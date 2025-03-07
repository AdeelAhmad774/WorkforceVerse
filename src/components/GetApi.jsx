import axios from "axios";
import { useParams } from "react-router-dom";

const API = axios.create({
  baseURL: "http://192.168.100.96:7182",
});

const token = localStorage.getItem("authToken");
export const PostAuth = async (postauth) => {
  return API.post(
    `/api/Auth/Login?username=${postauth.username}&password=${postauth.password}`
  );
};

export const PostSites = async (sitedata) => {
  if (!token) {
    throw new Error("No auth token found");
  }
  return API.post("/api/Site/SiteList", sitedata, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
export const PostDashboardData = async (dashboardData) => {
  if (!token) {
    throw new Error("no auth token found");
  }

  return API.post("/api/Dashboard/DashboardAPI", dashboardData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
export const PostPresentList = async (presentlist) => {
  if (!token) {
    throw new Error("no auth found");
  }
  return API.post("/api/Attendance/AttendanceList", presentlist, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
export const PostEmployeeList = async (employeelist) => {
  if (!token) {
    throw new Error("no auth found");
  }
  return API.post("/api/Employee/EmployeeList", employeelist, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
export const PostEmployeeAdd = async (employeeAdd) => {
  console.log(employeeAdd);
  if (!token) {
    throw new Error("no auth found");
  }
  return API.post("/api/Employee/AddEmployee", employeeAdd, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
export const GetEmployeeDataId = async (employeeId) => {
  if (!token) {
    throw new Error("no auth found");
  }
  return API.post(
    `/api/Employee/GetEmployeeByEmployeeId?EmployeeId=${employeeId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
export const PostEmployeeEducation = (educationDetails) => {
  const formdata = new FormData();
  formdata.append("EmployeeId", educationDetails.EmployeeId); // Fix key name (case-sensitive)
  formdata.append("EducationId", educationDetails.EducationId);
  formdata.append("Qualification", educationDetails.Qualification);
  formdata.append("Degree", educationDetails.Degree);
  formdata.append("Year", educationDetails.Year);
  formdata.append("Grade", educationDetails.Grade);

  if (!token) {
    throw new Error("No Auth Found");
  }

  return API.post("/api/Employee/EmployeeEducationalDetail", formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const DeleteDocument = async (educationId) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("no auth found");
  }
  return API.post(
    `/api/Employee/DeleteEmployeeDocument?Id=${educationId}&Document=Education`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
export const PassportDocument = (document) => {
  const token = localStorage.getItem("authToken") || "";
  if (!token) {
    throw new Error("No auth Found");
  }
  const formData = new FormData();
  formData.append("DocumentId", document.DocumentId);
  formData.append("EmployeeId", document.EmployeeId);
  formData.append("Images", document.Images);
  formData.append("Nationality", document.Nationality);
  formData.append("IssueDate", document.IssueDate);
  formData.append("ExpiryDate", document.ExpiryDate);

  return API.post("/api/Employee/EmployeePassportDocuments", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const UpdateEmployeeBankDetails = async (bankData) => {
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await API.post(
      "/api/Employee/UpdateEmployee",
      bankData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating passport details:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const UpdatePassportDetails = async (passport) => {
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await API.post(
      "/api/Employee/EmployeePassportDocuments",
      passport,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating passport details:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const UpdateVisaDetails = async (visaDetails) => {
  if (!token) {
    throw new Error("No authentication token found");
  }
  try {
    const response = await API.post(
      "/api/Employee/EmployeeVisaDocuments",
      visaDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating passport details:",
      error.response?.data || error.message
    );
    throw error;
  }
};
