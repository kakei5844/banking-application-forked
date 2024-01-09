import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreditCardFeature from "./pages/CreditCardFeature";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/credit-cards' element={<CreditCardFeature />} />
      </Routes>
    </div>
  );
}

export default App;
