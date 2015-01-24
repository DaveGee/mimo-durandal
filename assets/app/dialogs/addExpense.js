define(['plugins/dialog'], function(dialog) {

    var ExpenseDialog = function() {
        this.autoclose = true;
    };

    ExpenseDialog.prototype.close = function() {
        dialog.close(this, null);
    }

    return ExpenseDialog;
});
