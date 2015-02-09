define(['plugins/dialog', 'bootstrap', 'services/budget'], function (dialog, bootstrap, budgetSvc) {

    var ExpenseDialog = function (budget, date) {
        this.autoclose = true;

        this.date = date;

        this.budget = budget;

        this.moneyUnit = {
            amount: null,
            type: 'debit',
            isMonthly: false,
            description: null,
            date: date.format('YYYY-MM-DD')
        };

        console.log(budget);
    };

    ExpenseDialog.prototype.add = function () {
        this.budget.addMoney(this.moneyUnit);
    };

    ExpenseDialog.prototype.close = function () {
        dialog.close(this, null);
    };

    return ExpenseDialog;
});
