'use strict';

import async from 'async';
import templates from './templates';

export default ($scope, $timeout, $q) => {
  'ngInject';

  $scope.templates = templates;

  $scope.cache = {};

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
  });

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
  });

  $scope.pre = $scope._options.pre || ((item) => {
    let d = $q.defer();
    d.resolve([]);
    return d.promise;
  });

  $scope.toggleFolding = (item, next) =>  {
    next = next || (() => {});

    // Return if it is already unfolded state
    if (!item._ngTree.folded) {
      item._ngTree.folded = true;
      return next(null, item);
    }

    // Return if it is already loaded
    //console.log(item.name + ' -> ' + JSON.stringify(item._ngTree));

    if (item._ngTree.status === 'loaded') {
      item._ngTree.folded = !item._ngTree.folded;
      return next(null, item);
    }

    var _shouldLoad = $scope.options.lazy || false;

    if (item._options && item._options.hasOwnProperty('lazy')) {
      _shouldLoad = item._options.lazy;
    }

    if (!_shouldLoad) {
      item._ngTree.folded = !item._ngTree.folded;
      return next(null, item);
    }

    item._ngTree.status = 'loading';

    $scope.load(item)
      .then((children) => {
        item.children = $scope._initItems(children);
        item._ngTree.status = 'loaded';
        item._ngTree.folded = !item._ngTree.folded;
        item.children.forEach((c) => {
          c.parent = item.id.toString();
        });
      });
  }

  $scope._initItem = (item) => {
    item._ngTree = angular.extend(item._ngTree || {
      folded: true,
      selected: false
    }, item._options || {});

    if (!angular.isArray((item.children || []))) {
      item.children = [];
    }

    if (item._ngTree.selected) {
      $scope._lastSelectedItem = item;
    }

    $scope.cache[item.id.toString()] = item;

    if (!item._ngTree.folded) {
      item._ngTree.folded = !item._ngTree.folded;
      $scope.toggleFolding(item);
    }

    return item;
  }

  $scope._initItems = (items) => {
    return items.map((item) => {
      return $scope._initItem(item);
    });
  }

  $scope.tree = $scope._initItems($scope._options.data);

  //$scope.pre()
    //.then((path) => {
      //async.mapSeries(path || [], (id, next) => {
        //if (!$scope.cache[id]) return next();
        //$scope.toggleFolding($scope.cache[id], next);
      //}, (err, items) => {
        //if (err) return console.log('couldnt load path');

        //if (items.length) {
          //var lastItem = $scope.cache[path[path.length - 1]];
          //$scope.itemSelected(lastItem);
        //}
      //});
    //});
}
