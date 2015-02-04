define(['plugins/dialog', 'bootstrap'], function(dialog) {

    var ExpenseDialog = function(date) {
        this.autoclose = true;

        this.date = date;

        this.moneyUnit = {
            amount: null,
            type: 'debit',
            isMonthly: false,
            description: null
        };
    };

    ExpenseDialog.prototype.close = function() {
        dialog.close(this, null);
    };

    return ExpenseDialog;
});
