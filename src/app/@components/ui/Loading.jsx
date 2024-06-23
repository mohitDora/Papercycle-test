import React from 'react';
import Skeleton from '@mui/material/Skeleton';

function Loading({ num,column }) {
  return (
    <div className={column==2?'grid grid-cols-2 gap-4 my-4':'grid grid-cols-3 gap-4 my-4'}>
      {Array.from({ length: num }).map((_, index) => (
        <Skeleton key={index} variant="rectangular" height={60} />
      ))}
    </div>
  );
}

export default Loading;
