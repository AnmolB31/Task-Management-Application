import './App.css';
import { useState } from 'react';
import { Home } from './Components/Home/Home';
import DarkModeToggle from "react-dark-mode-toggle";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className={`App  ${isDarkMode ? "Dark" : "white"}`}>
      <div className='toggle'>
      <DarkModeToggle
        onChange={setIsDarkMode}
        checked={isDarkMode}
        size={60}
      />
      </div>
      <Home isDarkMode={isDarkMode}/>
    </div>
  );
}

export default App;
