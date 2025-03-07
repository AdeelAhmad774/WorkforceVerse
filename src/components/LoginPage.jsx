// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { useEffect, useState } from "react";
// import { PostAuth } from "./GetApi";

// export const LoginPage = () => {
//   const [auth, setAuth] = useState({
//     username: "adnan.saeed@ausz-tech.com",
//     password: "office123",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await PostAuth(auth);
//         console.log(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAuth((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <div>
//       <div style={{ margin: "60px 0px 0px 100px" }}>
//         <img src="src/assets/images/logo.png" width="18%" alt="Logo" />
//       </div>
//       <div style={{ margin: "100px 0px 0px 110px" }}>
//         <form style={{ fontSize: "20px" }}>
//           <div className="mb-3">
//             <label htmlFor="username" className="form-label">
//               Username
//             </label>
//             <input
//               style={{ width: "18%", height: "2.5rem" }}
//               type="email"
//               className="form-control"
//               id="username"
//               name="username"
//               value={auth.username}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               style={{ width: "18%", height: "2.5rem" }}
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               value={auth.password}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn btn-primary"
//             style={{ marginTop: "20px", marginBottom: "20px" }}
//           >
//             Login
//           </button>
//           <br />
//           <button className="btn btn-primary btn1 " type="button">
//             Sign up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
import { useState } from "react";
import { PostAuth } from "./GetApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginPage = () => {
  const navigate = useNavigate();

  // State for credentials and errors
  const [auth, setAuth] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  // Simple email format validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle input changes and clear error for that field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuth((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();

  // First, validate email only.
  if (!auth.username) {
    setErrors({ username: "Please fill this field." });
    return;
  } else if (!isValidEmail(auth.username)) {
    setErrors({ username: "Wrong email" });
    return;
  }

  // At this point, email is valid so clear any email error.
  setErrors({});

  // Now, validate password.
  if (!auth.password) {
    setErrors({ password: "Please fill this field." });
    return;
  } else if (auth.password.length < 6) {
    setErrors({ password: "Wrong password" });
    return;
  }

  // Clear errors if both validations pass.
  setErrors({});

  // Proceed with API call.
  try {
    const res = await PostAuth(auth);
    console.log("API Response:", res);
    if (res.data.code === 200) {
      localStorage.setItem("authToken", res.data.responseData);
      toast.success("Login successful!");
      setTimeout(() => navigate("/Dashboard"), 1500);
    } else {
      // For API errors, we prioritize email if the error mentions it.
      const errorMsg = res.data.message || "Authentication error";
      if (errorMsg.toLowerCase().includes("email")) {
        setErrors({ username: errorMsg });
      } else if (errorMsg.toLowerCase().includes("password")) {
        setErrors({ password: errorMsg });
      } else {
        // If ambiguous, we show error on email first.
        setErrors({ username: errorMsg });
      }
    }
  } catch (error) {
    console.error("Error during login:", error.message || error);
    setErrors({ username: "An error occurred. Please try again." });
  }
};

  
  
  

  return (
    <div>
      {/* Toast container with custom CSS class for background color */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        toastClassName="custom-toast"
      />
      <div style={{ margin: "60px 0px 0px 100px" }}>
        <img src="src/assets/images/logo.png" width="18%" alt="Logo" />
      </div>
      <div style={{ margin: "100px 0px 0px 110px" }}>
        <form style={{ fontSize: "20px" }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              style={{ width: "20%", height: "2.5rem" }}
              type="email"
              className="form-control"
              id="username"
              name="username"
              value={auth.username}
              onChange={handleInputChange}
              placeholder="Enter username"
            />
            {errors.username && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.username}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              style={{ width: "20%", height: "2.5rem" }}
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={auth.password}
              onChange={handleInputChange}
              placeholder="Enter password"
            />
            {errors.password && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.password}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            Login
          </button>
          <br />
          <button className="btn btn-primary btn1" type="button">
            Sign up
          </button>
          <br />
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

