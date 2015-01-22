/**
 * Created by david on 22.01.15.
 */
define(['moment', 'knockout'], function(moment, ko) {

  var formats = {
    'monthName': function(value) {
      return moment({month: value}).format('MMMM');
    }
  };

  ko.bindingHandlers.format = {
    init: function(el, valueAccessor, allBindings) {

      var value = allBindings().value;

      $(el).text(formats[valueAccessor()](value));
    },

    update: function(el, valueAccessor, allBindings) {

    }
  };

});
