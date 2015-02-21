define([], function () {


    var FormAddMoney = function (newMoneyCb) {

        this.newMoneyCb = newMoneyCb || function() {};

        this.reset();
    };

    FormAddMoney.prototype.reset = function () {
        this.guessedAmount = null;
        this.isMonthly = false;
        this.type = 'debit';
        this.description = null;
    };

    FormAddMoney.prototype.addMoney = function() {

        this.newMoneyCb({
            guessedAmount: this.guessedAmount,
            isMonthly: this.isMonthly,
            description: this.description
        });

        this.reset();
    };

    return FormAddMoney;
});

