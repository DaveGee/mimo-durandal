
define(['q'], function(Q) {

    // Mock.. real one will be retrieved from API
    var Budget = function(year) {

        this.year = year;

    };

    return {

        getForYear: function(y) {
            return Q(new Budget(y));
        }
    };
});