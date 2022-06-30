import _ from 'lodash';
//simulating the site getters, then it will be imported from the utils
module.exports.getUrlBySite = (contextPath, url, arcSite) => {
  let _url = url.replace('/homepage', '');
  if (url.includes('http')) {
    return _url.endsWith('/') ? _url : `${_url}/`;
  }
  return `https://www.lavoz.com.ar${_url}`;
};

//simulating the slug getters, then it will be imported from the utils
module.exports.getSectionSlug = (globalContent) => {
  if (!globalContent || !globalContent.section || !globalContent.section.parent)
    return '';
  return `section-${_.kebabCase(
    _.replace(
      _.trim(
        globalContent.section.parent.default !== '/'
          ? globalContent.section.parent.default
          : globalContent.section._id || '',
        '/'
      ),
      '/',
      '-'
    )
  )}`;
};
