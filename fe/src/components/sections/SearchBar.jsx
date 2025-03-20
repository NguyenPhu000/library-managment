const SearchBar = () => {
  return (
    <div className="flex justify-center p-4">
      <input
        type="text"
        placeholder="🔍 Tìm kiếm sách..."
        className="w-96 p-2 rounded-full bg-gray-700 text-white focus:ring-2 focus:ring-lightGreen outline-none"
      />
    </div>
  );
};

export default SearchBar;
