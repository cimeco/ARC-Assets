import React from "react";
import { useFusionContext } from "fusion:context";
import { getUrlBySite } from "@cimeco/utils";

const Menu = ({ sectionSlug, mainMenu, navClass, sectionUri }) => {
  const { arcSite, contextPath } = useFusionContext();
  return (
    <nav className={`${navClass}-navigation ajuste-1440 px2 ${sectionSlug}`}>
      <button id="scrollbutton-left" className="scrollbutton">
        <i className="material-icons"></i>
      </button>
      <button id="scrollbutton-right" className="scrollbutton">
        <i className="material-icons"></i>
      </button>
      <div className="flex flex-nowrap align-items-center col-12">
        <a className="section-logo" href={"#"}></a>
        <ul className="main-menu scrollable-menu flex justify-between list-reset col col-12 m0 menu-line xs-hide sm-hide">
          {mainMenu.map((item, index) => {
            return (
              <a
                href={getUrlBySite(contextPath, item.url, arcSite)}
                key={item.url}
                target={item.external && "_blank"}
                rel={item.external && "noreferrer"}
              >
                  <li
                    className={`line pb1 ${
                      index < mainMenu.length - 1 ? "mr2" : ""
                    } ${sectionUri === item.url ? "active" : ""}`}
                  >
                  {item.title || item.name}
                  {item.sub.length > 8 ? (
                  <div className="double-menu">  
                    <ul className="drop-down fixed">
                    {item?.sub?.slice(0,Math.ceil(item.sub.length / 2)).map((item, index) => {
                          return (
                            <a
                              href={getUrlBySite(
                                contextPath,
                                item.url,
                                arcSite
                              )}
                              key={item.url}
                              target={item.external && "_blank"}
                              rel={item.external && "noreferrer"}
                            >
                              <li key={index}>{item?.title}</li>
                            </a>
                          );
                        })
                      }
                  </ul>
                  <ul className="drop-down fixed">
                  {item?.sub?.slice(Math.ceil(item.sub.length / 2)).map((item, index) => {
                        return (
                          <a
                            href={getUrlBySite(
                              contextPath,
                              item.url,
                              arcSite
                            )}
                            key={item.url}
                            target={item.external && "_blank"}
                            rel={item.external && "noreferrer"}
                          >
                            <li key={index}>{item?.title}</li>
                          </a>
                        );
                      })
                    }
                </ul>
                </div>
                  ) : (
                  <ul className="drop-down fixed">
                    {item.sub
                      ? item.sub.map((item, index) => {
                          return (
                            <a
                              href={getUrlBySite(
                                contextPath,
                                item.url,
                                arcSite
                              )}
                              key={item.url}
                              target={item.external && "_blank"}
                              rel={item.external && "noreferrer"}
                            >
                              <li key={index}>{item?.title}</li>
                            </a>
                          );
                        })
                      : null}
                  </ul>

                  )
                  }
                </li>
              </a>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;


// Menu.propTypes = {
//   arcSite: PropTypes.string,
//   contextPath: PropTypes.any,
//   sectionUri: PropTypes.string
// };
