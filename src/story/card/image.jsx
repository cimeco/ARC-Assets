import { useFusionContext } from 'fusion:context';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {
  getUrl,
  isPremium,
  isVideo,
} from '@cimeco/utils/src/story';
import { getUrlBySite } from '@cimeco/utils';
import ConditionalWrap from '@cimeco/ui/src/conditional-wrap';
import UIImage from '../image';

function Image({
  story,
  imageHeight,
  imageWidth,
  showAuthorImage,
  target,
  utm
}) {
  const { arcSite, contextPath } = useFusionContext();
  const websiteBlank = story.canonical_website;
  if (websiteBlank !== arcSite) {
    target = true;
  }

  const image = showAuthorImage ? author.image : promoItemsBasic;
  const imageCaption = showAuthorImage ? author.name : promoItemsBasic.subtitle;

  let url = getUrlBySite(contextPath, getUrl(story, arcSite, true), arcSite);
  if (utm) {
    url += utm;
  }

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
  story: PropTypes.object.isRequired,
  imageForce: PropTypes.bool,
  imageHeight: PropTypes.number,
  imageIndex: PropTypes.number,
  imageLayout: PropTypes.oneOf(['responsive', 'fixed-height', 'fixed']),
  imagePosition: PropTypes.oneOf([
    'top',
    'right',
    'bottom',
    'left',
    'back',
    'none'
  ]),
  imageRounded: PropTypes.bool,
  imageSets: PropTypes.object,
  imageSetSizes: PropTypes.string,
  imageWidth: PropTypes.number,
  isAmp: PropTypes.bool,
  showAuthorImage: PropTypes.bool,
  showIcon: PropTypes.bool,
  showImage: PropTypes.bool,
  srcset: PropTypes.string,
  target: PropTypes.string,
  utm: PropTypes.string
};

Image.defaultProps = {
  showIcon: false
};

export default Image;
