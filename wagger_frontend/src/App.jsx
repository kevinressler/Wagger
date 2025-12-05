import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./login.jsx";
import Dashboard from "./Dashboard.jsx";
import FindDogs from "./FindDogs.jsx";
import AddDog from "./AddDog.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("wagger_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing saved user:", e);
        localStorage.removeItem("wagger_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("wagger_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("wagger_user");
    }
  }, [user]);

  // Show loading state while checking for saved user
  if (isLoading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        background: "#020617",
        color: "#e5e7eb"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage onLogin={setUser} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<FindDogs />} />
          <Route path="add-dog" element={<AddDog />} />
          <Route
            path="matches"
            element={
              <div>
                <h2>Your Matches</h2>
                <p>No matches yet. Start wagging to find your perfect match! 🐶</p>
              </div>
            }
          />
          <Route
            path="messages"
            element={
              <div>
                <h2>Messages</h2>
                <p>No messages yet. Get a mutual wag to start chatting! 💬</p>
              </div>
            }
          />
          <Route
            path="settings"
            element={
              <div>
                <h2>Settings</h2>
                <p>Settings page coming soon! ⚙️</p>
              </div>
            }
          />
        </Route>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;