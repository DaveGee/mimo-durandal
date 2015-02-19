define(['q', 'services/api'], function (Q, api) {

    var user = {
        id: 'dge'
    };

    function handleErrors(err, details) {
        console.log('API Error', err, details);
    }

    var dataService = {
        getBudgetForYear: function (year) {

            return api.get('/budget/' + user.id + '/' + year).catch(handleErrors);
        },

        addMoneyToBudget: function (budgetId, moneyUnit) {

            return api.post('/budget/' + budgetId + '/addMoney', {
                moneyUnit : moneyUnit
            }).catch(handleErrors);
        },

        getMonthMoney: function (budgetId, monthId) {
            return api.get('/moneyunit?budget=' + budgetId + '&monthId=' + monthId).catch(handleErrors);
        }
    };

    return dataService;
});
