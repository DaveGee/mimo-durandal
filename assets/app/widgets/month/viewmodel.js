define(['moment'], function (moment) {
    var monthWidget = function () {
        this.month = moment();
        this.days = [];

        this.monthNb = this.month.month();
        this.year = this.month.year();

    };

    monthWidget.prototype.activate = function (settings) {
        this.monthNb = Math.min(settings.month, 11);
        this.year = settings.year || moment().year();

        this.month = moment({
                year: this.year,
                month: this.monthNb
            });

        var day = this.month.startOf('month').clone(),
            dayEnd = this.month.endOf('month').clone();

        while(!day.isAfter(dayEnd, 'day')) {
            this.days.push({
                dayInMonth: day.date(),
                weekDay: day.day()
            });
            day.add(1, 'd');
        }
    };

    return monthWidget;
});
