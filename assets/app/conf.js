define(['moment', 'toastr'], function (moment, toastr) {

    // add custom bindings
    require(['bindings/index']);

    // configure application
    moment.locale('fr-CH');

    // configure toastr app-wide
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": 10,
        "hideDuration": 10,
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "swing",
        "showMethod": "slideDown",
        "hideMethod": "slideUp"
    }

    // return app config
    return {
        app: {
            version: '0.1',
            name: 'MiMo'
        },

        api: {
            url: 'http://localhost:1337'
        }
    };

});
