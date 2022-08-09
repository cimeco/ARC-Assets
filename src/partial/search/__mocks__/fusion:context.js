module.exports.useFusionContext = () => {
  let fusionTest = [];
  fusionTest.push({
    arcSite: 'la-voz',
    contextPath: '/pf',
    deployment:{
      value: "$LATEST",
      length: 1,
      name: "appendDeployment"
    }
   
  });
  return fusionTest[0];
};
