define(['services/budget', 'dialogs/composedModal', 'plugins/dialog', 'viewmodels/formAddMoney'],
    function (budgetSvc, ComposedModal, dialog, FormAddMoney) {

        var year = function () {
            this.currentBudget = budgetSvc.get();
        };

        year.prototype.activate = function () {

        };

        year.prototype.daySelect = function (date) {

            var form = new FormAddMoney(function (moneyUnit) {

                this.currentBudget.addMoney(
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
