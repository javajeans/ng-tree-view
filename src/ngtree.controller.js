'use strict';

import templates from './templates';

export default ($scope) => {
  'ngInject';

  $scope.templates = templates;

  $scope.tree = $scope.source.map((item) => {
    item._ngTree = {
      collapsed: false
    };

    return item;
  });

  $scope.itemSelected = (item) => {
    $scope.onSelect(item);
  }

  $scope.toggleFolding = (item) =>  {
    item._ngTree = item._ngTree || {
      collapsed: false
    }

    if (item._ngTree.collapsed) {
      item._ngTree.collapsed = false
      return
    }

    if (item._ngTree.status === 'loaded') {
      item._ngTree.collapsed = !item._ngTree.collapsed;
      return;
    }

    item._ngTree.status = 'loading';

    $scope.load(item)
      .then((children) => {
        item.children = children;
        item._ngTree.status = 'loaded';
        item._ngTree.collapsed = !item._ngTree.collapsed;
      });
  }
}
