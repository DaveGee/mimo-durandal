define(['moment', 'q', 'services/dataservice', 'dialogs/composedModal', 'plugins/dialog', 'viewmodels/formAddMoney', 'toastr', 'plugins/observable'],
    function (moment, Q, ds, ComposedModal, dialog, FormAddMoney, toastr, observable) {

        var _dayFormat = 'YYYY-MM-DD';

        var monthWidget = function () {
            // on what the calendar is bound to display the days
            this.days = [];

            this.daysInWeek = [0, 1, 2, 3, 4, 5, 6];
            this.weeksInMonth = [0, 1, 2, 3, 4, 5];

            this.money = {
                // 'YYYY-MM-DD': [ { moneyUnit }, { moneyUnit } ]
            };

            observable.defineProperty(this, 'monthBalance', function () {

                return _.reduce(this.money, function(balance, mu) {
                    return balance + mu.guessedAmount;
                }, 0);

            }.bind(this));

        };

        monthWidget.prototype.selectMonth = function () {

            toastr['success']('Nice!');
        };

        monthWidget.prototype.dayClick = function (day) {

            var date = moment({day: day.day, month: this.monthNb, year: this.budget.year});

            var form = new FormAddMoney(function (moneyUnit) {

                moneyUnit.day = date;

                ds.addMoneyToBudget(this.budget.id, moneyUnit).then(function (moneyUnit) {

                    this.money.push(moneyUnit);

                    toastr['success']('Nice!');

                }.bind(this));
            }.bind(this));

            dialog.show(new ComposedModal(date.format('dd DD MMM YYYY'), form/*, [{label: 'Terminer', id: 'end'}]*/))
                .then(function (result) {
                    //console.log(result);
                });
        };

        monthWidget.prototype.activate = function (settings) {
            this.monthNb = Math.min(settings.monthNb, 11);
            this.budget = settings.budget;
            if (!this.budget) {
                throw 'No budget, no chocolate!';
            }

            this.callback = settings.select || function () {
            };

            return this.initCalendar()
                .then(function () {
                    ds.getMonthMoney(this.budget.id, this.monthNb)
                        .then(function (monthMoneyArr) {

                            this.money = monthMoneyArr;

                        }.bind(this))
                }.bind(this));
        };

        monthWidget.prototype.initCalendar = function () {

            var thisMonth = moment({
                year: this.budget.year,
                month: this.monthNb
            });

            var firstDayId = thisMonth.clone().startOf('month').weekday(),
                dayEnd = thisMonth.clone().endOf('month').date(),
                i = 0;

            return Q.fcall(function () {
                while (i < 42) {

                    this.days[i] = {
                        id: i,
                        day: '',
                        dayStr: 'x'
                    };

                    var monthWidget = this;

                    observable.defineProperty(this.days[i], 'hasMoney', function () {

                        return !!_.find(monthWidget.money, function (mu) {
                            return moment(mu.day).format(_dayFormat) === this.dayStr;
                        }.bind(this));
                    });

                    if (i <= dayEnd + firstDayId - 1 && i >= firstDayId) {

                        var day = i - firstDayId + 1;
                        var dayStr = thisMonth.date(day).format(_dayFormat);

                        this.days[i].day = day;
                        this.days[i].dayStr = dayStr;
                    }

                    i++;
                }
            }.bind(this));
        };

        return monthWidget;
    });
