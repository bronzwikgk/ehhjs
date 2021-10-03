/** 
 * Dynamically create nested level groups by properties in Javascript
 */

/**
 * Creates nested groups by object properties.
 * `properties` array nest from highest(index = 0) to lowest level.
 *
 * @param {String[]} properties
 * @returns {Object}
 */
 function nestGroupsBy(arr, properties) {
    properties = Array.from(properties);
    if (properties.length === 1) {
      return groupBy(arr, properties[0]);
    }
    const property = properties.shift();
    var grouped = groupBy(arr, property);
    for (let key in grouped) {
      grouped[key] = nestGroupsBy(grouped[key], Array.from(properties));
    }
    return grouped;
  }
  
  /**
   * Group objects by property.
   * `nestGroupsBy` helper method.
   *
   * @param {String} property
   * @param {Object[]} conversions
   * @returns {Object}
   */
  function groupBy(conversions, property) {
    return conversions.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  //eg

  var products = [
    { id: 1, name: 'p1', country: 'US', platform: 'win'},
    { id: 2, name: 'p1', country: 'US', platform: 'win'},
    { id: 3, name: 'p1', country: 'GB', platform: 'mac'},
    { id: 4, name: 'p1', country: 'US', platform: 'mac'},
    { id: 5, name: 'p2', country: 'US', platform: 'win'},
    { id: 6, name: 'p2', country: 'GB', platform: 'win'},
    { id: 7, name: 'p3', country: 'US', platform: 'mac'},
  ];
  

  const groups = nestGroupsBy(products, ['name', 'country', 'platform']);
  console.log(groups);
  /* 
  output:
  { p1: 
    { US: 
      { win: [
          {id: 1, name: 'p1', country: 'US', platform: 'win'},
          {id: 2, name: 'p1', country: 'US', platform: 'win'},          
        ], 
        mac: [
          {id: 4, name: 'p1', country: 'US', platform: 'mac'},
        ] 
       }, 
       GB: { win: [{ id: 3, name: 'p1', country: 'GB', platform: 'mac'}] } },
    p2: { US: { win: [Array] }, GB: { win: [Array] } },
    p3: { US: { mac: [Array] } } }  
  */