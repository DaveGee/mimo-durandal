requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'dge': '../lib/dge',
        'durandal': '../lib/durandal/js',
        'plugins': '../lib/durandal/js/plugins',
        'transitions': '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.1.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'moment': '../lib/moment-with-locales/index',
        'q': '../lib/q/q'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});

var widgets = ['month'];

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'conf', 'q', 'durandal/composition'],
    function (system, app, viewLocator, conf, Q, composition) {
        //>>excludeStart("build", true);
        system.debug(true);
        //>>excludeEnd("build");

        app.title = 'MiMo';

        app.configurePlugins({
            router: true,
            dialog: true,
            observable: true,
            widget: {kinds : widgets}
        });

        system.defer = function (action) {
            var deferred = Q.defer();
            action.call(deferred, deferred);
            var promise = deferred.promise;
            deferred.promise = function () {
                return promise;
            };
            return deferred;
        };

        composition.addBindingHandler('hasFocus');

        app.start().then(function () {
            //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
            //Look for partial views in a 'views' folder in the root.
            viewLocator.useConvention();

            //Show the app by setting the root view model for our application with a transition.
            app.setRoot('viewmodels/shell');//, 'entrance');
        });
    });
