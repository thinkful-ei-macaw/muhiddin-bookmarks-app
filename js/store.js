const bookmarks = [];
const filtered = [];

const findById = function (id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const filterByRating = function(ratingToFilter) {
  return this.bookmarks.filter(currentBookmark => currentBookmark.rating >= ratingToFilter);
};

const addBookmark = function (bookmark) {
  this.bookmarks.push(bookmark);
};

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

const findAndUpdate = function (id, newData) {
  const currentBookmark = this.findById(id);
  Object.assign(currentBookmark, newData);
};

export default {
  bookmarks,
  findById,
  filterByRating,
  addBookmark,
  findAndDelete,
  findAndUpdate
};