const GetProperties = () => {
  return {
    site: {
      name: 'La Voz del Interior'
    },
    content: {
      sections: [
        {
          _id: '/deportes',
          title: 'MundoD',
          socialMedia: {
            facebook: {
              page: '107278443174',
              id: '153507781386299'
            }
          },
          menu: [
            {
              _id: '/deportes/futbol',
              url: '/deportes/futbol/',
              name: 'FUTBOL'
            },
            {
              _id: '/deportes/talleres',
              url: '/deportes/talleres/',
              name: 'TALLERES'
            },
            // an external link is simulated for the section
            {
              name: 'VOY DE VIAJE',
              url: 'https://voydeviaje.com.ar',
              external: true
            }
          ],
          viewId: '166322826'
        }
      ]
    },
    menues: {
      mainMenu: [
        { title: 'INICIO', url: '/homepage' },
        { title: 'DEPORTES', url: '/deportes' },
        {
          title: 'VOY DE VIAJE',
          url: 'https://voydeviaje.com.ar',
          external: true
        }
      ]
    }
  };
};

export default GetProperties;
