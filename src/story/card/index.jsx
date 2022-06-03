import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// TODO: Import from utils
const pushWhen = (arr, cond, item) => {
  const copy = [...arr];
  return (cond && copy.concat(item)) || copy;
};
// TODO: Import from utils
const isPremium = (articleObject) => {
  return !_.isUndefined(articleObject) && !_.isUndefined(articleObject.taxonomy)
    ? !_.isUndefined(_.find(articleObject.taxonomy.tags, { slug: 'exclusivo' }))
    : false;
};

function Card({ story, className, fullCardLink, imagePosition }) {
  const hasOverlay = imagePosition === 'back';
  const isCard = ['top', 'bottom', 'back'].indexOf(imagePosition) > -1;
  const joinWithSpaces = _.partial(_.join, _, ' ');
  const mainClasses = _.flow(
    _.partial(pushWhen, _, true, className),
    _.partial(pushWhen, _, hasOverlay, ['relative', 'has-overlay']),
    _.partial(pushWhen, _, true, isCard ? 'card' : 'media'),
    // TODO: Replace fullcard-link
    _.partial(pushWhen, _, fullCardLink, 'full-card-link'),
    _.partial(pushWhen, _, _.has(story, 'subtype'), _.get(story, 'subtype')),
    _.partial(pushWhen, _, isPremium(story), 'premium'),
    joinWithSpaces
  )(['article']);

  return (
    <article className={`${mainClasses}`}>
      <div
        className={`article-inner ${
          imagePosition === 'back' ? 'no-height' : ''
        }`}
      />
    </article>
  );
}

Card.propTypes = {
  story: PropTypes.object,
  className: PropTypes.string,
  fullCardLink: PropTypes.bool,
  imagePosition: PropTypes.string
};

export default Card;
