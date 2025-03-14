import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/layouts/Layout";
import LibraryHome from "./pages/LibraryHome";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path="/" element={<LibraryHome />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
