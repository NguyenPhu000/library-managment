import { AuthProvider } from "./AuthContext";
import { CategoryProvider } from "./CategoryContext";
import { BookProvider } from "./BookContext";
import { MemberProvider } from "./MemberContext";
import { LoanProvider } from "./LoanContext";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <MemberProvider>
        <CategoryProvider>
          <BookProvider>
            <LoanProvider>{children}</LoanProvider>
          </BookProvider>
        </CategoryProvider>
      </MemberProvider>
    </AuthProvider>
  );
};

export default AppProviders;
