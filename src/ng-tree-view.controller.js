'use strict';

import async from 'async';
import templates from './templates';

export default ($scope, $timeout, $q, NgTreeViewService) => {
  'ngInject';

  $scope.options = {
    id: $scope._options.id || 0,
    lazy: $scope._options.lazy || false,
    indicators: angular.extend({
      folded: "[+]",
      unfolded: "[-]",
      loading: "[...]"
    }, $scope._options.indicators || {})
  }

  $scope.templates = templates;

  $scope.tree = [];

  $scope.pre = $scope._options.pre || ((item) => {
    let d = $q.defer();
    d.resolve([]);
    return d.promise;
  });

  NgTreeViewService
    .Init($scope._options.data, {
      dataSource: $scope._options.load
    })
    .then((items) => {
      $scope.tree = items;
      $scope._options.ready(NgTreeViewService);
    });

  $scope.onSelect = $scope._options.onSelect || ((item) => {
    let d = $q.deer();
    d.resolve()
    return d.promise;
  });

  $scope.itemSelected = (item) => {
    NgTreeViewService
      .Select(item)
      .then(() => {
        $scope.onSelect(item).then(() => {});
      });
  }

  $scope.toggleFolding = (item) =>  {
    NgTreeViewService
      .ToggleFold(item)
      .then(() => {});
  }
}
