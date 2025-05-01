import React from "react";
const Navbar = ({ activeTab, changeTab }) => {
  return (
    <div className="navbar">
      <div
        className={`nav-item ${activeTab === "ascii" ? "active" : ""}`}
        onClick={() => changeTab("ascii")}
      >
        MODBUS ASCII
      </div>
      <div
        className={`nav-item ${activeTab === "rtu" ? "active" : ""}`}
        onClick={() => changeTab("rtu")}
      >
        MODBUS RTU
      </div>
      <div
        className={`nav-item ${activeTab === "tcp" ? "active" : ""}`}
        onClick={() => changeTab("tcp")}
      >
        MODBUS TCP/IP
      </div>
    </div>
  );
};

export default Navbar;
