define(['moment', 'q'],
    function (moment, Q) {

        var monthWidget = function () {
            this.days = [];

            this.daysInWeek = [0, 1, 2, 3, 4, 5, 6];
            this.weeksInMonth = [0, 1, 2, 3, 4, 5];

        };

        monthWidget.prototype.dayClick = function (day) {
            if (typeof this.callback === 'function') {
                this.callback(this.monthNb, day);
            }
        };

        monthWidget.prototype.activate = function (settings) {
            this.monthNb = Math.min(settings.monthNb, 11);
            this.year = settings.year || moment().year();

            this.callback = settings.select || function () {
                throw "Select undefined";
            };

            this.money = settings.money || {};

            return this.initCalendar();
        };

        monthWidget.prototype.initCalendar = function() {

            var callback = this.callback;

            var thisMonth = moment({
                year: this.year,
                month: this.monthNb
            });

            var firstDayId = thisMonth.clone().startOf('month').weekday(),
                dayEnd = thisMonth.clone().endOf('month').date(),
                i = 0;

            return Q.fcall(function() {
                while (i < 42) {

                    if (i <= dayEnd + firstDayId - 1 && i >= firstDayId) {

                        var day = i - firstDayId + 1;
                        var dayStr = thisMonth.date(day).format('YYYY-MM-DD');

                        this.days[i] = {
                            day: day,
                            hasMoney: !!this.money[dayStr],
                            dayClick: function () {
                                callback(moment({
                                    month: thisMonth.month(),
                                    year: thisMonth.year(),
                                    date: this.day
                                }));
                            }
                        };

                    } else {
                        this.days[i] = {
                            day: '',
                            hasMoney: false,
                            dayClick: function () {
                            }
                        };
                    }

                    i++;
                }
            }.bind(this));
        };

        return monthWidget;
    });
