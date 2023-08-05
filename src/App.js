import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home </div>} />
        <Route path="/signup" element={<div>sign in</div>} />
      </Routes>
    </Router>
  );
}

export default App;
