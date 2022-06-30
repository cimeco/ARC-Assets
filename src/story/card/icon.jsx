import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CImage from '../CImage';

const getIconType = (type) => {
  const icon = (typeIcon) => {
    return (
      <span className="indicator is-text-overlay has-text-white is-size-6">
        <i className={`icons ${typeIcon}`} />
      </span>
    );
  };

  const types = {
    video: icon(type),
    gallery: icon(type),
    podcast: icon(type),
    opinion: (
      <CImage
        src="/images/quotes.png"
        alt="Opinión"
        width="49"
        height="38"
        ampLayout="fixed"
      />
    ),
    default: <Fragment />
  };

  return types[type] || types.default;
};

function Icon({ story, showIcon }) {
  return (
    <Fragment>
      {showIcon && (
        <div className="article-icon">
          {showIcon && getIconType(story.subtype || story.type)}
        </div>
      )}
    </Fragment>
  );
}

Icon.propTypes = {
  story: PropTypes.object,
  contextPath: PropTypes.string,
  deployment: PropTypes.func,
  showIcon: PropTypes.boolean,
  isAmp: PropTypes.boolean
};

export default Icon;
