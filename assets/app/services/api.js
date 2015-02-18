
define(['q'], function(Q) {

    function isError(status) {
        return status !== 200;
    }

    return {
        get: function(url, params) {
            var deferred = Q.defer();

            io.socket.get(url, params, function(data, jwres) {

                if(isError(jwres.statusCode)) {
                    deferred.reject(new Error(jwres.statusCode, jwres.body));
                } else {
                    deferred.resolve(data);
                }
            });

            return deferred.promise;
        },

        put: function() {

        },

        post: function(url, params) {
            var deferred = Q.defer();

            io.socket.post(url, params, function(data, jwres) {

                if(isError(jwres.statusCode)) {
                    deferred.reject(new Error(jwres.statusCode), jwres.body);
                } else {
                    deferred.resolve(data);
                }
            });

            return deferred.promise;
        },

        del: function() {

        }
    }

});