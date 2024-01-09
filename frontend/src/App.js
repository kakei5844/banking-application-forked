import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="registration" element={<RegistrationPage />} />
      <Route path="home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
