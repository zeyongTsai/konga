/*
 * @Author: caizeyong
 * @Date: 2020-10-29 09:55:47
 * @Description: 
 */

(function() {
    'use strict';

    angular.module('frontend.upstreams', [
       'frontend.lang'
    ]);

    // Module configuration
    angular.module('frontend.upstreams')
        .config([
            '$stateProvider',
            'lang',
            function config($stateProvider, lang) {
                $stateProvider
                    .state('upstreams', {
                        parent : 'frontend',
                        url: '/upstreams',
                        data : {
                            activeNode : true,
                            pageName : lang[lang.__default_lang__].Upstreams.title,
                            pageDescription : lang[lang.__default_lang__].Upstreams.desc,
                            //displayName : "upstreams",
                            prefix : '<i class="material-icons">&#xE8F2;</i>'
                        },
                        views: {
                            'content@': {
                                templateUrl : 'js/app/upstreams/index.html',
                                controller  : 'UpstreamsController'
                            }
                        }
                    })
                    .state('upstreams.edit', {
                        url: '/:id',
                        data : {
                            pageName : "Edit Upstream",
                            displayName : "edit",
                            pageDescription : null,
                            prefix : '<i class="material-icons">&#xE8F2;</i>'
                        },
                        views: {
                            'content@': {
                                templateUrl : 'js/app/upstreams/edit.html',
                                controller: 'EditUpstreamController',
                            },
                            'details@upstreams.edit': {
                                templateUrl: 'js/app/upstreams/edit-details.html',
                                controller:'EditUpstreamDetailsController',
                            },
                            'targets@upstreams.edit': {
                                templateUrl: 'js/app/upstreams/targets/targets.html',
                                controller: 'EditUpstreamTargetsController',
                            },
                            'alerts@upstreams.edit': {
                                templateUrl: 'js/app/upstreams/alerts/alerts.html',
                                controller: 'EditUpstreamAlertsController',
                            },
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
                        }
                    })
            }
        ])
    ;
}());
