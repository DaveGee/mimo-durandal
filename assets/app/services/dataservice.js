define(['q'], function(Q) {

    var user = 'dge';

    var dataService = {
        getBudgetForYear: function(year) {
            return Q({ year: year, owner: user, money: {} });
        },

        addMoneyToBudget: function(budgetId, date, amount, type) {
            return Q({ amount: amount, type: type, date: date });
        },

        getMonthMoney: function(budgetId, monthId) {
            return Q({
                monthId: monthId,
                money: [
                    {  }
                ]
            })
        }
    };

    return dataService;
});
