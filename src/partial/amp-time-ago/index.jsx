import React from 'react';
import PropTypes from 'prop-types';

function AmpTimeAgo({ datetime }) {
  return (
    <amp-timeago
      datetime={datetime}
      layout="responsive"
      locale="es"
      width="160"
      height="20"
    >
      {datetime}
    </amp-timeago>
  );
}

AmpTimeAgo.propTypes = {
  datetime: PropTypes.string
};

export default AmpTimeAgo;
