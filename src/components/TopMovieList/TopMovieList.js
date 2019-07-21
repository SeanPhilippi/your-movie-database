import React, { PureComponent } from 'react';
// import ReactPaginate from 'react-paginate';

import './TopMovieList.css';

class TopMovieList extends PureComponent {
  render() {
    return (
      <div className="top-movies-container">
        <div className="top-movies">
          <div>
            <div className="card-title1">
              Top Movie List
            </div>
            <div className="pagination d-flex justify-content-between w-80">
              <div>
                1-25
              </div>
              <div>
                26-50
              </div>
              <div>
                51-75
              </div>
              <div>
                76-100
              </div>
              <div>
                101-125
              </div>
              <div>
                126-150
              </div>
              <div>
                Next
              </div>
            </div>
            <div className="list-element">
              <div className="list-item-element d-flex justify-content-between">
                <div>
                  +
                </div>
                <div>
                  1.
                </div>
                <div>
                  Pulp Fiction
                </div>
                <div>
                  9545954 pts
                </div>
                <div>
                  IMDb
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TopMovieList;