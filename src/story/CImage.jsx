import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { isAmp } from '@cimeco/utils';

// TODO: Mover a UI

/**
 * @param alt
 * @param src
 * @param width
 * @param height
 * @param className
 * @param {string} srcset     Cadena con formato "image1.jpg 300w, image2.jpg 600w". Indica que imagen mostrar basando en el tamaño de la imagen en el html.
 * @param {string} sizes      Cadena con formato "(max-width: 320px) 280px,(max-width: 480px) 440px,800px". Indica un conjunto de condiciones de medios (ej:(max-width: 320px)) e indica qué tamaño de imagen sería mejor elegir (ej:320px).
 * @param fallback
 * @param placeholder
 * @param isAmpOverride
 * @param ampLayout
 * @param caption
 * @param showCaption
 * @param figureClassName
 * @param forceImg
 * @param isPromo
 * @param dataHero
 * @param Importance
 * @param credits
 */
const CImage = ({
  alt,
  src,
  width,
  height,
  className,
  srcset,
  sizes,
  fallback,
  placeholder,
  isAmpOverride = undefined,
  ampLayout = 'responsive',
  caption,
  showCaption,
  figureClassName,
  forceImg,
  isPromo,
  dataHero,
  Importance,
  credits
}) => {
  const { arcSite, requestUri, globalContent } = useFusionContext();
  const properties = getProperties(arcSite);
  const _isAmp = !_.isUndefined(isAmpOverride)
    ? isAmpOverride
    : properties.site.isAlwaysAmp || isAmp(requestUri);
  const fallbackId = _.uniqueId('image-fallback-');
  const addDefaultSrc = (e) => {
    e.target.classList.add('hide');
    document.findElementById(fallbackId).classList.remove('hide');
  };

  return (
    <>
      <figure className={figureClassName}>
        {_isAmp ? (
          <amp-img
            alt={alt}
            class={`block ${className}`}
            src={src || placeholder}
            sizes={sizes}
            srcset={srcset}
            width={width ? _.trim(`${width}`, 'px') : undefined}
            height={height ? _.trim(`${height}`, 'px') : undefined}
            layout={ampLayout}
            data-hero={isPromo || dataHero ? '' : undefined}
          />
        ) : (
          <>
            {forceImg ? (            
              <img
                alt={alt}
                className={`block ${className}`}
                src={src || placeholder}
                sizes={sizes || 'auto'}
                loading={isPromo || Importance ? 'eager' : 'lazy'}
                srcSet={srcset}
                width={width ? `${_.trim(`${width}`, 'px')}px` : undefined}
                data-hero={isPromo || dataHero ? '' : undefined}
                importance={isPromo || Importance ? 'high' : undefined}
                fetchpriority={isPromo || Importance ? "high" : "low"}
                decoding={isPromo || Importance ? "sync" : "async"}
                height={
                  height
                    ? width
                      ? `${_.trim(`${height}`, 'px')}px`
                      : undefined
                    : '100%'
                }
                onError={addDefaultSrc}
              />              
            ) : (         
              <img
                alt={alt}
                className={` block ${className}`}
                src={src || placeholder}
                sizes={sizes || 'auto'}
                loading={isPromo || Importance ? 'eager' : 'lazy'}
                data-src={src}
                data-srcset={srcset}
                width={width ? `${_.trim(`${width}`, 'px')}px` : undefined}
                data-hero={isPromo || dataHero ? '' : undefined}
                importance={isPromo || Importance ? 'high' : undefined}
                fetchpriority={isPromo || Importance ? "high" : "low"}
                decoding={isPromo || Importance ? "sync" : "async"}
                height={
                  height
                    ? width
                      ? `${_.trim(`${height}`, 'px')}px`
                      : undefined
                    : '100%'
                }
                onError={addDefaultSrc}
              />              
            )}
            {fallback ? (
              <div id={fallbackId} className="hide" fallback={true}>
                {fallback}
              </div>
            ) : null}
          </>
        )}
        {showCaption && caption && !_.isEmpty(caption) ? (
          <figcaption className={`${showCaption ? '' : 'hide'}`}>
            {!_.isUndefined(credits) && arcSite === 'via-pais'
              ? caption + ' ' + 'Foto: ' + credits
              : caption}
          </figcaption>
        ) : null}
      </figure>
    </>
  );
};
CImage.defaultProps = {
  alt: '',
  src: undefined,
  className: '',
  ampLayout: 'responsive',
  caption: '',
  fallback: '',
  placeholder: undefined,
  showCaption: true,
  forceImg: false,
  isPromo: false,
  dataHero: false,
  Importance: false
};

CImage.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  srcset: PropTypes.string,
  sizes: PropTypes.string,
  fallback: PropTypes.string,
  placeholder: PropTypes.string,
  isAmpOverride: PropTypes.boolean,
  ampLayout: PropTypes.string,
  caption: PropTypes.string,
  showCaption: PropTypes.bool,
  figureClassName: PropTypes.string,
  forceImg: PropTypes.bool,
  isPromo: PropTypes.bool,
  dataHero: PropTypes.bool,
  Importance: PropTypes.bool
};

export default CImage;
