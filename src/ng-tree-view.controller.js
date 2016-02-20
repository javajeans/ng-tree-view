'use strict';

import templates from './templates';

export default ($scope, $q) => {
  'ngInject';

  $scope.templates = templates;

  $scope._initItem = (item) => {
    item._ngTree = {
      folded: true,
      selected: false
    };

    if (!angular.isArray((item.children || []))) {
      item.children = [];
    }

    return item;
  }

  $scope._initItems = (items) => {
    return items.map((item) => {
      return $scope._initItem(item);
    });
  }

  $scope.tree = $scope._initItems($scope._options.data);

  $scope.options = {
    id: $scope._options.id || 0,
    lazy: $scope._options.lazy || false,
    indicators: angular.extend({
      folded: "[+]",
      unfolded: "[-]",
      loading: "[...]"
    }, $scope._options.indicators || {})
  }

  $scope._lastSelectedItem = null;

  $scope.shouldLoad = $scope._options.shouldLoad || ((item) => {
    return true;
  })

  $scope.onSelect = $scope._options.onSelect || ((item) => {
    let d = $q.deer();
    d.resolve()
    return d.promise;
  })

  $scope.itemSelected = (item) => {
    $scope.onSelect(item)
      .then(() => {
        if ($scope._lastSelectedItem) {
          $scope._lastSelectedItem._ngTree.selected = false;
        }

        item._ngTree.selected = true;
        $scope._lastSelectedItem = item;
      });
  }

  $scope.load = $scope._options.load || ((item) => {
    let d = $q.defer();
    d.resolve([]);
    return d.promise;
  })

  $scope.toggleFolding = (item) =>  {
    // Return if it is already unfolded state
    if (!item._ngTree.folded) {
      item._ngTree.folded = true;
      return;
    }

    // Return if it is already loaded
    if (item._ngTree.status === 'loaded') {
      item._ngTree.folded = !item._ngTree.folded;
      return;
    }

    var _shouldLoad = $scope.options.lazy || false;

    if (item._options && item._options.hasOwnProperty('lazy')) {
      _shouldLoad = item._options.lazy;
    }

    if (!_shouldLoad) {
      item._ngTree.folded = !item._ngTree.folded;
      return;
    }

    // Starting the lazy load
    item._ngTree.status = 'loading';

    $scope.load(item)
      .then((children) => {
        item.children = $scope._initItems(children);
        item._ngTree.status = 'loaded';
        item._ngTree.folded = !item._ngTree.folded;
      });
  }
}
