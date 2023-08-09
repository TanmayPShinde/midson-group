import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/layout/navbar";
import CreateCustomer from "./pages/createCustomer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div className="ms-12 mt-16">Home </div>} />
        <Route path="/createCustomer" element={<CreateCustomer />} />
        <Route
          path="/createGroup"
          element={<div className="ms-12 mt-16">New Group </div>}
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
