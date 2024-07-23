import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {
  isPremium,
  isVideo,
} from '@cimeco/utils/src/story';
import ConditionalWrap from '@cimeco/ui/src/conditional-wrap';
import UIImage from '../image';

function Image({
  story,
  imageHeight,
  imageWidth,
  showAuthorImage,
  isImportant,
  rel,
  targetBlank,
  url,
}) {
  const {
    headlines: { basic: headlineBasic } = { basic: "" },
    promo_items: { basic: promoItemsBasic } = {
      basic: { subtitle: undefined, credits: { by: [] } },
    },
  } = story;

  const author = story.credits?.by?.length > 0 ? story.credits.by[0] : {};

  const defaultCaption = headlineBasic;
  const image = showAuthorImage ? author.image : promoItemsBasic;
  const imageCaption = showAuthorImage ? author.name : promoItemsBasic.subtitle;

  const imageCredits = showAuthorImage
    ? ""
    : (promoItemsBasic.credits?.by?.length > 0 &&
        promoItemsBasic.credits.by[0].name) ||
      (promoItemsBasic.credits?.affilation?.length > 0 &&
        promoItemsBasic.credits.affilation[0].name);

  return (
    <div
      className={`article-image ${
        _.isNil(image) || (_.isNil(image.url) ? 'no-image' : '')
      }`}
    >
      {isPremium(story) ? <div className="premium-article-tag" /> : null}
      {isVideo(story) ? <div className="video-article-tag" /> : null}
      {image?.url ? (
        <ConditionalWrap
          condition={targetBlank}
          wrap={(children) => (
              <a
                href={url}
                title={imageCaption || defaultCaption}
                rel={`noreferrer ${rel}`}
                target="_blank"
              >
                {children}
              </a>
            )}
          wrapElse={(children) => (
              <a href={url} title={imageCaption || defaultCaption} rel={rel}>
                {children}
              </a>
            )}
        >
          <UIImage
            alt={imageCaption || defaultCaption}
            ansImage={image}
            width={imageWidth}
            height={imageHeight}
            credits={imageCredits}
            data-hero={isImportant ? "" : undefined}
            loading={isImportant ? "eager" : "lazy"}
            importance={isImportant ? "high" : undefined}
            fetchpriority={isImportant ? "high" : "low"}
            decoding={isImportant ? "sync" : "async"}
            resizedOptions={{
              quality: 75,
              smart: true,
            }}
          />
        </ConditionalWrap>
      ) : null}
    </div>
  );
}

Image.propTypes = {
  imageForce: PropTypes.bool,
  imageHeight: PropTypes.number,
  imageSets: PropTypes.object,
  imageWidth: PropTypes.number,
  isImportant: PropTypes.bool,
  rel: PropTypes.string,
  showAuthorImage: PropTypes.bool,
  showVideo: PropTypes.bool.tag({
    defaultValue: false,
  }),
  story: PropTypes.object,
  targetBlank: PropTypes.bool,
  url: PropTypes.string,
};

export default Image;
