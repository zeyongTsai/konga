
(function() {
    'use strict';

    angular.module('frontend.certificates', ['frontend.lang']);

    // Module configuration
    angular.module('frontend.certificates')
        .config([
            '$stateProvider',
            'lang',
            function config($stateProvider, lang) {
                $stateProvider
                    .state('certificates', {
                        parent : 'frontend',
                        url: '/certificates',
                        data : {
                            activeNode : true,
                            pageName : lang[lang.__default_lang__].Certificate.title,
                            pageDescription : lang[lang.__default_lang__].Certificate.desc,
                            //displayName : "certificates",
                            prefix : '<i class="material-icons text-primary">perm_identity</i>'
                        },
                        resolve: {
                          _gateway: [
                            'InfoService',
                            '$rootScope',
                            function (InfoService, $rootScope) {
                              return new Promise((resolve, reject) => {
                                var watcher = $rootScope.$watch('Gateway', function (newValue, oldValue) {
                                  if (newValue) {
                                    watcher(); // clear watcher
                                    resolve(newValue)
                                  }
                                })
                              })
                            }
                          ],
                        },
                        views: {
                            'content@': {
                                templateUrl: 'js/app/certificates/certificates.html',
                                controller: 'CertificatesController',
                                //resolve: {
                                //    _certificates : [
                                //        'PluginsService',
                                //        function(PluginsService) {
                                //            return PluginsService.load()
                                //        }
                                //    ]
                                //}
                            }
                        }
                    })
            }
        ])
    ;
}());
