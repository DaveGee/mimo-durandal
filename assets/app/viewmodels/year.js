define(['services/dataservice', 'dialogs/composedModal', 'plugins/dialog', 'viewmodels/formAddMoney'],
    function (ds, ComposedModal, dialog, FormAddMoney) {

        var year = function () {
            this.currentBudget = ds.getBudgetForYear(2015);
        };

        year.prototype.activate = function () {

        };

        year.prototype.daySelect = function (date) {

            var form = new FormAddMoney(function (moneyUnit) {

                ds.addMoneyToBudget(this.currentBudget.id,
                    date,
                    moneyUnit.amount,
                    moneyUnit.type,
                    moneyUnit.description,
                    moneyUnit.isMonthly
                ).then(function (data) {
                        //TODO: show toast
                        console.log(data);
                    });
            }.bind(this));

            dialog.show(new ComposedModal(date.format('dd DD MMM YYYY'), form/*, [{label: 'Terminer', id: 'end'}]*/))
                .then(function (result) {
                    //console.log(result);
                });

        };

        return year;
    });
