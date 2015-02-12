/**
 * BudgetController
 *
 * @description :: Server-side logic for managing Budgets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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

    addMoneyToBudget: function (req, res) {

    },

    moneyForMonth: function(req, res) {
        var budgetId = req.params.all().id;
        var month = req.params.all().month;
        var year = req.params.all().year;

        Budget.findOne({id: budgetId})
            .populate('money', { day:  { '>': new Date('2015-02-01'), '<': new Date('2015-03-01') } })
            .then(function(budget) {

                console.log('ok', arguments);
                res.json(budget);
            })
            .catch(function(err) {
                console.log('err', err);
                res.serverError();
            })
    }
};

