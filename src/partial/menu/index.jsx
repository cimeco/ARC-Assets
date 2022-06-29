import React from 'react';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { getUrlBySite } from '@cimeco/utils';
import { getSectionSlug } from '@cimeco/utils';

const Menu = () => {
  const { arcSite, contextPath, requestUri, globalContent } =
    useFusionContext();
  const properties = getProperties(arcSite);
  const { mainMenu } = properties.menues;
  const sectionSlug = getSectionSlug(globalContent);
  const sectionUri = `/${requestUri.split('?')[0].split('/')[1]}`;
  return (
    <nav className={`main-navigation ajuste-1440 px2 ${sectionSlug}`}>
      <button id="scrollbutton-left" className="scrollbutton">
        <i className="material-icons"></i>
      </button>
      <button id="scrollbutton-right" className="scrollbutton">
        <i className="material-icons"></i>
      </button>
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
    </nav>
  );
};

export default Menu;
