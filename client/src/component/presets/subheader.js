import React from 'react';

function PreHeader({ text = "This is a pre-header", logoUrl = null }) {
  const preHeaderElements = [];

  if (logoUrl) {
    preHeaderElements.push(
      React.createElement('img', {
        src: logoUrl,
        alt: 'Logo',
        className: 'h-8 w-8 mr-2',
        key: 'logo'
      })
    );
  }

  preHeaderElements.push(
    React.createElement('div', { key: 'text' }, [
      React.createElement('h2', {
        className: 'text-lg font-bold text-gray-800 font-futura',
        key: 'text'
      }, text),
    ])
  );

  return React.createElement(
    'div',
    { className: 'flex items-center space-x-3 p-3 bg-gray-100' },
    preHeaderElements
  );
}

export default PreHeader;
