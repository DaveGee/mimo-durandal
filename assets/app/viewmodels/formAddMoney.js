define(['plugins/observable'], function (observable) {


    var FormAddMoney = function (title, newMoneyCb) {

        this.newMoneyCb = newMoneyCb || function() {};

        this.reset();

        observable(this, 'type').subscribe(function(value){
            if(value === 'debit') {
                this.guessedAmount = -Math.abs(this.guessedAmount);
            }

            if(value === 'credit') {
                this.guessedAmount = Math.abs(this.guessedAmount);
            }
        }.bind(this));

        observable(this, 'guessedAmount').subscribe(function(value) {
            if(value < 0 && this.type === 'credit') {
                this.guessedAmount = Math.abs(this.guessedAmount);
            }

            if(value > 0 && this.type === 'debit') {
                this.guessedAmount = -Math.abs(this.guessedAmount);
            }
        }.bind(this));
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

