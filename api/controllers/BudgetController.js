/**
 * BudgetController
 *
 * @description :: Server-side logic for managing Budgets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var moment = require('moment');

module.exports = {

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

    get: function(req, res) {
        var paras = req.params.all();

        var budgetToFind = {
            owner: params.owner,
            year: params.year
        };

        Budget.findOrCreate(budgetToFind, budgetToFind)
            .then(function(budget) {
                res.json(budget);
            })
            .catch(function(err) {
                res.serverError(err);
            });
    },

    addMoneyToBudget: function (req, res) {


    },

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
    }
};

