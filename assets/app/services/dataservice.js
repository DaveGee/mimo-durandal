define(['q', 'services/api'], function (Q, api) {

    var user = {
        id: 'dge'
    };
    var mockBudget = {};

    var dataService = {
        getBudgetForYear: function (year) {

            return api.get('/budget/' + user.id + '/' + year);

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

        addMoneyToBudget: function (budgetId, date, amount, type) {
            return Q({
                monthNb: moment(date).month(),

                amount: amount, type: type, date: date});
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
