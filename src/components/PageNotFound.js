import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNotFound = () => (
  <div className="page-not-found w-100 d-flex align-items-center justify-content-center" style={{ flex: 1 }}>
    <div className="img-404">
    </div>
    <div className="page-not-found-text pb-4">
      <div className="font-weight-bold">Page Not Found</div>
      <p style={{ fontSize: '1rem' }}>
        There is nothing here.  Click <NavLink className="link" to="/"><b>here</b></NavLink> to return to the home page.
      </p>
    </div>
  </div>
);


export default PageNotFound;