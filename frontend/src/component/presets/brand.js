import React from 'react';

function Brand({ name = "MyBrand", tagline = "Empowering the future", logoUrl = null }) {
  const brandElements = [];

  if (logoUrl) {
    brandElements.push(
      React.createElement('img', {
        src: logoUrl,
        alt: `${name} logo`,
        className: 'h-12 w-12 mr-2',
        key: 'logo'
      })
    );
  }

  brandElements.push(
    React.createElement('div', { key: 'text' }, [
      React.createElement('h1', {
        className: 'text-2xl font-bold text-blue-600 font-ubuntu',
        key: 'title'
      }, name),
      React.createElement('p', {
        className: 'text-sm text-gray-500 font-ubuntu',
        key: 'tagline'
      }, tagline)
    ])
  );

  return React.createElement(
    'div',
    { className: 'flex items-center space-x-3' },
    brandElements
  );
}

export default Brand;

