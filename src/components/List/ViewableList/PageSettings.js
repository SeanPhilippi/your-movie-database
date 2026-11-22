import React from 'react';
import PropTypes from 'prop-types';

// current page just shows as plain text instead of a button, so grab a
// window of 6 numbers (5 clickable + current) around wherever you are,
// and always keep the first/last page visible too. if there's only a
// handful of pages total, skip all this and just show them all
const WINDOW_SIZE = 6;

const getVisiblePages = (pages, currentPage) => {
  const numOfPages = pages.length;
  if (numOfPages <= WINDOW_SIZE) return pages;

  let start = currentPage - 2;
  let end = start + WINDOW_SIZE - 1;
  if (start < 1) {
    end += 1 - start;
    start = 1;
  }
  if (end > numOfPages) {
    start -= end - numOfPages;
    end = numOfPages;
  }
  start = Math.max(start, 1);

  const visible = [];
  if (start > 1) {
    visible.push(1);
    if (start > 2) visible.push('...');
  }
  for (let i = start; i <= end; i++) visible.push(i);
  if (end < numOfPages) {
    if (end < numOfPages - 1) visible.push('...');
    visible.push(numOfPages);
  }
  return visible;
};

const PageSettings = ({
  setCurrentPage,
  pages,
  currentPage,
  moviesPerPage,
  handleMoviesPerPage,
}) => (
  <div className='d-flex justify-content-between page-settings'>
    <div>
      <label htmlFor='movies-per-page'>Movies Per Page: &nbsp;</label>
      <select
        id='movies-per-page'
        value={moviesPerPage}
        onChange={handleMoviesPerPage}
        name='movies-per-page'
      >
        <option value='20'>20</option>
        <option value='25'>25</option>
        <option value='30'>30</option>
        <option value='50'>50</option>
        <option value='100'>100</option>
      </select>
    </div>
    <div className='d-flex justify-content-end'>
      {getVisiblePages(pages, currentPage).map((page, idx) => {
        if (page === '...') {
          return (
            <div className='mr-2 pages-ellipsis' key={`dots-${idx}`}>
              ...
            </div>
          );
        }
        if (page === currentPage) {
          return (
            <div className='mr-2 pages-current' key={`${page}-${idx}`}>
              {page}
            </div>
          );
        }
        return (
          <div className='mr-2' key={`${page}-${idx}`}>
            <button className='pages' onClick={setCurrentPage} name={page}>
              {page}
            </button>
          </div>
        );
      })}
    </div>
  </div>
);

PageSettings.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  moviesPerPage: PropTypes.number.isRequired,
  handleMoviesPerPage: PropTypes.func.isRequired,
};

export default PageSettings;
