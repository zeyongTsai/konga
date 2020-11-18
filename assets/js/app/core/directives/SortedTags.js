
(function() {
  'use strict';

  angular.module('frontend.core.directives')
    .directive('sortedTags', function directive() {
      return {
        restrict: 'E',
        scope: {
          list: '=',
          tagChange: '&onChange'
        },
        replace: true,
        template : `<div class="sorted-tags">
          <div ng-repeat="item in tags" class="sorted-tags__item">
            <div><i>{{ item.name }}</i></div>
            <div>
              <span ng-repeat="tag in item.children" ng-click="toggleTag($event,tag)">{{ tag }}</span>
            </div>
          </div>
        </div>`,
        controller: [
          '$scope',
          function controller($scope) {
            $scope.tags = getSortedTagsByGroup($scope.list || [])
            $scope.$watch('list', function(newValue, oldValue){
              $scope.tags = getSortedTagsByGroup(newValue || [])
              $scope.selectedTags = []
              $scope.tagChange({list: $scope.list})
            })
            $scope.selectedTags = []
            $scope.toggleTag = function ($event, tag) {
              var index = $scope.selectedTags.indexOf(tag)
              if (index > -1) {
                $scope.selectedTags.splice(index, 1)
                $event.target.classList.remove('active')
              } else {
                $scope.selectedTags.push(tag)
                $event.target.classList.add('active')
              }
              var result = $scope.list.filter(function(item) {
                return $scope.selectedTags.every(function(tag){
                  return (item.tags || []).includes(tag)
                })
              })
              $scope.tagChange({list: result})
            }
            $scope.tagChange({list: $scope.list})


            function getSortedTagsByGroup (list) {
              var allTags = Array.from(new Set(list.flatMap(function(item){
                return item.tags || []
              }))).sort();

              var groupTags = {}
              allTags.map(function(tag){
                var c = tag.charAt(0)
                if (!groupTags[c]) {
                  groupTags[c] = {
                    name: c,
                    children: []
                  }
                }
                groupTags[c].children.push(tag)
              })

              let result = []
              Object.keys(groupTags).sort().map(function(k){
                result.push(groupTags[k])
              })

              return result
            }
          }
        ]
      };
    })
  ;
}());
