define(['services/dataservice', 'moment', 'plugins/observable'],
    function (ds, moment, observable) {

    function fillPeriods(_budget) {
        var start = moment(_budget.starts),
            end = moment(_budget.ends),
            interval = 'month';

        var format = interval === 'month' ? 'MMMM' : 'DD MMM';
        var periods = [];

        while(start.isBefore(end)) {

            var date = start.clone();

            var period = {
                date: date,
                monthId: date.month(),
                label: date.format(format),
                isSelected: false
            };

            observable.defineProperty(period, 'plannedBalance', function() {
                return _.reduce(_budget.money, function(total, mu) {
                    if(mu.monthId === this.monthId) {
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
        this.periods = [];
        this.currentBudget = ds.getBudgetForYear(2015).then(function(b) {
            observable.convertObject(b);
            this.periods = fillPeriods(b);
            return b;
        }.bind(this));
    };

    Index.prototype.addMoney = function(moneyUnit) {
        this.currentBudget.money.push({
            guessedAmount: -1525.25,
            day: new Date().getTime(),
            description: '',
            monthId: moment().month()
        });

    };

    return Index;
});