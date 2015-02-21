/**
 * Created by david on 22.01.15.
 */
define(['moment', 'knockout', 'services/formatter'], function (moment, ko, formatSvc) {

    ko.bindingHandlers.amountValue = {
        preprocess: function(value, name, addBindingCallback) {
            addBindingCallback('es5Writer', 'function(v){' + value + ' = v}');
            return value;
        },
        init: function (el, valueAccessor, allBindings) {

            var type = allBindings().type,
                amount = valueAccessor() || 0;

            var writer = allBindings.get('es5Writer');

            if(type !== 'debit' || type !== 'credit') {
                type = 'debit';
            }

            console.log('init', amount, type)

            $(el).blur(function () {

                var inputText = $(el).val().trim();

                console.log('blur', inputText);

                var isValid = true;

                if (isValid) {
                    if(type === 'debit') {
                        writer(-Math.abs(parseFloat(inputText)));
                    } else {
                        writer(Math.abs(parseFloat(inputText)));
                    }

                } else {
                    writer(0);
                }
            });
        },

        update: function (el, valueAccessor, allBindings) {

            var amount = valueAccessor() || 0;

            console.log('update', amount);

            $(el).val(amount + ' CHF');
        }
    };

});

