
define(['q'], function(Q) {

    var Budget = function(year) {

        this.year = year;

    };

    return {

        getForYear: function(y) {
            return Q(new Budget(y));
        }
    };
});