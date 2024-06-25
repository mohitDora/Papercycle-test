import { Box } from '@mui/material';
import React from 'react';

function Heading({ title }) {
  const highlightWord = 'papercycle.in';
  const words = title.split(' ');

  return (
    <>
    <Box className='text-4xl font-bold tracking-tight lg:text-4xl py-12'>
      {words.map((word, index) => (
        <span
          key={index}
          className={word.toLowerCase() === highlightWord.toLowerCase() ? 'text-secondary' : 'text-black'}
        >
          {word}
          {index < words.length - 1 && ' '}
        </span>
      ))}
    </Box>
    </>
  );
}

export default Heading;
