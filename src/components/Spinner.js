import React from 'react';
import spinner from '../images/spinner.svg';

const Spinner = () => (
  <div>
    <img src={spinner} className='m-auto d-block' alt='Loading...' />
  </div>
);

export default Spinner;
