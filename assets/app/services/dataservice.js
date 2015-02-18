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

            /*return Q({
                year: year, owner: user, money: [
                    {
                        '2015-01-25': [
                            {date: '2015-01-25', amount: 1000, type: 'credit'},
                            {date: '2015-01-25', amount: 150.45, type: 'debit'}
                        ]
                    },
                    null, // nothing for feb.
                    {
                        '2015-03-17': [
                            {date: '2015-03-17', amount: 500, type: 'debit'}
                        ],
                        '2015-03-19': [

                        ]
                    }
                ]
            });*/
        },

        addMoneyToBudget: function (budgetId, moneyUnit) {

            return api.post('/budget/' + budgetId + '/addMoney', {
                moneyUnit : moneyUnit
            }).catch(handleErrors);


            /*return Q({
                monthNb: moment(date).month(),

                amount: amount, type: type, date: date});*/
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
