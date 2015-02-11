define(['q'], function (Q) {

    var user = 'dge';

    var dataService = {
        getBudgetForYear: function (year) {

            return Q({
                year: year, owner: user, money: [
                    {
                        '2015-01-15': {date: '2015-01-15', amount: 1000, type: 'credit'}
                    },
                    null, // nothing for feb.
                    {
                        '2015-03-17': {date: '2015-03-17', amount: 500, type: 'debit'}
                    }
                ]
            });
        },

        addMoneyToBudget: function (budgetId, date, amount, type) {
            return Q({amount: amount, type: type, date: date});
        },

        getMonthMoney: function (budgetId, monthId) {
            return Q({
                monthId: monthId,
                money: [
                    {date: '2015-01-15', amount: 1000, type: 'credit'},
                    {date: '2015-03-17', amount: 500, type: 'debit'}
                ]
            })
        }
    };

    return dataService;
});
