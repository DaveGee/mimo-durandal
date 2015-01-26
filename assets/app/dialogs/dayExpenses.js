define(['plugins/dialog', 'bootstrap'], function(dialog) {

    var ExpenseDialog = function(date) {
        this.autoclose = true;

        this.date = date;
    };

    ExpenseDialog.prototype.close = function() {
        dialog.close(this, null);
    };

    return ExpenseDialog;
});
