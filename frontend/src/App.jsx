import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import "./styles/sidebar.css";
function App() {
  return (
    <Router>
      {/* <Header /> */}

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route
              path="/"
              element={<h1 className="text-2xl font-bold">Dashboard</h1>}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
