import $ from 'jquery';

import store from './store';
import api from './api';
import getStarRating from './rating';

const generateBookmark = function (bookmark) {  
  return (
    `<li class='bookmark-item' data-item-id="${bookmark.id}">
      <div class="showing">
      <h3 class='bookmark-item-title'>
        <a href=${bookmark.url} target='_blank' rel='noopener noreferrer'>
           ${bookmark.title}
         </a>
      </h3>
        <div class="rating">${getStarRating(bookmark.rating)}</div>
      </div>
      <div id="non-showing" class="hidden">
      <p class='bookmark-item-description'>
        ${bookmark.desc}
      </p>
      <!--<input type='submit' value='Edit' id='js-item-edit'> -->
      <input type='button' value='Delete' id='js-item-delete'>
      </div>
    </li>`
  );
};

const generateBookmarkListString = function (bookmarkList) {
  const bookmarks = bookmarkList.map((bookmark) => generateBookmark(bookmark));
  return bookmarks.join('');
};

const render = function () {
  let bookmarks = [...store.bookmarks];
  // render the bookmark list in the DOM
  const bookmarkListBookmarksString = generateBookmarkListString(bookmarks);
  // insert that HTML into the DOM
  $('.js-bookmarks-list').html(bookmarkListBookmarksString);
};

const handleNewBookmarkSubmit = function () {
  $('#js-bookmark-list-form').submit(function (event) {
    event.preventDefault();
    const newBookmarkTitle = $('#title').val();
    $('#title').val('');
    const newBookmarkUrl = $('#url').val();
    $('#url').val('');
    const newBookmarkDescription = $('#description').val();
    $('#description').val('');
    const newBookmarkRating = $('#rating').val();
    $('#rating').val('');
    let newBookmark = { title: newBookmarkTitle, url: newBookmarkUrl, desc: newBookmarkDescription, 
      rating: newBookmarkRating };
    api.createBookmark(newBookmark)
      .then(res => res.json())
      .then((newB) => {
        store.addBookmark(newB);
        render();
      });
    $('#bookmark-form').addClass('hidden');
    $('.bookmarks-list').removeClass('hidden');
  });
};

const getBookmarkId = function (bookmark) {
  return $(bookmark)
    .closest('.bookmark-item')
    .data('item-id');
};

const handleDeleteBookmark = function () {
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-bookmarks-list').on('click', '#js-item-delete', event => {
    // get the index of the item in store.items
    const id = getBookmarkId(event.currentTarget);
    // delete the item
    api.deleteBookmark(id)
      .then(res => res.json())
      .then(() => {
        store.findAndDelete(id);
        render();
      });
  });
};

const handleEditBookmark= function () {
  $('.js-bookmarks-list').on('submit', '.js-item-edit', event => {
    event.preventDefault();
    const id = getBookmarkId(event.currentTarget);
    const bTitle = $(event.currentTarget).find('#title').val();
    const bUrl = $(event.currentTarget).find('#url').val();
    const bDesc = $(event.currentTarget).find('#description').val();
    const bRating = $(event.currentTarget).find('#rating').val();
    api.updateItem(id, { title: bTitle, url: bUrl, desc: bDesc, rating: bRating })
      .then(() => {
        store.findAndUpdate(id, { title: bTitle, url: bUrl, desc: bDesc, rating: bRating });
        render();
      });
  });
};




const bindEventListeners = function () {
  handleNewBookmarkSubmit();
  handleDeleteBookmark();
  handleEditBookmark();
};
// This object contains the only exposed methods from this module:
export default {
  getBookmarkId,
  render,
  bindEventListeners
};