import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import loginScreen from "./screens/LoginScreen";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
