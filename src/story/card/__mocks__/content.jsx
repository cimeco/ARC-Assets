import React from 'react';

function Content({ contentClasses, linkClasses }) {
  return (
    <span className={`content ${contentClasses}`}>
      <span className={linkClasses}>Link</span>
    </span>
  );
}

export default Content;
