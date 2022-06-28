module.exports.getUrlBySite = (contextPath, url, arcSite) => {
  let _url = url.replace('/homepage', '');
  if (url.includes('http')) {
    return _url.endsWith('/') ? _url : `${_url}/`;
  }
  return `https://www.lavoz.com.ar${_url}`;
};
