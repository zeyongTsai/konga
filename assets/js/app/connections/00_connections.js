
(function() {
    'use strict';

    angular.module('frontend.connections', [
        'frontend.lang'
    ]);

    // Module configuration
    angular.module('frontend.connections')
        .config([
            '$stateProvider',
            'lang',
            function config($stateProvider, lang) {
                $stateProvider
                    .state('connections', {
                        url: '/connections',
                        parent : 'frontend',
                        data : {
                            access : 0,
                            pageName : lang[lang.__default_lang__].Connection.title,
                            pageDescription : lang[lang.__default_lang__].Connection.desc,
                            prefix : '<i class="mdi mdi-cast-connected"></i>'
                        },
                        views: {
                            'content@': {
                                templateUrl: 'js/app/connections/index.html',
                                controller: 'ConnectionsController'
                            },

                        }
                    })
            }
        ])
    ;
}());
