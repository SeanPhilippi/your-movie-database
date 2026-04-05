import React from 'react';
import MostVisited from './MostVisited';
import CardWrapper from './HOCs/CardWrapper';

const MostVisitedPage = () => (
  <div className='d-flex border-0 justify-content-center w-100' style={{ flex: 1 }}>
    <div className='inner-container mx-4'>
      <div className='bg-white pt-2 col'>
        <CardWrapper
          title='most visited lists'
          icon='shoe-prints'
          rotate={30}
          color='tan'
        >
          <MostVisited fullPage num={50} />
        </CardWrapper>
      </div>
    </div>
  </div>
);

export default MostVisitedPage;
