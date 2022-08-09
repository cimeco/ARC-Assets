import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useFusionContext } from "fusion:context";

 import CImage from '../../../src/story/CImage';
 import { getImage, getUrlBySite } from '@cimeco/utils';

//css adefinir

function Search() {
  //a revisar
  const { arcSite, deployment, contextPath } = useFusionContext();
  return (
    <>
      <form
        className="flex search justify-center button-main-search button-search rounded flex items-center ml1"
        action={getUrlBySite(contextPath, `/busqueda/`, arcSite)}
        method="get"
        target="_top"
        id="search-form-small"
      >
        <button className="button" type="submit">
          <CImage
            src={getImage(
              arcSite,
              contextPath,
              deployment,
              "/images/icons/search.svg"
            )}
            alt="buscar"
            width="12px"
            height="14px"
            className="search"
            ampLayout="fixed"
          />
        </button>
        <input type="hidden" name="_website" value={arcSite} />
        <input
          type="text"
          id="search-input-small"
          className="p1 search-input"
          placeholder="BUSCAR"
        />
      </form>
      {/* //revisar */}
      {/* <script src={deployment(`${contextPath}/resources/js/search.min.js`)} /> */}
    </>
  );
}

export default Search;
