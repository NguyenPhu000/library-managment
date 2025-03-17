import BookList from "../components/sections/BookList";
import SearchBar from "../components/sections/SearchBar";
import CategoryFilter from "../components/sections/CategoryFilter";
const BookListPage = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <SearchBar />
      <CategoryFilter />
      <BookList />
    </main>
  );
};

export default BookListPage;
