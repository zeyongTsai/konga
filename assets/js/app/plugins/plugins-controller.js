(function () {
  'use strict';

  angular.module('frontend.plugins')
    .controller('PluginsController', [
      '_', '$scope', '$log', '$state', 'ApiService', 'PluginsService', 'MessageService',
      '$uibModal', 'DialogService', 'PluginModel', 'ListConfig', 'UserService',
      function controller(_, $scope, $log, $state, ApiService, PluginsService, MessageService,
                          $uibModal, DialogService, PluginModel, ListConfig, UserService) {

        PluginModel.setScope($scope, false, 'items', 'itemCount');
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig('plugin', PluginModel)));
        $scope.user = UserService.user();
        $scope.onEditPlugin = onEditPlugin
        $scope.updatePlugin = updatePlugin;
        $scope.togglePlugin = togglePlugin;
        $scope.getContext   = getContext;
        $scope.showType = 1 // 1 table 2 group by scope 3 group by target


        /**
         * ----------------------------------------------------------------------
         * Functions
         * ----------------------------------------------------------------------
         */


        function togglePlugin(plugin) {
          plugin.enabled = !plugin.enabled;
          updatePlugin(plugin);
        }

        function updatePlugin(plugin) {

          if (!$scope.user.hasPermission('plugins', 'update')) {

            MessageService.error("You don't have permissions to perform this action")
            return false;
          }

          PluginsService.update(plugin.id, {
            enabled: plugin.enabled
          })
            .then(function (res) {
              $log.debug("updatePlugin", res)
              // $scope.items.data[$scope.items.data.indexOf(plugin)] = res.data;

            }).catch(function (err) {
            $log.error("updatePlugin", err)
          })
        }


        function onEditPlugin(item) {

          if (!$scope.user.hasPermission('plugins', 'edit')) {
            return false;
          }

          $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'js/app/plugins/modals/edit-plugin-modal.html',
            size: 'lg',
            controller: 'EditPluginController',
            resolve: {
              _plugin: function () {
                return _.cloneDeep(item)
              },
              _schema: function () {
                return PluginsService.schema(item.name)
              }
            }
          });
        }

        // plugin group by scope
        function MakePluginsGroupByScope (list) {
          let result = [
            {
              name: 'api',
              plugins: []
            },
            {
              name: 'service',
              plugins: []
            },
            {
              name: 'route',
              plugins: []
            },
            {
              name: 'all',
              plugins: []
            }
          ]
          list.forEach(function(item){
            if (item.api) {
              result[0].plugins.push(item)
            } else if (item.service) {
              result[1].plugins.push(item)
            } else if (item.route) {
              result[2].plugins.push(item)
            } else {
              result[3].plugins.push(item)
            }
          })
          result = result.filter(function(item){
            return item.plugins.length > 0
          })
          return result
        }

        // plugin group by target id
        function MakePluginsGroupByTarget (list) {
          let groups = {}
          list.forEach(function(item){
            let id
            let type
            if (item.api) {
              id = item.api.id
              type = 'api'
            } else if (item.service) {
              id = item.service.id
              type = 'service'
            } else if (item.route) {
              id = item.route.id
              type = 'route'
            } else {
              id = 'all'
            }
            if (!groups[id]) {
              groups[id] = {
                name: id,
                type: type,
                plugins: []
              }
            }
            groups[id].plugins.push(item)
          })
          let all = groups.all
          delete groups.all
          let result = []
          Object.keys(groups).sort().map(function(k){
            result.push(groups[k])
          })
          if (all) {
            result.push(all)
          }
          return result
        }

        function _fetchData() {

          $scope.loading = true;
          PluginModel.load({
            size: $scope.itemsFetchSize
          }).then(function (response) {
            $scope.items = response;
            $scope.targetGroupsPlugins = MakePluginsGroupByTarget(response.data || [])
            $scope.scopeGroupsPlugins = MakePluginsGroupByScope(response.data || [])
            console.log("LOADED PLUGINS => ", $scope.items);
            $scope.loading = false;
          })
        }

        function getContext(plugin) {
          if(plugin.service) {
            return 'services'
          } else if(plugin.route) {
            return 'routes'
          } else if(plugin.api) {
            return 'apis'
          }else{
            return 'global'
          }
        }

        /**
         * ------------------------------------------------------------
         * Listeners
         * ------------------------------------------------------------
         */
        $scope.$on("plugin.added", function () {
          _fetchData()
        })

        $scope.$on("plugin.updated", function (ev, plugin) {
          _fetchData()
        })


        $scope.$on('user.node.updated', function (node) {
          _fetchData()
        })


        _fetchData();

      }
    ])
  ;
}());
