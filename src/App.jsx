import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage.jsx";
import CallPage from "./pages/CallPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminPage />} />
      <Route path="/call" element={<CallPage />} />
    </Routes>
  );
}
