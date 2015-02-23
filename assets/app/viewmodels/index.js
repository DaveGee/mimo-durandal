define(['services/dataservice'], function (ds) {

    var Index = function() {
        this.currentBudget = ds.getBudgetForYear(2015);
    };

    return Index;
});