define(['q'], function(Q) {

    var user = 'dge';

    var dataService = {
        getBudgetForYear: function(year) {
            return Q({ year: year, owner: user, money: [] });
        },

        addMoneyToBudget: function(budgetId, amount, type) {
            return Q({ amount: amount, type: type });
        }
    };

    return dataService;
});
