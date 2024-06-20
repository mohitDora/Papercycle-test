import { Box } from '@mui/material';
import React from 'react';

function Heading({ title }) {
  const highlightWord = 'papercycle.in';

  // Split the title by spaces to handle words individually
  const words = title.split(' ');

  return (
    <>
    <Box className='text-4xl font-extrabold tracking-tight lg:text-5xl py-12'>
      {words.map((word, index) => (
        <span
          key={index}
          className={word.toLowerCase() === highlightWord.toLowerCase() ? 'text-secondary' : 'text-black'}
        >
          {word}
          {index < words.length - 1 && ' '} {/* Add space between words */}
        </span>
      ))}
    </Box>
    </>
  );
}

export default Heading;
