define([], function () {


    var FormAddMoney = function (newMoneyCb) {

        this.newMoneyCb = newMoneyCb || function() {};

        this.reset();
    };

    FormAddMoney.prototype.reset = function () {
        this.amount = null;
        this.type = 'debit';
        this.isMonthly = false;
        this.description = null;
    };

    FormAddMoney.prototype.addMoney = function() {

        this.newMoneyCb({
            amount: this.amount,
            type: this.type,
            isMonthly: this.isMonthly,
            description: this.description
        });

        this.reset();
    };

    return FormAddMoney;
});

