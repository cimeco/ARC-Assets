import React from 'react';

function Icon(props) {
  return (
    <span className="icon">
      {Object.entries(props).map(([key, value]) => {
        return <span key={key}>Icon: {`${key}: ${value}`}</span>;
      })}
    </span>
  );
}

export default Icon;
