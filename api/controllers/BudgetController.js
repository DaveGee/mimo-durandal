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
        })
            .exec(function createCB(err, created) {
                return res.json({
                    notice: 'Created budget for ' + created.year + ' for user ' + created.owner
                });
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
        var year = req.params.all().year || moment().year();

        var m = moment({year: year, month: month});
        var som = new Date(m.startOf('month').toDate()),
            eom = new Date(m.endOf('month').toDate());

        Budget.findOne({id: budgetId})
            .populate('money', { day:  { '>': som, '<=': eom } })
            .then(function(budget) {

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

