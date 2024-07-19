import React from "react";
import PropTypes from "prop-types";
import { useFusionContext } from "fusion:context";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import getProperties from "fusion:properties";
import formatSrc from "@cimeco/utils/src/story/formatImageResizerSrc";
import imageANSToImageSrc from "@cimeco/utils/src/story/imageAnsToImageSrc";
import calculateWidthAndHeight from "@cimeco/utils/src/story/calculateWidthAndHeight";

function Image({
  alt,
  ansImage,
  aspectRatio,
  caption,
  className,
  credits,
  loading,
  src,
  resizedOptions,
  resizerURL,
  responsiveImages,
  showCaption,
  width,
  height,
  sizes,
  figureClassName,
  ...rest
}) {
  const auth =
    typeof ansImage !== "undefined" && typeof ansImage.auth !== "undefined"
      ? ansImage.auth[RESIZER_TOKEN_VERSION]
      : resizedOptions?.auth;
  const formattedSrc =
    typeof ansImage !== "undefined" ? imageANSToImageSrc(ansImage) : src;
  const { arcSite } = useFusionContext();
  const {
    services: { resizerURL: defaultResizerURL },
  } = getProperties(arcSite);
  const resizerURLToUse = resizerURL || defaultResizerURL;

  if (!auth) {
    return (
      <figure className={figureClassName}>
        <img
          alt={alt}
          src={src}
          width={width}
          height={height}
          loading={loading}
          className={className}
        />
      </figure>
    );
  }

  const imageWidthAndHeight = calculateWidthAndHeight({
    aspectRatio,
    width,
    height,
    ansImage,
  });
  const imageAspectRatio =
    imageWidthAndHeight.width / imageWidthAndHeight.height;

  const defaultSrc = formatSrc(
    resizerURLToUse.concat(formattedSrc),
    { ...resizedOptions, auth },
    imageWidthAndHeight.width,
    imageWidthAndHeight.height,
  );

  const responsiveSrcSet =
    responsiveImages
      .filter((responsiveImageWidth) => (
          Number.isInteger(responsiveImageWidth) && responsiveImageWidth > 0
        ))
      .map((responsiveImageWidth) => formatSrc(
          resizerURLToUse.concat(formattedSrc),
          { ...resizedOptions, auth },
          responsiveImageWidth,
          imageAspectRatio !== 0
            ? responsiveImageWidth / imageAspectRatio
            : undefined,
        ).concat(` ${responsiveImageWidth}w`))
      .join(", ") || null;

  const responsiveSizes =
    sizes && sizes.length
      ? sizes
          .filter(({ isDefault }) => !isDefault)
          .map(({ mediaCondition, sourceSizeValue }) => `${mediaCondition} ${sourceSizeValue}`)
          .concat(
            sizes.find((currentSizeObject) => currentSizeObject.isDefault)?.sourceSizeValue || [],
          )
          .join(", ")
      : null;

  return (
    <figure className={figureClassName}>
      <img
        {...rest}
        alt={alt}
        loading={loading}
        src={defaultSrc}
        srcSet={responsiveSrcSet}
        sizes={responsiveSizes}
        className={className}
        {...imageWidthAndHeight}
      />
      {caption && (
        <figcaption className={!showCaption && "hide"}>
          {caption} {credits && `Foto: ${credits}`}
        </figcaption>
      )}
    </figure>
  );
}

Image.defaultProps = {
  alt: "",
  loading: "lazy",
  resizedOptions: {},
  responsiveImages: [],
  sizes: [],
};

Image.propTypes = {
  /** Alt text for the image - if not set the image will be treated as decorative */
  alt: PropTypes.string,
  /** ANS Image object that has at minimum, _id, url and auth object to allow the component to handle building the img src attribute */
  ansImage: PropTypes.shape({
    _id: PropTypes.string,
    url: PropTypes.string,
    auth: PropTypes.object,
  }),
  /** The aspect ratio in which to display the image */
  aspectRatio: PropTypes.string,
  /** Caption */
  caption: PropTypes.string,
  /** Class name(s) that get appended to default class name of the component */
  className: PropTypes.string,
  /** Credits */
  credits: PropTypes.string,
  /** The intrinsic height of the image in pixels */
  height: PropTypes.number,
  /** Indication of how the browser should load the image, using the native loading attribute of an <img /> tag */
  loading: PropTypes.oneOf(["lazy", "eager"]),
  /** Options to pass into v2 resizer */
  resizedOptions: PropTypes.object,
  /** The URL of the resizer service. Should have a trailing slash */
  resizerURL: PropTypes.string,
  /** Array of widths to use as sizes for the image */
  responsiveImages: PropTypes.arrayOf(PropTypes.number),
  /** The options relating to each of the available srcset options of the image */
  sizes: PropTypes.arrayOf(
    PropTypes.shape({
      /** Whether it's the default last size available */
      isDefault: PropTypes.bool,
      /** The intrinsic width of the image in pixels or responsive units */
      sourceSizeValue: PropTypes.string,
      /** Media condition to render the corresponding source size value */
      mediaCondition: PropTypes.string,
    }),
  ),
  /** The intrinsic width of the image in pixels */
  width: PropTypes.number,
  /** The URL to an image to load and display. Should not have a leading slash */
  src: PropTypes.string,
  /** Flag for show caption */
  showCaption: PropTypes.bool,
  /** Class name(s) that get appended to "figure" tag */
  figureClassName: PropTypes.string,
};

export default Image;
