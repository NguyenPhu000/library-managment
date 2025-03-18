import { AuthProvider } from "./AuthContext";
import { CategoryProvider } from "./CategoryContext";
import { BookProvider } from "./BookContext";
import { MemberProvider } from "./MemberContext";
const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <MemberProvider>
        <BookProvider>
          <CategoryProvider>{children}</CategoryProvider>
        </BookProvider>
      </MemberProvider>
    </AuthProvider>
  );
};

export default AppProviders;
