import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Content from './content.jsx';
import Icon from './icon.jsx';
import Image from './image.jsx';
import { pushWhen } from '@cimeco/utils';
import { isPremium } from '@cimeco/utils/src/story';

function Card({
  story,
  className,
  fullCardLink,
  imageForce,
  imageHeight,
  imageIndex,
  imageLayout,
  imagePosition,
  imageRounded,
  imageWidth,
  imageSets,
  showAuthorImage,
  showImage,
  utm,
  showIcon
}) {
  /* Class Names */
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

  const contentClasses = _.flow(
    _.partial(pushWhen, _, hasOverlay, ['absolute', 'bottom-0', 'white']),
    _.partial(pushWhen, _, true, isCard ? 'card-content' : 'media-content'),
    joinWithSpaces
  )([]);

  const linkClasses = imagePosition === 'back' ? 'white' : '';

  const imageClasses = _.flow(
    _.partial(
      pushWhen,
      _,
      true,
      isCard ? 'card-image' : `media-${imagePosition}`
    ),
    joinWithSpaces
  )(['article-image']);

  /* Partials properties */
  const contentProperties = {
    story,
    contentClasses,
    linkClasses
  };

  const imageProperties = {
    story,
    imageClasses,
    imageForce,
    imageHeight,
    imageIndex,
    imageLayout,
    imagePosition,
    imageRounded,
    imageWidth,
    imageSets,
    showAuthorImage,
    showImage,
    utm
  };

  const iconProperties = {
    story,
    showIcon
  };

  /* Partials */
  const partials = {
    image: <Image {...imageProperties} />,
    content: <Content {...contentProperties} />,
    icon: <Icon {...iconProperties} />
  };

  const orderedPartials =
    ['right', 'bottom'].indexOf(imagePosition) > -1
      ? ['content', 'image', 'icon']
      : ['image', 'content', 'icon'];

  return (
    <article className={`${mainClasses}`}>
      <div
        className={`article-inner ${
          imagePosition === 'back' ? 'no-height' : ''
        }`}
      >
        {isPremium(story) ? <div className="premium-article-tag" /> : null}
        {orderedPartials.map((item) => {
          return <Fragment key={item}>{partials[item]}</Fragment>;
        })}
      </div>
    </article>
  );
}

Card.propTypes = {
  story: PropTypes.object,
  className: PropTypes.string,
  ...Content.propTypes,
  ...Image.propTypes,
  ...Icon.propTypes
};

export default Card;
