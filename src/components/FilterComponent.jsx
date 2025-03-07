import { useEffect, useRef, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { HandleDropdown } from "./HandleDropdown";

export const FilterComponent = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    site: "All Sites",
    employeeName: "",
    fromDate: "",
    toDate: "",
  });
  const filterRef = useRef(null);
  // Toggle filter visibility
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  // Handle filter changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Handle filter application
  const applyFilter = () => {
    console.log("Filters applied:", filters);
    // Add logic to fetch/filter data based on these filters
  };

  // Handle filter clearing
  const clearFilter = () => {
    setFilters({
      site: "All Sites",
      employeeName: "",
      fromDate: "",
      toDate: "",
    });
  };
  // Handle clicks outside the filter box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  return (
    <div
      style={{
        width: "20%",
        marginLeft: "5%",
        marginRight: "30%",
      }}
    >
      {/* Show/Hide Filter Button */}

      <button
        onClick={toggleFilter}
        style={{
          border: "none",
          backgroundColor: "rgb(196, 209, 233)",
          padding: "12px",
          borderRadius: "4px",
        }}
      >
        <span>
          <MdOutlineAdd style={{ fontSize: "24px", marginRight: "3px" }} />
        </span>
        {showFilter ? "Hide Filter" : "Show Filter"}
      </button>

      {/* Filter Fields */}
      {showFilter && (
        <div
          ref={filterRef}
          style={{
            position: "absolute", // Ensures the dropdown is placed on top
            zIndex: 10, // Higher stacking order
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "10px",
            backgroundColor: "white", // Ensures dropdown is readable
            boxShadow: "0 4px 6px rgba(19, 18, 18, 0.1)", // Optional: Adds a shadow for better visibility
            width: "500px", // Optional: Adjust width as needed
          }}
        >
          {/* First row */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <label style={{ flex: 1 }}>
              Site:
              <HandleDropdown style={{ width: "100%", height: "35px" }} />
            </label>

            <label style={{ flex: 1 }}>
              Employee Name:
              <input
                type="text"
                name="employeeName"
                value={filters.employeeName}
                onChange={handleInputChange}
                style={{ width: "100%", height: "35px", marginLeft: "10px" }}
              />
            </label>
          </div>

          {/* Second row */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <label style={{ flex: 1 }}>
              From Date:
              <input
                type="date"
                name="fromDate"
                value={filters.fromDate}
                onChange={handleInputChange}
                style={{ width: "100%", marginLeft: "10px" }}
              />
            </label>

            <label style={{ flex: 1 }}>
              To Date:
              <input
                type="date"
                name="toDate"
                value={filters.toDate}
                onChange={handleInputChange}
                style={{ width: "100%", marginLeft: "10px" }}
              />
            </label>
          </div>

          {/* Buttons */}
          <div>
            <button
              onClick={applyFilter}
              style={{
                backgroundColor: "#6a0dad",
                color: "white",
                marginRight: "10px",
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Filter
            </button>
            <button
              onClick={clearFilter}
              style={{
                backgroundColor: "#ff6347",
                color: "white",
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
