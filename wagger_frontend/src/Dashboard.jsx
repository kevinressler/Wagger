import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard({ user }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="logo">🐶 Wagger</div>
        <div className="user-pill">Logged in as {user?.email || "You"}</div>
      </div>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <h2>Navigation</h2>
          <ul>
            <li>
              <Link
                to="/dashboard"
                className={isActive("/dashboard") ? "active" : ""}
              >
                Find Dogs
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add-dog"
                className={isActive("/dashboard/add-dog") ? "active" : ""}
              >
                Add Dog
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/matches"
                className={isActive("/dashboard/matches") ? "active" : ""}
              >
                Your Matches
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/messages"
                className={isActive("/dashboard/messages") ? "active" : ""}
              >
                Messages
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/settings"
                className={isActive("/dashboard/settings") ? "active" : ""}
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

