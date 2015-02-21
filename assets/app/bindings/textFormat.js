/**
 * Created by david on 22.01.15.
 */
define(['moment', 'knockout', 'services/formatter'], function (moment, ko, formatSvc) {

    ko.bindingHandlers.textFormat = {

        update: function (el, valueAccessor, allBindings) {
            var value = valueAccessor(),
                format = allBindings().format || 'noformat';

            $(el).text(formatSvc[format](value));
        }
    };

});
