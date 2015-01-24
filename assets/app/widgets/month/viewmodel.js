define(['moment', 'dge/iterator'], function (moment, Iterator) {

    var monthWidget = function () {
        this.month = moment();
        this.days = [];
        this.daysEnum = null;

        this.daysInWeek = [0, 1, 2, 3, 4, 5, 6];
        this.weeksInMonth = [0, 1, 2, 3, 4];

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

        while (!day.isAfter(dayEnd, 'day')) {
            this.days.push(day.clone());
            day.add(1, 'd');
        }

        this.daysEnum = new Iterator(this.days);
    };

    monthWidget.prototype.showDay = function(dayOfWeek, weekOfMonth) {

        var day = this.daysEnum.current();

        if(day && day.weekday() === dayOfWeek) {
            this.daysEnum.next();
            return day.date();
        } else {
            return '-';
        }

    };

    return monthWidget;
});
