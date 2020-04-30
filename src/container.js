
const container = () => {
  return(
    `<div id='container'>
    <header>
    <h1>Bookmarks App</h1>
  </header>
  <main>
    <div id="js-bookmarks-list">
      <input type="button" value="Bookmark List" name="bookmark-list-button" class="bookmark-list-button">
      <input type="button" value="Add Bookmark" name="add-bookmark-button" class="add-bookmark-button">
    </div>

    <h3>Your bookmarks</h3>
    <ul class="bookmarks-list js-bookmarks-list">
    </ul>
    
    <div id='bookmark-form' class="hidden">
      <form id='js-bookmark-list-form'>
        <label for='title'> Title </label>
        <input
          type='text'
          name='title'
          id='title'
          placeholder='Great website!'
          required
        />
        <label for='url'> URL </label>
        <input
          type='url'
          name='url'
          id='url'
          placeholder='https://www.great-website.com/'
          required
        />
        <label for='description'>
          Description
        </label>
        <textarea
          name='description'
          id='description'
        /></textarea>
        <label for='rating'> Rating </label>
        <input
          type='number'
          name='rating'
          id='rating'
          defaultValue='1'
          min='1'
          max='5'
          required
        >
        <input type="button" id="cancel" value="Cancel">
        <input type="submit" id="submit" value="Submit">
    </form>
    </div>
  </main>
  <footer><a href="https://github.com/muhiddinsgithub" target="_blank" rel="noopener noreferrer">muhiddinsgithub</a></footer>
  </div>
  `
  );
}

export default container;