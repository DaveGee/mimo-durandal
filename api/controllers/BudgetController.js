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
    }
};

