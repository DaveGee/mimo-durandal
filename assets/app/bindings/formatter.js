/**
 * Created by david on 22.01.15.
 */
define(['moment', 'knockout', 'services/formatter'], function (moment, ko, formatSvc) {

    ko.bindingHandlers.format = {
        init: function (el, valueAccessor, allBindings) {

            var value = allBindings().value,
                format = valueAccessor() || 'noformat';


            $(el).text(formatSvc[format](value));
        },

        update: function (el, valueAccessor, allBindings) {

        }
    };

});
