import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ViewableItemSkeleton = () => (
  <div className='d-flex bg-white justify-content-between viewable-item'>
    <div className='d-flex overflow-hidden' style={{ flex: 1 }}>
      <div className='text-right pl-1 viewable-item-rank'>
        <Skeleton width={30} />
      </div>
      <Skeleton width='55%' />
    </div>
    <div className='d-flex mr-2' style={{ width: '6rem' }}>
      <Skeleton width={50} />
    </div>
  </div>
);

export const ViewableListSkeleton = ({ count }) => (
  <div>
    {Array.from({ length: count }).map((_, i) => (
      <ViewableItemSkeleton key={i} />
    ))}
  </div>
);

export const NewRegistersBoxSkeleton = ({ count }) => (
  <div>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className='d-flex justify-content-between'>
        <Skeleton width={110} />
        <Skeleton width={85} />
      </div>
    ))}
  </div>
);

export const MostVisitedSkeleton = ({ count }) => (
  <div className='top-movies-container'>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className='bg-white' style={{ lineHeight: '2rem' }}>
        <div className='d-flex overflow-hidden px-3'>
          <Skeleton width={140} />
        </div>
      </div>
    ))}
  </div>
);
