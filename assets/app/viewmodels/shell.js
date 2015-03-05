define(['plugins/router', 'conf'], function (router, conf) {
    return {
        app: conf.app,

        router: router,

        activate: function () {

            router.map([
                {route: '', title: 'Budget', moduleId: 'viewmodels/index', nav: true},
                {route: 'year', title: 'Calendrier', moduleId: 'viewmodels/year', nav: true},

                {route: 'period/:p', title: 'Budget', moduleId: 'viewmodels/index', nav: true}

            ]).buildNavigationModel();

            return router.activate();

        }
    };
});
