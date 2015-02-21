define(['moment', 'q', 'services/dataservice', 'dialogs/composedModal', 'plugins/dialog', 'viewmodels/formAddMoney', 'toastr', 'plugins/observable'],
    function (moment, Q, ds, ComposedModal, dialog, FormAddMoney, toastr, observable) {

        var _dayFormat = 'YYYY-MM-DD';

        var monthWidget = function () {
            this.days = [];

            this.daysInWeek = [0, 1, 2, 3, 4, 5, 6];
            this.weeksInMonth = [0, 1, 2, 3, 4, 5];

            this.money = {
                // 'YYYY-MM-DD': [ { moneyUnit }, { moneyUnit } ]
            };

            observable.defineProperty(this, 'monthBalance', function() {

                return _.reduce(_.values(this.money), function(balance, dayArr) {
                    return balance + _.reduce(dayArr, function(dayBalance, dayData) {
                            return dayData.type === 'credit' ? dayBalance + dayData.guessedAmount :
                                dayBalance - dayData.guessedAmount;
                        }, 0);
                }, 0);

            }.bind(this));

        };

        monthWidget.prototype.selectMonth = function() {

            toastr['success']('Nice!');
        };

        monthWidget.prototype.dayClick = function (day) {

            var date = moment({ day: day.day, month: this.monthNb, year: this.budget.year });

            var form = new FormAddMoney(function (moneyUnit) {

                moneyUnit.day = date;

                ds.addMoneyToBudget(this.budget.id, moneyUnit).then(function (moneyUnit) {

                    var date = moment(moneyUnit.day);
                    var dateId = date.format(_dayFormat);

                    if (!this.money[dateId]) {
                        this.money[dateId] = [];
                    }
                    this.money[dateId].push(moneyUnit);
                    this.days[day.id].hasMoney = true;

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

            return this.initCalendar();
        };

        monthWidget.prototype.initCalendar = function () {

            var thisMonth = moment({
                year: this.budget.year,
                month: this.monthNb
            });

            var firstDayId = thisMonth.clone().startOf('month').weekday(),
                dayEnd = thisMonth.clone().endOf('month').date(),
                i = 0;

            return ds.getMonthMoney(this.budget.id, this.monthNb)
                .then(function (monthMoneyArr) {
                    // need to transform from : [{moneyUnit}, {moneyUnit}]
                    // to : {'yy-mm-dd':[{moneyUnit}, {moneyUnit}], 'yy-mm-dd': ...}

                    this.money = _.groupBy(monthMoneyArr, function (moneyUnit) {
                        return moment(moneyUnit.day).format(_dayFormat);
                    });

                }.bind(this))
                .then(function () {
                    while (i < 42) {

                        this.days[i] = {
                            id: i,
                            day: '',
                            dayStr: ''
                        };

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
