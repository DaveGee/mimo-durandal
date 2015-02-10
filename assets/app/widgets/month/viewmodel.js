define(['moment', 'dialogs/dayModal', 'plugins/dialog'],
    function (moment, DayModal, dialog) {

        var monthWidget = function () {
            this.month = moment();
            this.days = [];

            this.daysInWeek = [0, 1, 2, 3, 4, 5, 6];
            this.weeksInMonth = [0, 1, 2, 3, 4, 5];

            this.monthNb = this.month.month();
            this.year = this.month.year();

        };

        monthWidget.prototype.addMoney = function(moneyUnit) {

            //TODO: find a way for the callback to call here (this problem)
            console.log(this.budget);

            this.budget.addMoney(moneyUnit.date, moneyUnit.amount, moneyUnit.type, moneyUnit.description, moneyUnit.isMonthly)
                .then(function() {
                    console.log(this.budget);
                }.bind(this));
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

            var self = this;
            var dayClick = function (dayData) {
                dialog.show(new DayModal(moment({
                        date: dayData.day,
                        month: self.monthNb,
                        year: self.year
                    }),
                    self.addMoney.bind(this)
                ));
            };

            while (i < 42) {

                if (i <= dayEnd + firstDayId - 1 && i >= firstDayId) {
                    this.days[i] = {
                        day: i - firstDayId + 1,
                        hasMoney: false,
                        dayClick: dayClick
                    };
                } else {
                    this.days[i] = {
                        day: '',
                        hasMoney: false,
                        dayClick: function() {}
                    };
                }

                i++;
            }
        };

        return monthWidget;
    });
