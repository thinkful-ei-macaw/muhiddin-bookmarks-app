import './index.css';
import events from './events';
import api from './api';
import store from './store';
import bookmarkList from './bookmark-list';

const main = function () {
  events();  
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