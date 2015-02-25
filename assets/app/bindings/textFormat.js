/**
 * Created by david on 22.01.15.
 */
define(['moment', 'knockout', 'services/formatter'], function (moment, ko, formatSvc) {

    ko.bindingHandlers.textFormat = {

        update: function (el, valueAccessor, allBindings) {
            var format = valueAccessor() || 'noformat',
                value = allBindings().text;

            var argRx = /^([^:]+)\:(.+)$/.exec(format),
                func = format,
                args = '';

            if (argRx) {
                func = argRx[1];
                args = argRx[2];
            }

            if (!func || !formatSvc[func]) {
                throw new Error('Format function \'' + func + '\' not found');
            }

            $(el).text(formatSvc[func](value, args));
        }
    };

});
