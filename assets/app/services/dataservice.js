define(['q'], function(Q) {

    var user = 'dge';

    var dataService = {
        getBudgetForYear: function(year) {
            return Q({ year: year, owner: user, money: {} });
        },

        addMoneyToBudget: function(budgetId, amount, type, date) {
            return Q({ amount: amount, type: type, date: date });
        }
    };

    return dataService;
});
