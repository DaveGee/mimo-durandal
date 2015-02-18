
define(['q'], function(Q) {

    return {
        get: function(url, params) {
            var deferred = Q.defer();

            io.socket.get(url, params, function(data, jwres) {

                deferred.resolve(data);
            });

            return deferred.promise;
        },

        put: function() {

        },

        post: function() {

        },

        del: function() {

        }
    }

});