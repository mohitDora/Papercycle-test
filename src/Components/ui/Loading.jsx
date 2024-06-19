import React from 'react';
import Skeleton from '@mui/material/Skeleton';

function Loading({ num }) {
  return (
    <div className='grid grid-cols-3 gap-4 my-4'>
      {Array.from({ length: num }).map((_, index) => (
        <Skeleton key={index} variant="rectangular" height={60} />
      ))}
    </div>
  );
}

export default Loading;
