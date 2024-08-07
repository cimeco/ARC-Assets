import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { DateTime } from 'luxon';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { getUrlBySite, isAmp } from '@cimeco/utils';
import {
  getTagRibbons,
  getTaxonomyData,
  getTaxonomyPathData,
  getUrl,
  isPremium,
  isVideo
} from '@cimeco/utils/src/story';
import Headline from '@cimeco/ui/src/headline';
import AmpTimeAgo from '../../partial/amp-time-ago';

function Content({
  story,
  contentClasses,
  contentElementsOrder,
  headlineLevel,
  taxonomyLevel,
  showFlywheel,
  imagePosition,
  linkClasses,
  showAuthorInfo,
  showPublishingTime,
  showRibbon,
  showSecondarySection,
  showSite,
  showSubheadline,
  showTag,
  showTaxonomy,
  showReadMore = false,
  cardIndex,
  invertTaxonomyAuthor,
  fullCardLink,
  target,
  utm
}) {
  const { arcSite, contextPath, requestUri } = useFusionContext();
  const properties = getProperties(arcSite);
  const { tagsRibbon } = properties;
  const volanta = story.editor_note;
  const hasTags =
    story.taxonomy?.tags?.filter(
      (tag) => !properties.content?.hiddenTags?.includes(tag.slug)
    ).length > 0;
  // eslint-disable-next-line prefer-const
  let { taxonomyName, taxonomyUrl } = _.flow([
    getTaxonomyPathData,
    getTaxonomyData
  ])(showTag, story, arcSite);
  if (
    (!_.isUndefined(story.website) && story.website !== arcSite && !showTag) ||
    (!_.isUndefined(story.canonical_website) &&
      story.canonical_website !== arcSite &&
      !showTag)
  ) {
    const website = story.canonical_website;
    const properties2 = getProperties(website);

    if (website !== arcSite) {
      target = true;
    }
    if (
      !(
        !_.isUndefined(story.websites) &&
        !_.isUndefined(story.websites[arcSite])
      )
    ) {
      taxonomyUrl = `${properties2.site.baseUrl}${taxonomyUrl}`;
    }
  }
  const _isAmp = properties.site.isAlwaysAmp || isAmp(requestUri);
  const match = _.filter(
    story.content_elements,
    (c) => c.type === 'custom_embed' && c.subtype === 'DF'
  );

  const getContentElement = (element) => {
    const authorInfo = () => {
      if (
        showAuthorInfo &&
        invertTaxonomyAuthor &&
        taxonomyName &&
        !properties.content?.hiddenTags?.includes(taxonomyName) &&
        !_.isEmpty(taxonomyName)
      ) {
        return (
          <div className="article-author">
            <a
              className={linkClasses}
              href={getUrlBySite(
                contextPath,
                showTag && hasTags ? `/temas/${taxonomyUrl}/` : taxonomyUrl,
                arcSite
              )}
              target={target ? '_blank' : undefined}
              title={taxonomyName}
              rel="noreferrer"
            >
              {taxonomyName}
            </a>
          </div>
        );
      }
      return (
        <>
          {showAuthorInfo &&
          !_.isUndefined(story.credits) &&
          !_.isUndefined(story.credits.by) ? (
            <>
              {story.credits.by.length > 0 ? (
                <div className="article-author">
                  {story.credits.by.map((author, key) =>
                    _.isUndefined(author._id) ? (
                      <span
                        className={linkClasses}
                        title={author.name}
                        key={key}
                      >
                        {author.name +
                          (story.credits.by.length - 1 !== key ? ', ' : '')}
                      </span>
                    ) : (
                      <a
                        className={linkClasses}
                        href={getUrlBySite(
                          contextPath,
                          `/autor/${author._id}/`,
                          arcSite
                        )}
                        title={
                          author.additional_properties?.original?.byline ||
                          author.byline
                        }
                        key={key}
                      >
                        {(author.additional_properties?.original?.byline ||
                          author.byline) +
                          (story.credits.by.length - 1 !== key ? ', ' : '')}
                      </a>
                    )
                  )}
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      );
    };
    const readMore = () => {
      if (showReadMore) {
        return (
          <div className="button-container ver-mas col-12 flex pt2">
            <a
              href={getUrlBySite(contextPath, getUrl(story, arcSite), arcSite)}
              className="button btn-not-bkg button-more rounded"
            >
              <span>LEER MÁS</span>
            </a>
          </div>
        );
      }
    };
    const headline = () => {
      const {
        headlines: { basic: headlineBasic, web: headlineWeb } = { basic: "", web: undefined },
        label: {
          volanta: { text: textoVolanta } = {
            text: undefined,
          },
        } = { volanta: {} },
      } = story;

      let url = getUrlBySite(contextPath, getUrl(story, arcSite), arcSite);
      if (utm) {
        url += utm;
      }

      return (
        <Headline
          text={headlineWeb || headlineBasic}
          spanText={textoVolanta}
          level={headlineLevel}
          classes="article-title"
          linkClasses={linkClasses}
          url={url}
          targetBlank={
            // eslint-disable-next-line camelcase
            story.related_content?.redirect?.length > 0 || target
              ? true
              : undefined
          }
          rel={
            story.subtype === 'brandend_content' ||
            story.subtype === 'lvi_articulo_patrocinado'
              ? 'sponsored'
              : undefined
          }
        />
      );
    };
    const index = () => (
      <>{cardIndex ? <h2 className="card-index">{cardIndex}</h2> : <></>}</>
    );
    const premium = () => (
      <>
        {isPremium(story) ? (
          <div className="premium-article-text">Sólo suscriptores</div>
        ) : (
          <></>
        )}
      </>
    );
    const videoCard = () => (
      <>{isVideo(story) ? <div className="video-article-text" /> : <></>}</>
    );
    const publishingTime = () => {
      const timezone =
        (properties.site && properties.site.timezone) ||
        'America/Argentina/Buenos_Aires';
      const now = DateTime.now().setZone(timezone);
      const end = DateTime.fromJSDate(new Date(story.display_date)).setZone(
        timezone
      );
      const duration = now.diff(end, 'hours').hours;
      return (
        <>
          {showPublishingTime ? (
            <div className="uppercase secondary-color bold h6 inline-block date">
              {_isAmp ? (
                <AmpTimeAgo datetime={story.display_date} />
              ) : (
                <span>
                  {duration <= 0
                    ? 'HOY'
                    : duration <= 24
                    ? end.toRelative()
                    : end.toFormat('dd-LL-yyyy')}
                </span>
              )}
            </div>
          ) : (
            <></>
          )}
        </>
      );
    };
    const ribbons = () => (
      <>
        {showRibbon ? (
          getTagRibbons(tagsRibbon, story).map((item, key) => (
            <span key={key} className="tag">
              {item.description}
            </span>
          ))
        ) : (
          <></>
        )}
      </>
    );
    const subheadline = () => {
      if (showSubheadline) {
        if (!_.isNil(story.description) && !_.isEmpty(story.description.basic))
          return <p>{story.description.basic}</p>;
        if (
          !_.isUndefined(story.subheadlines) &&
          !_.isEmpty(story.subheadlines.basic)
        )
          return <p>{story.subheadlines.basic}</p>;
      }
      return null;
    };
    const taxonomy = () => {
      if (showSite) {
        const lavozSite =
          story?.taxonomy?.primary_section?._website === 'la-voz'
            ? 'La Voz del Interior'
            : '';
        const losAndesSite =
          story?.taxonomy?.primary_section?._website === 'los-andes'
            ? 'Los Andes'
            : '';
        const siteName = lavozSite === '' ? losAndesSite : lavozSite;
        return (
          <Headline
            text={siteName}
            level={taxonomyLevel}
            targetBlank={target || undefined}
            classes="article-section"
            linkClasses={linkClasses}
            url={
              showTag && hasTags ? `/temas/${taxonomyUrl}/` : `${taxonomyUrl}/`
            }
          />
        );
      }
      if (showSecondarySection) {
        const primarySection = story?.taxonomy?.primary_section?._id;
        const [secondarySection] = story.taxonomy.sections
          .filter(
            (item) =>
              item._id !== primarySection &&
              item._id !== '/argentina' &&
              item._id !== '/mexico'
          )
          .map((item) => item) || [];
        if (
          !_.isUndefined(secondarySection)
        ) {
          return (
            <Headline
              text={secondarySection?.name}
              level={taxonomyLevel}
              targetBlank={target || undefined}
              classes="article-section"
              linkClasses={linkClasses}
              url={`${secondarySection._id}/`}
            />
          );
        }
      }
      if (
        showTaxonomy &&
        invertTaxonomyAuthor &&
        !_.isUndefined(story.credits) &&
        !_.isUndefined(story.credits.by)
      )
        return (
          <Headline
            text={story.credits.by[0].name}
            level={taxonomyLevel}
            classes="article-section"
            targetBlank={target || undefined}
            linkClasses={linkClasses}
            url={
              story.credits.by[0]._id
                ? getUrlBySite(
                    contextPath,
                    `/autor/${story.credits.by[0]._id}/`,
                    arcSite
                  )
                : getUrlBySite(
                    contextPath,
                    showTag && hasTags
                      ? `/temas/${taxonomyUrl}/`
                      : `${taxonomyUrl}/`,
                    arcSite
                  )
            }
          />
        );
      return (
        showTaxonomy &&
        (taxonomyName &&
        !properties.content?.hiddenTags?.includes(taxonomyName) &&
        !_.isEmpty(taxonomyName) ? (
          <Headline
            text={showFlywheel ? volanta : taxonomyName}
            level={taxonomyLevel}
            targetBlank={target || undefined}
            classes="article-section"
            linkClasses={linkClasses}
            url={
              showTag && hasTags ? `/temas/${taxonomyUrl}/` : `${taxonomyUrl}/`
            }
          />
        ) : (
          <></>
        ))
      );
    };
    const minuteByMinute = () => {
      const channel = _.first(match)?.embed?.config?.partido?.canal;
      const idPartido = _.first(match)?.embed?.config?.partido?.id;
      return (
        channel &&
        !_isAmp && (
          <df-widget widget="card" channel={channel} className="mam">
            <section
              id="mamDataFactory"
              style={{ display: 'none' }}
              className="mx1 py2 mamDataFactory"
            >
              <div id={`mam-${idPartido}`} className="mam">
                <div className="flex justify-center">
                  <article id="team1" className="team col-5">
                    <div className="flex align-center flex-end">
                      <img
                        src="%escudo_team_1%"
                        alt="banderaTeam1"
                        className="pr2"
                      />
                      <h2>%local%</h2>
                      <p className="result">%resultado_team_1%</p>
                    </div>
                    <div id="goles_team1" />
                  </article>
                  <p className="vs p2">VS</p>
                  <article id="team2" className="team col-5">
                    <div className="flex align-center">
                      <p className="result">%resultado_team_2%</p>
                      <h2>%visitante%</h2>
                      <img
                        src="%escudo_team_2%"
                        alt="banderaTeam2"
                        className="pl2"
                      />
                    </div>
                    <div id="goles_team2" />
                  </article>
                </div>
              </div>
            </section>
          </df-widget>
        )
      );
    };

    const byDefault = () => <></>;

    const contentElements = {
      ribbons,
      publishingTime,
      taxonomy,
      index,
      headline,
      subheadline,
      authorInfo,
      premium,
      videoCard,
      minuteByMinute,
      readMore,
      byDefault
    };

    return (contentElements[element] || contentElements.byDefault)();
  };

  const url = getUrlBySite(contextPath, getUrl(story, arcSite), arcSite);

  return (
    <>
      {imagePosition === 'back' ? getContentElement('taxonomy') : null}
      <div
        className={`article-content ${contentClasses} ${
          showPublishingTime && story?.display_date ? 'withTime' : ''
        } ${showAuthorInfo && story?.credits?.by ? 'withAuthor' : ''}`}
      >
        {url && fullCardLink ? <a href={url} /> : null}
        {contentElementsOrder
          .filter(
            (element) =>
              element !== 'taxonomy' ||
              (element === 'taxonomy' && imagePosition !== 'back')
          )
          .map((element) => (
            <Fragment key={element}>{getContentElement(element)}</Fragment>
          ))}
      </div>
    </>
  );
}

Content.propTypes = {
  story: PropTypes.object,
  cardIndex: PropTypes.string,
  contentClasses: PropTypes.string,
  contentElementsOrder: PropTypes.array,
  headlineClasses: PropTypes.string,
  headlineLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  imagePosition: PropTypes.string,
  invertTaxonomyAuthor: PropTypes.bool,
  linkClasses: PropTypes.string,
  publishingTimeFormat: PropTypes.string,
  showAuthorInfo: PropTypes.bool,
  showPrimarySection: PropTypes.bool,
  showPublishingTime: PropTypes.bool,
  showRibbon: PropTypes.bool,
  showSecondarySection: PropTypes.bool,
  showSite: PropTypes.bool,
  showSubheadline: PropTypes.bool,
  showReadMore: PropTypes.bool,
  showTag: PropTypes.bool,
  showTaxonomy: PropTypes.bool,
  taxonomyLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  showFlywheel: PropTypes.bool
};

export default Content;
