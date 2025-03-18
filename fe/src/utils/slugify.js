// Hàm tạo slug từ book_id
export const generateSlug = (book_id) => `book-${book_id}`;

// Hàm lấy book_id từ slug
export const getBookIdFromSlug = (slug) => {
  const match = slug.match(/^book-(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
};
