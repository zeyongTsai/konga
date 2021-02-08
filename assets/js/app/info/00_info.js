(function() {
    'use strict';

    angular.module('frontend.info', ['frontend.lang']);

    // Module configuration
    angular.module('frontend.info')
        .config([
            '$stateProvider',
            'lang',
            function config($stateProvider, lang) {
                $stateProvider
                    .state('info', {
                        parent: 'frontend',
                        url: '/info',
                        data : {
                            activeNode : true,
                            pageName : lang[lang.__default_lang__].Info.title,
                            access: 2, // Only admins can access this route
                            // displayName : "node info",
                            pageDescription : lang[lang.__default_lang__].Info.desc,
                            prefix : '<i class="material-icons text-primary">&#xE88F;</i>'
                        },

                        views: {
                            'content@': {
                                templateUrl: 'js/app/info/index.html',
                                controller: 'InfoController'
                            }
                        },

                    })
                ;
            }
        ])
    ;
}());
