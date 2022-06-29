const GetProperties = () => {
  return {
    site: {
      name: 'La Voz del Interior'
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
