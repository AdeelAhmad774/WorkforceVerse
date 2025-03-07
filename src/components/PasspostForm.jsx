import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PassportDocument } from "./GetApi";

export const PassportForm = ({
  passportForm,
  setPassportForm,
  isEmpty,
  employeeId,
}) => {
  const [passportData, setPassportData] = useState({
    DocumentId: 0,
    EmployeeId: employeeId ? parseInt(employeeId) : "",
    Images: "",
    Nationality: "",
    IssueDate: "",
    ExpiryDate: "",
  });
  useEffect(() => {});
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPassportData((prev) => ({
      ...prev,
      [name]: name === "DocumentId" ? parseInt(value, 10) || 0 : value, // Convert to integer
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = PassportDocument(passportData);
      setPassportData(res.data);
      console.log(passportData);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      {passportForm && (
        <div>
          {/* Backdrop */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",

              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999, // Ensure modal appears above other elements
            }}
            onClick={() => setPassportForm(false)}
          ></div>

          {/* Modal Content */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "50%", // Half of the page width
              height: "100vh",
              backgroundColor: "white",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(10, 9, 9, 0.2)",
              zIndex: 1000,
              fontFamily: "serif",
            }}
          >
            <div style={{ position: "fixed", right: "1.3%" }}>
              <span
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "4px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setPassportForm(false)}
              >
                <IoMdClose />
              </span>
            </div>
            <h3 style={{ fontWeight: "600" }}>Add Passport Detail</h3>

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
                <div style={{ width: "100%" }}>
                  <label htmlFor="Image">Image*</label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      padding: "4px",

                      marginTop: "2px",
                    }}
                    type="file"
                    name="Images"
                    accept="image/*"
                    onChange={(e) =>
                      setPassportData((prev) => ({
                        ...prev,
                        Images: e.target.files[0],
                      }))
                    }
                  />
                </div>
                <div style={{ width: "100%", marginTop: "2%" }}>
                  <label htmlFor="Nationality">Nationality*</label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      padding: "4px",

                      marginTop: "2px",
                    }}
                    name="Nationality"
                    type="text"
                    value={passportData?.Nationality || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ width: "100%", marginTop: "2%" }}>
                  <label htmlFor="IssueDate">Issue Date*</label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      padding: "4px",

                      marginTop: "2px",
                    }}
                    name="IssueDate"
                    type="date"
                    value={passportData?.IssueDate || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ width: "100%", marginTop: "2%" }}>
                  <label htmlFor="ExpiryDate">Expiry Date*</label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      padding: "4px",

                      marginTop: "2px",
                    }}
                    type="date"
                    name="ExpiryDate"
                    value={passportData?.ExpiryDate || ""}
                    onChange={handleInputChange}
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
                    onClick={() => setPassportForm(false)}
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
