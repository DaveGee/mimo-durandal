define(['services/dataservice', 'moment', 'plugins/observable', 'viewmodels/formAddMoney', 'toastr'],
    function (ds, moment, observable, FormAddMoney, toastr) {

        function createPeriods(_budget) {
            var start = moment(_budget.starts),
                end = moment(_budget.ends),
                interval = _budget.interval || 'month';

            var format = interval === 'month' ? 'MMMM' : 'DD MMM';
            var periods = [];

            while (start.isBefore(end)) {

                var date = start.clone();

                var period = {
                    date: date,
                    monthId: date.month(),
                    label: date.format(format),
                    isSelected: false
                };

                observable.defineProperty(period, 'plannedBalance', function () {
                    return _.reduce(_budget.money, function (total, mu) {
                        if (mu.monthId === this.monthId) {
                            return total + mu.guessedAmount;
                        } else {
                            return total;
                        }
                    }.bind(this), 0);
                });

                periods.push(period);

                start.add(1, interval);
            }

            return periods;
        }

        function orderMoney(budget) {
            budget.money = _.sortBy(budget.money, 'day');
        }

        // public module and functions
        // ---------------------------

        var Index = function () {
            var self = this;
            this.periods = [];

            this.unitFilter = {
                period: null,
                order: {
                    data: 'day',
                    dir: 'asc'
                }
            };

            this.currentBudget = ds.getBudgetForYear(2015).then(function (b) {
                observable.convertObject(b);
                this.periods = createPeriods(b);

                orderMoney(b);

                return b;
            }.bind(this));

            this.form = new FormAddMoney('title', this.addMoney.bind(this));
        };

        Index.prototype.filteredUnits = function (interval) {
            if (this.unitFilter.period !== null) {
                return _.where(this.currentBudget.money, {monthId: this.unitFilter.period});
            } else {
                return this.currentBudget.money;
            }
        };

        Index.prototype.addMoney = function (moneyUnit) {

            if (!moneyUnit.day) {
                var m = moment(this.unitFilter.period !== null ? { month: this.unitFilter.period } : this.currentBudget.ends).endOf('month');
                moneyUnit.day = m.toDate();
                moneyUnit.monthId = m.month();
            }

            ds.addMoneyToBudget(this.currentBudget.id, moneyUnit).then(function () {
                this.currentBudget.money.push(moneyUnit);

                orderMoney(this.currentBudget);

                toastr.success('Ajouté ' + moneyUnit.guessedAmount + ' au budget');

            }.bind(this));
        };

        Index.prototype.selectPeriod = function (data) {
            this.unitFilter.period = (this.unitFilter.period === data.monthId ? null : data.monthId);
        };

        Index.prototype.showForm = function() {

        };

        return Index;
    });