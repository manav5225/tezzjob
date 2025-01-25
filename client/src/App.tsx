import HomePage from "./components/HomePage";
import "@fontsource/poppins";
import PersonaSelection from "./components/PersonaSelection";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/persona-selection" element={<PersonaSelection />} />
        <Route path="/employee-registration" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
