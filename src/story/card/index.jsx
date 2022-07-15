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
  cardIndex,
  className,
  contentElementsOrder,
  fullCardLink,
  headlineLevel,
  headlineStyleSize,
  imageHeight,
  imageLayout,
  imagePosition,
  imageRounded,
  imageWidth,
  imageSets,
  imageForce,
  imageIndex,
  invertTaxonomyAuthor,
  publishingTimeFormat,
  showAuthorImage,
  showAuthorInfo,
  showIcon,
  showPublishingTime,
  showReadMore,
  showRibbon,
  showTag,
  showTaxonomy,
  showSubheadline,
  target,
  taxonomyLevel,
  utm
}) {
  /* Class Names */
  const hasOverlay = imagePosition === 'back';
  const showImage = imagePosition !== 'none';
  const isCard = ['top', 'bottom', 'back'].indexOf(imagePosition) > -1;
  const joinWithSpaces = _.partial(_.join, _, ' ');
  const headlineSize = !_.isUndefined(headlineStyleSize)
    ? headlineStyleSize
    : headlineLevel;

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
    cardIndex,
    contentClasses,
    contentElementsOrder,
    fullCardLink,
    headlineLevel,
    headlineSize,
    imagePosition,
    invertTaxonomyAuthor,
    linkClasses,
    publishingTimeFormat,
    showAuthorImage,
    showAuthorInfo,
    showPublishingTime,
    showRibbon,
    showTag,
    showTaxonomy,
    showSubheadline,
    showReadMore,
    target,
    taxonomyLevel,
    utm
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

Card.defaultProps = {
  target: false,
  contentElementsOrder: [
    'ribbons',
    'publishingTime',
    'taxonomy',
    'index',
    'headline',
    'subheadline',
    'authorInfo',
    'premium',
    'readMore'
  ],
  headlineLevel: 2,
  taxonomyLevel: 3,
  headlineStyleSize: 3,
  imageHeight: 173,
  imageLayout: 'responsive',
  imagePosition: 'top',
  imageRounded: false,
  imageForce: false,
  imageWidth: 307,
  imageIndex: '',
  publishingTimeFormat: 'HH:mm',
  showAuthorImage: false,
  showAuthorInfo: true,
  showIcon: true,
  showPublishingTime: false,
  showRibbon: true,
  showSubheadline: false,
  showTag: false,
  showTaxonomy: true,
  cardIndex: '',
  fullCardLink: false,
  invertTaxonomyAuthor: false,
  className: '',
  showReadMore: false,
  utm: ''
};

export default Card;
