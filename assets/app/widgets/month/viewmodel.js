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
            this.budget = settings.budget || {};
            this.year = this.budget.year || moment().year();

            this.month = moment({
                year: this.year,
                month: this.monthNb
            });
            var firstDayId = this.month.clone().startOf('month').weekday(),
                dayEnd = this.month.clone().endOf('month').date(),
                i = 0;

            while (i <= dayEnd) {
                var dayId = firstDayId + i++;

                this.days[dayId] = i;
            }
        };

        monthWidget.prototype.getMoneyForDay = function (dayId) {

            var date = this.month.format('YYYY-MM-') + dayId;

            return this.budget.money[date];
        };

        monthWidget.prototype.dateClick = function (dayId) {
            var day = this.days[dayId];

            dialog.show(new DayModal(this.budget, moment({
                date: day,
                month: this.monthNb,
                year: this.year
            })));
        };

        return monthWidget;
    });
