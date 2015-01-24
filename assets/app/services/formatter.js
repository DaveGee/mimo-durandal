define(['moment'],
    function (moment) {

        return {
            'noformat': function(value) { return value + ''; },

            'dayNameShort': function(dayNb) {
                return moment().weekday(dayNb).format('dd');
            },

            'monthName': function(monthNb) {
                return moment({month: monthNb}).format('MMMM');
            }
        }

    });