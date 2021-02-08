(function () {
  'use strict';

  angular.module('frontend.consumers', [
    'angular.chips',
    'ngMessages',
    'angularUtils.directives.dirPagination',
    'frontend.lang'
  ]);

  // Module configuration
  angular.module('frontend.consumers')
    .config([
      '$stateProvider',
      'lang',
      function config($stateProvider, lang) {
        $stateProvider
          .state('consumers', {
            parent: 'frontend',
            url: '/consumers',
            data: {
              activeNode: true,
              pageName: lang[lang.__default_lang__].Consumer.title,
              pageDescription: lang[lang.__default_lang__].Consumer.desc,
              //displayName : "consumers",
              prefix: '<i class="material-icons">perm_identity</i>'
            },

            views: {
              'content@': {
                templateUrl: 'js/app/consumers/index.html',
                controller: 'ConsumersController'
              }
            }
          })
          .state('consumers.edit', {
            url: '/:id',
            data: {
              pageName: "Edit Consumer",
              pageDescription: null,
              displayName: "edit consumer",
              prefix: '<i class="material-icons">perm_identity</i>'
            },
            views: {
              'content@': {
                templateUrl: 'js/app/consumers/edit-consumer.html',
                controller: 'ConsumerController',

              },
              'details@consumers.edit': {
                templateUrl: 'js/app/consumers/details/consumer-details.html',
                controller: 'ConsumerDetailsController',
              },
              'groups@consumers.edit': {
                templateUrl: 'js/app/consumers/groups/consumer-groups.html',
                controller: 'ConsumerGroupsController'
              },
              'credentials@consumers.edit': {
                templateUrl: 'js/app/consumers/credentials/consumer-credentials.html',
                controller: 'ConsumerCredentialsController'
              },
              'apis@consumers.edit': {
                templateUrl: 'js/app/consumers/apis/consumer-apis.html',
                controller: 'ConsumerApisController'
              },
              'plugins@consumers.edit': {
                templateUrl: 'js/app/consumers/plugins/consumer-plugins.html',
                controller: 'ConsumerPluginsController'
              },
              'services@consumers.edit': {
                templateUrl: 'js/app/consumers/services/consumer-services.html',
                controller: 'ConsumerServicesController'
              },
              'routes@consumers.edit': {
                templateUrl: 'js/app/consumers/routes/consumer-routes.html',
                controller: 'ConsumerRoutesController'
              }
            },
            resolve: {
              _consumer: [
                'ConsumerService',
                '$stateParams',
                function (ConsumerService, $stateParams) {
                  return ConsumerService.findById($stateParams.id)
                }
              ],
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
              _activeNode: [
                'NodesService',
                function resolve(NodesService) {
                  return NodesService.isActiveNodeSet()
                }
              ],
            },
          })

      }
    ])
  ;
}());
