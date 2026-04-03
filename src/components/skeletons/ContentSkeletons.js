import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const AffinitiesSkeleton = () => (
  <div className='bg-white'>
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className='d-flex justify-content-between'>
        <div className='bd-light row-height col-10'>
          <Skeleton width={120} />
        </div>
        <div className='bd-light row-height col-2 text-right'>
          <Skeleton width={35} />
        </div>
      </div>
    ))}
  </div>
);

export const MovieStatsSkeleton = () => (
  <div className='mt-4'>
    <div className='font-weight-bold mb-1'>Statistics</div>
    <div className='bg-white'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className='d-flex justify-content-between'>
          <div className='bd-light row-height col-9'>
            <Skeleton />
          </div>
          <div className='bd-light row-height col-3 text-right'>
            <Skeleton width={50} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const RankingsSkeleton = () => (
  <div>
    <div className='font-weight-bold mb-1'>
      <Skeleton width={200} />
    </div>
    <div className='bg-white'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className='d-flex justify-content-between'>
          <div className='bd-light row-height col-10'>
            <Skeleton width={130} />
          </div>
          <div className='bd-light row-height col-2 text-right'>
            <Skeleton width={25} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const MovieDetailsSkeleton = () => (
  <div className='movie-page d-flex'>
    <Skeleton width={150} height={220} style={{ marginRight: '1rem', flexShrink: 0 }} />
    <div style={{ flex: 1 }}>
      <div className='d-flex justify-content-between mb-2'>
        <Skeleton width={200} height={20} />
        <Skeleton width={40} height={20} />
      </div>
      <div className='d-flex justify-content-between mb-2'>
        <Skeleton width={160} />
        <Skeleton width={110} />
      </div>
      <Skeleton width={100} />
      <Skeleton width={80} />
      <Skeleton count={3} />
    </div>
  </div>
);

export const CommentsSkeleton = () => (
  <div>
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className='p-2'>
        <Skeleton width={100} />
        <Skeleton count={2} />
      </div>
    ))}
  </div>
);
