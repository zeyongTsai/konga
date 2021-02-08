(function () {
  'use strict';

  angular.module('frontend.settings', ['frontend.lang']);

  // Module configuration
  angular.module('frontend.settings')
    .config([
      '$stateProvider',
      'lang',
      function config($stateProvider, lang) {
        $stateProvider
          .state('settings', {
            url: '/settings',
            parent: 'frontend',
            data: {
              access: 0,
              pageName: lang[lang.__default_lang__].Setting.title,
              displayName: lang[lang.__default_lang__].Setting.desc,
              prefix: '<i class="mdi mdi-settings"></i>'
            },
            views: {
              'content@': {
                templateUrl: 'js/app/settings/index.html',
                controller: 'SettingsController',
                resolve: {
                  _integrations : ['$http', function ($http) {
                    return $http.get('api/settings/integrations');
                  }]
                }

              }
            }
          })

      }
    ])
  ;
}());
