import $ from 'jquery';

import 'normalize.css';
import './index.css';

import api from './api';
import store from './store';
import bookmarkList from './bookmark-list';
// import renderBookmarkForm from './bookmark-form';

const main = function () {

  $('.bookmark-list-button').click(() => {
    if($('#bookmark-form').hasClass('hidden')){
      $('.bookmarks-list').toggleClass('hidden');
    } else {
      $('#bookmark-form').addClass('hidden');
      $('.bookmarks-list').toggleClass('hidden');
    }
  });

  $('.add-bookmark-button').click((e) => {
    e.preventDefault();
    if($('.bookmarks-list').hasClass('hidden')) {
      $('#bookmark-form').toggleClass('hidden');
    } else {
      $('.bookmarks-list').addClass('hidden');
      $('#bookmark-form').toggleClass('hidden');
    }
  });

  $('.bookmarks-list').on('click', '.bookmark-item', (e) => {
    e.preventDefault();
    const id = bookmarkList.getBookmarkId(e.currentTarget);
    $(`[data-item-id=${id}]`).children('#non-showing').slideToggle(600, 'linear');
  });

  $('#cancel').click((e) => {
    e.preventDefault();
    $('#bookmark-form').toggleClass('hidden');
  });
  
  api.getBookmarks()
    .then(res => res.json())
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      bookmarkList.render();
    });
 
  bookmarkList.bindEventListeners();
  bookmarkList.render();
};

$(main);