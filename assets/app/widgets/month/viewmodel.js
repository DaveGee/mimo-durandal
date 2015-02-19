define(['moment', 'q', 'services/dataservice', 'dialogs/composedModal', 'plugins/dialog', 'viewmodels/formAddMoney'],
    function (moment, Q, ds, ComposedModal, dialog, FormAddMoney) {

        var monthWidget = function () {
            this.days = [];

            this.daysInWeek = [0, 1, 2, 3, 4, 5, 6];
            this.weeksInMonth = [0, 1, 2, 3, 4, 5];

            this.money = {
                // 'YYYY-MM-DD': [ { moneyUnit }, { moneyUnit } ]
            };

        };

        monthWidget.prototype.dayClick = function (day) {

            var date = moment({ day: day.day, month: this.monthNb, year: this.budget.year });

            var form = new FormAddMoney(function (moneyUnit) {

                moneyUnit.day = date;

                ds.addMoneyToBudget(this.budget.id, moneyUnit).then(function (moneyUnit) {

                    var date = moment(moneyUnit.day);
                    var dateId = date.format('YYYY-MM-DD');

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
                        return moment(moneyUnit.day).format('YYYY-MM-DD');
                    });

                }.bind(this))
                .then(function () {
                    while (i < 42) {

                        if (i <= dayEnd + firstDayId - 1 && i >= firstDayId) {

                            var day = i - firstDayId + 1;
                            var dayStr = thisMonth.date(day).format('YYYY-MM-DD');

                            this.days[i] = {
                                id: i,
                                day: day,
                                hasMoney: this.money[dayStr] && this.money[dayStr].length > 0
                            };

                        } else {
                            this.days[i] = {
                                id: i,
                                day: '',
                                hasMoney: false
                            };
                        }

                        i++;
                    }
                }.bind(this));
        };

        return monthWidget;
    });
