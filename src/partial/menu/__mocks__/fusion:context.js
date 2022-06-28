module.exports.useFusionContext = () => {
  let fusionTest = [];
  fusionTest.push({
    arcSite: 'la-voz',
    contextPath: '/pf',
    requestUri: '/deportes/?_website=la-voz'
  });
  return fusionTest[0];
};
