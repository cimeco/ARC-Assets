import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {
  getImagePathData,
  getUrl,
  isPremium,
  resizeImage
} from '@cimeco/utils/src/story';
import { getImage, getUrlBySite } from '@cimeco/utils';
import CImage from '../CImage';

const Image = ({
  story,
  imageHeight,
  imageLayout,
  imageRounded,
  imageWidth,
  showAuthorImage,
  showImage,
  imageForce,
  imageSets,
  imageIndex,
  target,
  utm
}) => {
  const { arcSite, contextPath, deployment } = useFusionContext();
  const properties = getProperties(arcSite);
  const websiteBlank = story.canonical_website;
  if (websiteBlank !== arcSite) {
    target = true;
  }

  const getImageData = (object) => {
    const defaultImage = object.showAuthor
      ? undefined
      : {
          url: getImage(
            arcSite,
            contextPath,
            deployment,
            properties.site.placeholder || '/images/placeholder.png'
          )
        };
    return {
      image: _.get(object.path, object.imagePath),
      imageCaption: _.get(object.path, object.captionPath),
      imageCredits: _.get(object.path, object.creditPath),
      defaultImage
    };
  };
  const { image, imageCaption, defaultImage, imageCredits } = _.flow([
    getImagePathData,
    getImageData
  ])(story, showAuthorImage);

  const imageResizedUrl =
    // eslint-disable-next-line no-nested-ternary
    !_.isNil(image) &&
    !_.isNil(image.url) &&
    !image.url.includes('sites/default/files')
      ? resizeImage(
          image,
          {
            width: imageWidth,
            height: showAuthorImage ? imageWidth : imageHeight
          },
          properties.services.thumbor.url
        )
      : !_.isNil(image) && !_.isNil(image.url)
      ? image.url
      : (!_.isNil(defaultImage) && defaultImage.url) || '';
  let srcset = '';
  let sizes = '';
  let _imageSets = imageSets;
  if (_imageSets) {
    if (!imageSets['0'])
      _imageSets = {
        ...imageSets,
        0: { width: imageWidth, height: imageHeight }
      };
    Object.keys(_imageSets)
      .sort()
      .reverse()
      .forEach((breakpoint) => {
        const url =
          // eslint-disable-next-line no-nested-ternary
          !_.isNil(image) &&
          !_.isNil(image.url) &&
          !image.url.includes('sites/default/files')
            ? resizeImage(
                image,
                {
                  width: _imageSets[breakpoint].width,
                  height: showAuthorImage
                    ? _imageSets[breakpoint].width
                    : _imageSets[breakpoint].height
                },
                properties.services.thumbor.url
              )
            : !_.isNil(image) && !_.isNil(image.url)
            ? image.url
            : (!_.isNil(defaultImage) && defaultImage.url) || '';

        srcset += srcset.includes(`${_imageSets[breakpoint].width}w`)
          ? ''
          : `${url} ${_imageSets[breakpoint].width}w, `;
        sizes += `(min-width: ${breakpoint}px) ${_imageSets[breakpoint].width}px, `;
      });
    srcset = `${srcset.replace(/,(?=\s*$)/, '')}`;
    sizes += `${imageWidth}px`;
  }

  let url = getUrlBySite(contextPath, getUrl(story, arcSite, true), arcSite);
  if (utm) {
    url = url + utm;
  }

  return (
    <div
      className={`article-image ${
        _.isNil(image) || (_.isNil(image.url) ? 'no-image' : '')
      }`}
    >
      {isPremium(story) ? <div className="premium-article-tag" /> : null}
      {showImage && !_.isNil(imageResizedUrl) && !_.isEmpty(imageResizedUrl) && (
        <a
          href={url}
          title={imageCaption}
          target={
            // eslint-disable-next-line camelcase
            (story.related_content?.redirect?.length > 0 && '_blank') || target
              ? '_blank'
              : undefined
          }
          rel={
            story.subtype === 'branded_content' ||
            story.subtype === 'lvi_articulo_patrocinado'
              ? 'sponsored'
              : undefined
          }
        >
          <CImage
            alt={imageCaption}
            className={imageRounded ? 'circle' : ''}
            src={imageResizedUrl}
            srcset={imageSets ? srcset : undefined}
            sizes={sizes}
            placeholder={defaultImage && defaultImage.url}
            width={imageWidth}
            ampLayout={imageLayout}
            dataHero={imageIndex === 0}
            Importance={imageIndex === 0}
            showCaption={false}
            caption={imageCaption}
            forceImg={imageForce}
            height={showAuthorImage ? imageWidth : imageHeight}
            credits={imageCredits}
          />
        </a>
      )}
    </div>
  );
};

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
