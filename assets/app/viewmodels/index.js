define(['services/dataservice', 'moment', 'plugins/observable', 'viewmodels/formAddMoney'],
    function (ds, moment, observable, FormAddMoney) {

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

        // public module and functions
        // ---------------------------

        var Index = function () {
            var self = this;
            this.periods = [];

            this.selectedInterval;

            this.currentBudget = ds.getBudgetForYear(2015).then(function (b) {
                observable.convertObject(b);
                this.periods = createPeriods(b);
                return b;
            }.bind(this));

            this.form = new FormAddMoney('title', this.addMoney.bind(this));
            /*this.form = new FormAddMoney('title', function (moneyUnit) {

                moneyUnit.day = date;

                ds.addMoneyToBudget(this.currentBudget.id, moneyUnit).then(function () {
                    //TODO: show toast

                    this.currentBudget.money[moneyUnit.day.format('YYYY-MM-DD')];

                    console.log(updateMonth);
                }.bind(this));
            }.bind(this));*/
        };

        Index.prototype.filteredUnits = function (interval) {
            return this.currentBudget.money;
        };

        Index.prototype.addMoney = function (moneyUnit) {

            if(!moneyUnit.day) {
                var m = moment(this.selectedInterval ? this.selectedInterval.date : this.currentBudget.ends);
                moneyUnit.day = m.toDate();
                moneyUnit.monthId = m.month();
            }
            this.currentBudget.money.push(moneyUnit);
        };

        return Index;
    });