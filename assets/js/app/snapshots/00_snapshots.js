
(function() {
    'use strict';

    angular.module('frontend.snapshots', [
        'frontend.lang'
    ]);

    // Module configuration
    angular.module('frontend.snapshots')
        .config([
            '$stateProvider',
            'lang',
            function config($stateProvider, lang) {
                $stateProvider
                    .state('snapshots', {
                        url: '/snapshots',
                        parent : 'frontend',
                        data : {
                            access : 2,
                            pageName : lang[lang.__default_lang__].Snapshot.title,
                            pageDescription : lang[lang.__default_lang__].Snapshot.desc,
                            prefix : '<i class="mdi mdi-camera"></i>'
                        },
                        views: {
                            'content@': {
                                templateUrl: 'js/app/snapshots/index.html',
                                controller: 'SnapshotsController'
                            },
                            'list@snapshots': {
                                templateUrl: 'js/app/snapshots/views/snapshots-list.html',
                                controller: 'SnapshotsListController',
                            },
                            'scheduled@snapshots': {
                                templateUrl: 'js/app/snapshots/views/snapshots-scheduled.html',
                                controller: 'SnapshotsScheduledController',
                            },

                        }
                    })
                    .state('snapshots.show', {
                        url: '/:id',
                        parent : 'snapshots',
                        data : {
                            access :  2,
                            pageName : "Snapshot Details",
                            displayName : "snapshot details",
                            pageDescription : null,
                            prefix : '<i class="mdi mdi-36px mdi-camera"></i>'
                        },
                        views: {
                            'content@': {
                                templateUrl: 'js/app/snapshots/views/snapshot.html',
                                controller: 'SnapshotController'
                            },
                        }
                    });
            }
        ])
    ;
}());
