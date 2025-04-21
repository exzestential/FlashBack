 import React from 'react';

export default function Spinner() {
  return React.createElement(
    'div',
    { className: 'flex justify-center items-center mt-4' },
    React.createElement('div', {
      className: 'h-8 w-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin'
    })
  );
}
