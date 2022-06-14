import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

//desde ARC utils
// import getUrlBySite from '../../../util/getUrlBySite';
// import getImage from '../../../util/getImage';

//a revisar
// import CImage from '../../common/CImage';

//css adefinir

function Search() {
  //a revisar
  //const { arcSite, deployment, contextPath } = useFusionContext();
  return (
    <>
      <form
        className="flex search p2 justify-center"
        // action={getUrlBySite(contextPath, `/busqueda/`, arcSite)}
        method="get"
        target="_top"
        id="search-form-big"
      >
        <input type="hidden" name="_website" value={'search '} />{' '}
        {/* value={arcSite} */}
        <input
          type="text"
          className="p1"
          placeholder="BUSCAR"
          id="search-input-big"
        />
        <button className="btn" type="submit">
          <div className="material-icons">
            {' '}
            {/* <CImage
              src={getImage(
                arcSite,
                contextPath,
                deployment,
                '/images/icons/search.svg',
                true
              )}
              // alt="buscar"
              width="18px"
              height="20px"
              className="search"
              ampLayout="fixed"
            /> */}
          </div>
        </button>
      </form>
      {/* //revisar */}
      {/* <script src={deployment(`${contextPath}/resources/js/search.min.js`)} /> */}
    </>
  );
}

export default Search;
