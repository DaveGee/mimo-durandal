/**
 * Created by david on 22.01.15.
 */
define(['moment', 'knockout', 'services/formatter'], function (moment, ko, formatSvc) {

    ko.bindingHandlers.valueFormat = {
        preprocess: function(value, name, addBindingCallback) {
            addBindingCallback('es5Writer', 'function(v){' + value + ' = v}');
            return value;
        },
        init: function (el, valueAccessor, allBindings) {

            var writer = allBindings.get('es5Writer');

            $(el).change(function () {

                var inputText = $(el).val().trim();

                var isValid = true;

                if (isValid) {
                    writer(inputText);
                }
            });
        },

        update: function (el, valueAccessor, allBindings) {
            var value = valueAccessor(),
                format = allBindings().format || 'noformat';

            $(el).val(formatSvc[format](value));
        }
    };

});

