import React from 'react';

const pages = [1, 2, 3, 4];

const PageSettings = ({
  setCurrentPage,
  moviesPerPage,
  handleMoviesPerPage
}) => (
  <div className="d-flex justify-content-between page-settings">
    <div>
      <label htmlFor="movies-per-page">
        Movies Per Page: &nbsp;
      </label>
      <select
        id="movies-per-page"
        value={ moviesPerPage }
        onChange={ handleMoviesPerPage }
        name="movies-per-page"
      >
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div className="d-flex justify-content-end">
      {
        pages.map((page, idx) => (
          <div className="mr-2">
            <button
              key={ idx }
              className="pages"
              onClick={ setCurrentPage }
              name={ page }
            >
              { page }
            </button>
          </div>
          )
        )
      }
    </div>
  </div>
);

export default PageSettings;