define(['moment'],
    function (moment) {

        return {
            'noformat': function(value) { return value + ''; },

            'dayNameShort': function(dayNb) {
                return moment().weekday(dayNb).format('dd');
            },

            'monthName': function(monthNb) {
                return moment({month: monthNb}).format('MMMM');
            },

            'currency': function(value, numberOfDec) {
                return currencyFormatFunc(value, numberOfDec);
            },

            'moment': function(value, format) {
                return moment(value).format(format);
            }
        };

        /**
         * Round the value to 2 decimals and add ' between thousands
         */
        function currencyFormatFunc(value, numberOfDec) {

            if(typeof value === 'undefined' || value === null || value === '') {
                return value;
            }

            value = value ? value : 0;

            // TODO: manage number of decimals effectively... not only 0 or something
            var includeDecimals = parseInt(numberOfDec, 10) > 0;

            var withoutDecimals = Math.floor(Math.abs(value));

            // take the X decimals
            var decimals = Math.round((Math.abs(value) - withoutDecimals) * 100);
            var decimalStr = decimals.toString();
            if (decimals < 10) {
                decimalStr = '0' + decimalStr;
            }

            /**
             * Recursively transform a number in group of number separated with '
             */
            function toFrCh(number) {

                // left part (remain to be processed in next recursion)
                var l = Math.floor(number / 1000);
                // right part
                var r = number - (l * 1000);

                // transform right part in string and add missing zeros if right part is only 1 or 2 digits
                if (r < 100) {
                    if (r < 10) {
                        r = '0' + r;
                    }
                    r = '0' + r;
                }

                // if there's still a left part, continue processing
                if (l !== 0) {
                    return toFrCh(l) + '\'' + r;
                } else {
                    return number;
                }
            }

            // if transformation is 0, result is 0 in string
            var formatted = (toFrCh(withoutDecimals) || '0');

            // change sign if negative
            if (value < 0) {
                formatted = '-' + formatted;
            }

            // add suffix
            return formatted + (includeDecimals ? '.' + decimalStr : '');
        }

    });