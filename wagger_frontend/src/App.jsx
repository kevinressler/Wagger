import React, { useState } from "react";
import LoginPage from "./LoginPage";

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <div style={{ padding: "2rem", color: "#e5e7eb", background: "#020617", minHeight: "100vh" }}>
      <h2>Welcome, {user.email} 👋</h2>
      <p>Ready to swipe on some pups?</p>
    </div>
  );
}

export default App;