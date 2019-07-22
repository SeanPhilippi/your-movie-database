import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

class PageNotFound extends PureComponent {
  render() {
    return (
      <div className="page-not-found d-flex align-items-center justify-content-center">
        <div className="img-404">
        </div>
        <div className="page-not-found-text pb-4">
          <div className="font-weight-bold">Page Not Found</div>
          <p style={{ fontSize: '1rem' }}>
            There is nothing here.  Click <Link to="/"><b>here</b></Link> to return to the home page.
          </p>
        </div>
      </div>
    )
  }
}

export default PageNotFound;