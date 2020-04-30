import $ from 'jquery';
import container from './container';
import bookmarkList from './bookmark-list';

const events = () => {
  
  $('body').html(container);

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

};

export default events;