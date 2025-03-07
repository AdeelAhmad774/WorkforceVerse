import { useCallback, useEffect, useRef, useState } from "react";
import { FaEdit, FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HandleDropdown } from "./HandleDropdown";
import { NavLink } from "react-router-dom";
import { EditEmployeeForm } from "./EditEmployeeForm";

export const IconForm = ({ iconform, setIconForm, employeeId, curElem }) => {
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [editForm, setEditForm] = useState(false);

  const updatePosition = useCallback(() => {
    if (!iconform.iconRef) return;
    const rect = iconform.iconRef.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY + 6,
      left: rect.left + window.scrollX + rect.width / 2 - 160,
    });
  }, [iconform.iconRef]);

  useEffect(() => {
    if (!iconform.open || !iconform.iconRef) return;

    updatePosition(); // Set initial position
    const handleScrollResize = () => requestAnimationFrame(updatePosition);

    window.addEventListener("scroll", handleScrollResize, true);
    window.addEventListener("resize", handleScrollResize);

    return () => {
      window.removeEventListener("scroll", handleScrollResize, true);
      window.removeEventListener("resize", handleScrollResize);
    };
  }, [iconform.open, updatePosition]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIconForm({ open: false, rowIndex: null, iconRef: null });
      }
    };

    if (iconform.open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [iconform.open]);

  return (
    <>
      {iconform.open && (
        <div
          ref={dropdownRef}
          style={{
            position: "fixed",
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: "170px",
            height: "102px",
            padding: "10px",
            fontFamily: "serif",
            borderRadius: "6px",
            zIndex: 1000,
            border: "1px solid #ccc",
            backgroundColor: "rgb(250, 247, 247)",
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <NavLink
              to={`/Dashboard/ShowEmployeeeList/${curElem?.employeeId || ""}`} // Ensure no "undefined"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <FaUserEdit style={{ fontSize: "18px", marginRight: "8px" }} />
              <span>View Details</span>
            </NavLink>
          </div>

          <div
            onClick={() => setEditForm(true)}
            style={{ marginTop: "2px", cursor: "pointer" }}
          >
            <FaEdit style={{ fontSize: "18px", marginRight: "12px" }} />
            <span>Edit</span>
          </div>

          {editForm && (
            <EditEmployeeForm
              editForm={editForm}
              setEditForm={setEditForm}
              employeeId={curElem.employeeId}
            />
          )}

          <div style={{ marginTop: "2px", cursor: "pointer" }}>
            <MdDelete style={{ fontSize: "18px", marginRight: "12px" }} />
            <span>Delete</span>
          </div>
        </div>
      )}
    </>
  );
};
