module.exports.useFusionContext = () => {
  let fusionTest = [];
  fusionTest.push({
    arcSite: 'la-voz',
    contextPath: '/pf',
    requestUri: '/deportes/talleres/?_website=la-voz',
    globalContentConfig: {
      source: undefined,
      query: undefined
    },
    globalContent: {
      section: {
        _id: '/deportes',
        navigation: { nav_title: 'Mundo D' },
        parent: { default: '/' }
      }
    }
  });
  return fusionTest[0];
};
