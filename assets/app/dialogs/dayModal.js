define(['plugins/dialog', 'bootstrap'], function (dialog, bootstrap) {

    var ExpenseDialog = function (date, addMoneyCb) {
        this.autoclose = true;

        this.date = date;

        if(typeof addMoneyCb !== 'function') {
            throw "No valid callback method for modal";
        }

        this.addMoneyCb = addMoneyCb;

        this.moneyUnit = {
            amount: null,
            type: 'debit',
            isMonthly: false,
            description: null,
            date: date.format('YYYY-MM-DD')
        };
    };

    ExpenseDialog.prototype.add = function () {

        this.addMoneyCb(this.moneyUnit);
    };

    ExpenseDialog.prototype.close = function () {
        dialog.close(this, null);
    };

    return ExpenseDialog;
});
