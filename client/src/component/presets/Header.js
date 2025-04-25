import React from 'react';

function Header({ title }) {
  return React.createElement(
    'h1',
    { className: 'text-3xl font-bold text-blue-600 mb-4 font-albert-sans' },
    title
  );
}

export default Header;
