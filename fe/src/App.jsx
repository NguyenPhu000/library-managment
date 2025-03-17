import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import LibraryHome from "./pages/LibraryHomePage";
import BookListPage from "./pages/BookListPage";
import AppProviders from "./contexts/AppProviders";
const App = () => {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LibraryHome />} />
            <Route path="/books" element={<BookListPage />} />
          </Route>
        </Routes>
      </Router>
    </AppProviders>
  );
};

export default App;
