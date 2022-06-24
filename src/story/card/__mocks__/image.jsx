import React from 'react';

function Image(props) {
  return (
    <span className={`image ${props.imageClasses}`}>
      {Object.entries(props).map(([key, value]) => {
        return <span key={key}>{`${key}: ${value}`}</span>;
      })}
    </span>
  );
}

export default Image;
