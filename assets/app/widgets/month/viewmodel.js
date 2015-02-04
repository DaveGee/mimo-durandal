define(['moment', 'dialogs/dayModal', 'plugins/dialog'],
    function (moment, DayModal, dialog) {

    var monthWidget = function () {
        this.month = moment();
        this.days = [];

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
        var day = this.month.clone().startOf('month'),
            dayEnd = this.month.clone().endOf('month');

        var firstDayId = day.weekday(),
            i = 0;

        while (!day.isAfter(dayEnd, 'day')) {
            var dayId = firstDayId + i++;

            this.days[dayId] = day.clone();

            day.add(1, 'd');
        }
    };

    monthWidget.prototype.showDay = function (dayId) {

        if(this.days[dayId]) {
            return this.days[dayId].date();
        } else {
            return '';
        }
    };

    monthWidget.prototype.dateClick = function(dayId) {
        var day = this.days[dayId];

        dialog.show(new DayModal(day));
    };

    return monthWidget;
});
