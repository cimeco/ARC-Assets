import React from 'react';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { getUrlBySite } from '@cimeco/utils';
import { getSectionSlug } from '@cimeco/utils';
import _ from 'lodash';

const Menu = () => {
  const {
    arcSite,
    contextPath,
    requestUri,
    globalContent,
    globalContentConfig,
    overrideSectionSlug,
    overrideSectionUrl
  } = useFusionContext();
  const properties = getProperties(arcSite);
  const { mainMenu } = properties.menues;
  const sectionUri = `/${requestUri.split('?')[0].split('/')[1]}`;

  /*_________added for the moment to simulate the change of section or home______ */

  let section =
    // eslint-disable-next-line no-nested-ternary
    globalContent && globalContent.section
      ? globalContent.section.parent &&
        globalContent.section.parent.default !== '/'
        ? globalContent.section.parent.default
        : globalContent.section._id
      : undefined;
  let navigation = [];
  const tagsAsSection = properties.content?.tagsAsSection;

  const tagAsSection = tagsAsSection
    ? tagsAsSection.find((item) => {
        return (
          item.tag === (globalContentConfig?.query?.tag || globalContent?.tag)
        );
      })
    : undefined;
  if (
    globalContentConfig &&
    ['tag', 'storyOrTag'].includes(globalContentConfig.source) &&
    tagAsSection
  ) {
    section = `/${tagAsSection.section}`;
  }
  navigation = properties.content?.sections?.find((item) => {
    return item._id === section;
  })?.menu;
  navigation = (navigation && _.uniqBy(navigation, '_id')) || [];
  const sectionSlug = overrideSectionSlug || getSectionSlug(globalContent);
  const sectionUrl =
    overrideSectionUrl ||
    (globalContent &&
    globalContent.section &&
    globalContent.section.parent.default !== '/'
      ? globalContent.section.parent.default
      : undefined);

  /* ______________________________***_____________________________________*/
  return (
    <nav className={`main-navigation ajuste-1440 px2 ${sectionSlug}`}>
      <button id="scrollbutton-left" className="scrollbutton">
        <i className="material-icons"></i>
      </button>
      <button id="scrollbutton-right" className="scrollbutton">
        <i className="material-icons"></i>
      </button>
      {properties.content.sections
        .map((item) => {
          return item._id;
        })
        .includes(section) ? (
        <div className="flex flex-nowrap align-items-center col-12">
          <a
            className="section-logo"
            href={
              sectionUrl ? getUrlBySite(contextPath, sectionUrl, arcSite) : '#'
            }
          ></a>
          <ul className="main-menu scrollable-menu flex justify-between list-reset menu-line m0 xs-hide sm-hide">
            {navigation.map((item, index) => {
              return (
                <a
                  href={getUrlBySite(contextPath, item.url, arcSite)}
                  target={item.external && '_blank'}
                  rel={item.external && 'noreferrer'}
                  key={item.url}
                >
                  <li
                    className={`line pb1 ${
                      index < navigation.length - 1 ? 'mr2' : ''
                    } ${
                      requestUri.includes(item._id) && item._id !== '/'
                        ? 'active'
                        : ''
                    }`}
                  >
                    {item.name}
                  </li>
                </a>
              );
            })}
          </ul>
        </div>
      ) : (
        <ul className="main-menu scrollable-menu flex justify-between list-reset col col-12 m0 menu-line xs-hide sm-hide">
          {mainMenu.map((item, index) => {
            return (
              <a
                href={getUrlBySite(contextPath, item.url, arcSite)}
                key={item.url}
                target={item.external && '_blank'}
                rel={item.external && 'noreferrer'}
              >
                <li
                  className={`line pb1 ${
                    index < mainMenu.length - 1 ? 'mr2' : ''
                  } ${sectionUri === item.url ? 'active' : ''}`}
                >
                  {item.title}
                </li>
              </a>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default Menu;

/* ______________________________***_____________________________________*/

// MainNavigation.propTypes = {
//   arcSite: PropTypes.string,
//   contextPath: PropTypes.any,
// globalContent: PropTypes.shape({
//   section: PropTypes.any
// }),
// overrideSectionSlug: PropTypes.string,
// overrideSectionUrl: PropTypes.string,
//   properties: PropTypes.shape({
//     site: PropTypes.shape({
//       isAlwaysAmp: PropTypes.bool
//     }),
//     menues: PropTypes.shape({
//       mainMenu: PropTypes.array
//     })
//   }),
//   requestUri: PropTypes.string
// };
/* ______________________________***_____________________________________*/
