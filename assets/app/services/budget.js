define(['q', 'moment', 'services/dataservice'], function (Q, moment, ds) {


    var cachedBudget = null;

    /**
     * Add basic functionality to budget object
     * @param budget
     */
    function init(budget) {
        if (!budget) {
            throw "Budget not valid";
        }

        budget.addMoney = function (dateStr, amount, type, description, isMonthly) {

            //try to add it to sails
            return ds.addMoneyToBudget(budget.id, amount, type)
                .then(function (moneyObj) {

                    // add money to cached object on which durandal binds ?
                    budget.money[dateStr] = moneyObj;


                    // show toast
                });
        };
    }

    /**
     * Returns cached or new budget, can be called without year
     * @param year
     * @returns {*}
     */
    function getCurrentBudget(year) {
        if (!year)
            year = moment().year();

        if (!cachedBudget) {
            return ds.getBudgetForYear(year).then(function (b) {
                init(b);

                cachedBudget = b;

                return b;
            });
        } else {
            return Q(cachedBudget);
        }
    }

    return {
        get: getCurrentBudget
    };
});