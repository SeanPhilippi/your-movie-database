import React, { PureComponent } from 'react';

class MostVisitedList extends PureComponent {

  dummyData = [

  ];


  render() {
    return (
      <div className="top-movies-container">
        <div className="top-movies">
          <div>
            <div className="card-title1">
              Most Visited Lists
            </div>
            <div className="list-element">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MostVisitedList;