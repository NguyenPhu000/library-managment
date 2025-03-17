import { AuthProvider } from "./AuthContext";
import { CategoryProvider } from "./CategoryContext";
import { BookProvider } from "./BookContext";
// import { UserProvider } from "./UserContext"; // Ví dụ có thêm UserContext
// import { ThemeProvider } from "./ThemeContext"; // Ví dụ có thêm ThemeContext

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <BookProvider>
        <CategoryProvider>{children}</CategoryProvider>
      </BookProvider>
    </AuthProvider>
  );
};

export default AppProviders;
