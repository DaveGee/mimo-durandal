define(['services/budget'], function (budgetSvc) {
    var year = function () {
        this.currentBudget = budgetSvc.get();
    };

    year.prototype.activate = function() {

    };

    return year;
});
