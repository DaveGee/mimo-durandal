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

        // public module and functions
        // ---------------------------

        var Index = function () {
            var self = this;
            this.periods = [];

            this.selectedInterval = null;

            this.currentBudget = ds.getBudgetForYear(2015).then(function (b) {
                observable.convertObject(b);
                this.periods = createPeriods(b);
                return b;
            }.bind(this));

            this.form = new FormAddMoney('title', this.addMoney.bind(this));
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

            ds.addMoneyToBudget(this.currentBudget.id, moneyUnit).then(function () {
                this.currentBudget.money.push(moneyUnit);

                toastr.success('Ajouté ' + moneyUnit.guessedAmount + ' au budget');

            }.bind(this));
        };

        return Index;
    });