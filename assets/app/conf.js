
define(['moment'], function(moment) {

  // add custom bindings
  require(['bindings/formatter']);

  // configure application
  moment.locale('fr-CH');

  // return app config

  return {
    app: {
      version: '0.1',
      name: 'MiMo'
    }

  };

});
