define(['services/dataservice', 'moment'], function (ds, moment) {

    function fillPeriods(_budget) {
        var start = moment(_budget.starts),
            end = moment(_budget.ends),
            interval = 'month';

        var format = interval === 'month' ? 'MMMM' : 'DD MMM';

        this.period = [];

        while(start.isBefore(end)) {

            var date = start.clone();

            this.period.push({
                date: date,
                monthId: date.month(),
                label: date.format(format),
                balance: 0,
                isSelected: false
            });

            start.add(1, interval);
        }

        return _budget;
    }

    // public module and functions
    // ---------------------------

    var Index = function () {
        this.currentBudget = ds.getBudgetForYear(2015).then(fillPeriods.bind(this));
        this.period = [];
    };

    return Index;
});