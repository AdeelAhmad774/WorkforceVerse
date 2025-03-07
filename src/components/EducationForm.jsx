import { useEffect, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PostEmployeeEducation } from "./GetApi";
import { useMutation } from "@tanstack/react-query";

export const EducationForm = ({
  showForm,
  setShowForm,
  employeeId,
  updateEmployeeData,
  updateData,
  setUpdateData,
  isEmpty,
}) => {
  const [education, setEducation] = useState({
    EducationId: 0,
    Qualification: "",
    Degree: "",
    Year: "",
    Grade: "",
    EmployeeId: employeeId ? parseInt(employeeId, 10) || null : null,
  });
  useEffect(() => {
    if (updateData) {
      setEducation({
        EducationId: updateData.educationId || "",
        Qualification: updateData.qualification || "",
        Degree: updateData.degree || "",
        Year: updateData.year || "",
        Grade: updateData.grade || "",
        EmployeeId:
          updateData.employeeId && !isNaN(updateData.employeeId)
            ? parseInt(updateData.employeeId, 10)
            : employeeId && !isNaN(employeeId)
            ? parseInt(employeeId, 10)
            : null,
      });
    }
  }, [updateData, employeeId]);
  const UpdatePostData = async () => {
    try {
      const res = await PostEmployeeEducation(education);

      if (updateEmployeeData) {
        updateEmployeeData((prev) =>
          prev.map((curElem) =>
            curElem.EducationId === education.EducationId ? res.data : curElem
          )
        );
      }
      setShowForm(false);
    } catch (error) {
      console.log("Error updating data:", error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Submit") {
      setEducation((prev) => ({
        ...prev,
        EmployeeId: parseInt(employeeId) || null,
      }));

      await postEducation();
    } else if (action === "Update") {
      await UpdatePostData();
    }
  };

  const postEducation = async () => {
    try {
      const res = await PostEmployeeEducation(education);
      setEducation(res.data);
      setShowForm(false);

      if (updateEmployeeData) {
        updateEmployeeData();
      }
    } catch (error) {
      console.error("Error posting education:", error.message);
    }
  };

  return (
    <div>
      {showForm && (
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
              zIndex: 999, // Ensure modal appears above other elements
            }}
            onClick={() => setShowForm(false)}
          ></div>

          {/* Modal Content */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "50%", // Half of the page width
              height: "100%",
              backgroundColor: "white",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(10, 9, 9, 0.2)",
              zIndex: 1000,
              fontFamily: "serif",
            }}
          >
            <div style={{ position: "fixed", right: "1.3%" }}>
              <span
                type="button"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "4px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setShowForm(false)}
              >
                <IoMdClose />
              </span>
            </div>
            <h3 style={{ fontWeight: "600" }}>Add Education Detail</h3>

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
                  margin: "2% 4% 0% 4%",
                }}
              >
                <div style={{ width: "100%", position: "relative" }}>
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
                    value={education?.Qualification || ""}
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        Qualification: e.target.value,
                      })
                    }
                  />
                </div>

                <div
                  style={{
                    width: "100%",
                    position: "relative",
                    marginTop: "25px",
                  }}
                >
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
                    value={education?.Degree || ""}
                    onChange={(e) =>
                      setEducation({ ...education, Degree: e.target.value })
                    }
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
                    width: "100%",
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
                    value={education?.Year || ""}
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        Year: parseInt(e.target.value, 10) || "",
                      })
                    }
                  />
                </div>
                <div
                  style={{
                    width: "100%",
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
                    value={education?.Grade || ""}
                    onChange={(e) =>
                      setEducation({ ...education, Grade: e.target.value })
                    }
                  />
                </div>
                <div
                  style={{
                    margin: "10% 0% 0%  76%",
                  }}
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
                    value={isEmpty ? "Submit" : "Update"}
                  >
                    {isEmpty ? "Submit" : "Update"}
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
                    onClick={() => setShowForm(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
