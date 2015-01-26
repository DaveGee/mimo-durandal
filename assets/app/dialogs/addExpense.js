define(['plugins/dialog'], function(dialog) {

    var ExpenseDialog = function(moneyType, date) {
        this.autoclose = true;

        this.date = date;
        this.moneyType = moneyType;
    };

    ExpenseDialog.prototype.close = function() {
        dialog.close(this, null);
    };

    return ExpenseDialog;
});
