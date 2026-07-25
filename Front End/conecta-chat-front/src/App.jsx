import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <main>
        <h1 className="text-4xl font-bold text-blue-600">
          Tailwind funcionando!
        </h1>
      </main>
    </div>
  );
}

export default App;
