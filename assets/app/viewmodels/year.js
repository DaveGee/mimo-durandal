define(['services/dataservice', 'dialogs/composedModal', 'plugins/dialog', 'viewmodels/formAddMoney', 'moment'],
    function (ds, ComposedModal, dialog, FormAddMoney, moment) {

        var year = function () {

            this.monthsMoney = [];
            this.balance = 0;

            this.currentBudget = ds.getBudgetForYear(2015);
        };

        year.prototype.daySelect = function (date) {

            var form = new FormAddMoney(function (moneyUnit) {

                ds.addMoneyToBudget(this.currentBudget.id,
                    date,
                    moneyUnit.amount,
                    moneyUnit.type,
                    moneyUnit.description,
                    moneyUnit.isMonthly
                ).then(function (updateMonth) {
                        //TODO: show toast

                        this.currentBudget.money[updateMonth.id] = updateMonth;

                        console.log(updateMonth);
                    }.bind(this));
            }.bind(this));

            dialog.show(new ComposedModal(date.format('dd DD MMM YYYY'), form/*, [{label: 'Terminer', id: 'end'}]*/))
                .then(function (result) {
                    //console.log(result);
                });

        };

        return year;
    });
