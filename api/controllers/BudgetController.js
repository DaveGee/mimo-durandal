/**
 * BudgetController
 *
 * @description :: Server-side logic for managing Budgets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var moment = require('moment');

module.exports = {

    // get the budget, and creates one if necessary
    // get  /Budget/:owner/:year
    getOrCreate: function (req, res) {
        var params = req.params.all();

        var budgetToFind = {
            owner: params.owner,
            year: params.year
        };

        Budget.findOrCreate(budgetToFind, budgetToFind)
            .populate('money')
            .then(function (budget) {
                res.json(budget);
            })
            .catch(function (err) {
                res.serverError(err);
            });
    },

    // post /Budget/:id/addMoney
    // content : date, amount
    addMoneyToBudget: function (req, res) {
        var params = req.params.all();

        params.moneyUnit.budget = params.id;

        MoneyUnit.create(params.moneyUnit)
            .then(function (result) {
                res.ok(result);
            }).catch(function (err) {
                res.serverError(err);
            });

    }



    /*
     // post /Budget
     create: function (req, res) {
     var params = req.params.all();

     Budget.create({
     owner: params.owner,
     year: params.year
     }).then(function(created) {
     return res.json(created);
     }).catch(function(err) {
     return res.serverError(err);
     });
     },

     // get  /Budget/:id/moneyForMonth/:month
     moneyForMonth: function(req, res) {
     var budgetId = req.params.all().id;
     var month = req.params.all().month || moment().month();

     Budget.findOne({id: budgetId})
     .populate('money', { monthId: month })
     .then(function(budget) {

     budget.money.forEach(function(m){
     console.log(m.day, m.monthId());
     });

     if(budget && budget.money) {
     res.json(budget.money);
     } else {
     res.notFound();
     }
     })
     .catch(function(err) {
     res.serverError(err);
     })
     }*/
};

