import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import CreateCustomer from "./pages/createCustomer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div className="mt-16">Home </div>} />
        <Route path="/createCustomer" element={<CreateCustomer />} />
      </Routes>
    </Router>
  );
}

export default App;
