import { useState } from "react";
import { Login } from "../components/Login";
import { Layout } from "../components/Layout";
import { Dashboard } from "../components/Dashboard";
import { FileManager } from "../components/FileManager";
import { UserManagement } from "../components/UserManagement";
import { Settings } from "../components/Settings";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleLogin = (role: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <Layout userRole={userRole} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
          <Route path="/files" element={<FileManager userRole={userRole} />} />
          {userRole === "admin" && (
            <>
              <Route path="/users" element={<UserManagement />} />
              <Route path="/settings" element={<Settings />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Index;
