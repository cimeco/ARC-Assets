module.exports.useFusionContext = () => {
  let fusionTest = [];
  fusionTest.push({
    arcSite: 'la-voz',
    contextPath: '/pf',
    requestUri: '/deportes/?_website=la-voz',
    globalContent: {
      section:{
        _id: '/deportes',
        navigation: { nav_title: 'Mundo D' },
        parent: { default: '/' }
      }
    }
  });
  return fusionTest[0];
};
