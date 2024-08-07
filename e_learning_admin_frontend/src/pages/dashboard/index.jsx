import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import ClassesSection from "../../components/classSection";
import WithdrawalsSection from "../../components/withdrawal";
import "./dashboard.css";

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="admin-dashboard-page">
      <Sidebar
        handleSectionChange={handleSectionChange}
        activeSection={activeSection}
        className={sidebarVisible ? "" : "hidden"}
      />
      <main className={`content ${sidebarVisible ? "" : "sidebar-hidden"}`}>
        <nav className="primary-bg-color primary-text-color p-4 mb-4">
          <h1>Admin Dashboard</h1>
        </nav>

        {activeSection === "dashboard" && <ClassesSection />}
        {activeSection === "classes" && <ClassesSection />}
        {activeSection === "forms" && <WithdrawalsSection />}
      </main>
    </div>
  );
};

export default DashboardPage;
