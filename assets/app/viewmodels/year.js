define(['services/budget'], function (budgetSvc) {
    var year = function () {


    };

    year.prototype.activate = function() {
        this.currentBudget = budgetSvc.getForYear(2015);
    };

    return year;
});
