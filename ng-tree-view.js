(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = ["$compile", function ($compile) {
  'ngInject';

  return {
    restrict: 'A',
    replace: true,
    link: function link(scope, ele, attrs) {
      scope.$watch(attrs.compiled, function (html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
}];

},{}],2:[function(require,module,exports){
'use strict';

var _ngTreeView = require('./ng-tree-view.directive');

var _ngTreeView2 = _interopRequireDefault(_ngTreeView);

var _directive = require('./directive.compiled');

var _directive2 = _interopRequireDefault(_directive);

var _ngTreeView3 = require('./ng-tree-view.controller');

var _ngTreeView4 = _interopRequireDefault(_ngTreeView3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('ngTreeView', []).controller('NgTreeViewController', _ngTreeView4.default).directive('ngTreeView', _ngTreeView2.default).directive('compiled', _directive2.default);

},{"./directive.compiled":1,"./ng-tree-view.controller":3,"./ng-tree-view.directive":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templates = require('./templates');

var _templates2 = _interopRequireDefault(_templates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = ["$scope", "$q", function ($scope, $q) {
  'ngInject';

  $scope.templates = _templates2.default;

  $scope._initItem = function (item) {
    item._ngTree = {
      folded: true,
      selected: false
    };

    if (!angular.isArray(item.children || [])) {
      item.children = [];
    }

    return item;
  };

  $scope._initItems = function (items) {
    return items.map(function (item) {
      return $scope._initItem(item);
    });
  };

  $scope.tree = $scope._initItems($scope._options.data);

  $scope.options = {
    id: $scope._options.id || 0,
    lazy: $scope._options.lazy || false,
    indicators: angular.extend({
      folded: "[+]",
      unfolded: "[-]",
      loading: "[...]"
    }, $scope._options.indicators || {})
  };

  $scope._lastSelectedItem = null;

  $scope.shouldLoad = $scope._options.shouldLoad || function (item) {
    return true;
  };

  $scope.onSelect = $scope._options.onSelect || function (item) {
    var d = $q.deer();
    d.resolve();
    return d.promise;
  };

  $scope.itemSelected = function (item) {
    $scope.onSelect(item).then(function () {
      if ($scope._lastSelectedItem) {
        $scope._lastSelectedItem._ngTree.selected = false;
      }

      item._ngTree.selected = true;
      $scope._lastSelectedItem = item;
    });
  };

  $scope.load = $scope._options.load || function (item) {
    var d = $q.defer();
    d.resolve([]);
    return d.promise;
  };

  $scope.toggleFolding = function (item) {
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

    $scope.load(item).then(function (children) {
      item.children = $scope._initItems(children);
      item._ngTree.status = 'loaded';
      item._ngTree.folded = !item._ngTree.folded;
    });
  };
}];

},{"./templates":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templates = require('./templates');

var _templates2 = _interopRequireDefault(_templates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  'ngInject';

  return {
    template: _templates2.default.tree,
    scope: {
      _options: '=ngTreeView'
    },
    controller: 'NgTreeViewController',
    link: function link(scope, element, attributes) {}
  };
};

},{"./templates":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tree = function tree() {
  return '\n  <ul>\n    <li ng-repeat="item in tree track by $index" compiled="templates.item"></li>\n  </ul>\n';
};

var item = function item() {
  return '\n  <div class=\'ng-tree-item-content\' ng-class="{\'selected\': item._ngTree.selected}">\n    <span ng-show="item._ngTree.status !== \'loading\'">\n      <span ng-click="toggleFolding(item)" ng-show="item._ngTree.folded" compiled="options.indicators.folded"></span>\n      <span ng-click="toggleFolding(item)" ng-show="!item._ngTree.folded" compiled="options.indicators.unfolded"></span>\n    </span>\n\n    <span ng-show="item._ngTree.status === \'loading\'" compiled="options.indicators.loading"></span>\n\n    <a href="#" ng-click="itemSelected(item)">\n      {{item.name}} [id:{{item.id}}] [children:{{item.children.length}}] [lazy: {{item._options.lazy}}]\n    </a>\n  </div>\n\n  <ul ng-if="!item._ngTree.folded">\n    <li ng-repeat="item in item.children track by $index" compiled="templates.item"></li>\n  </ul>\n';
};

exports.default = {
  item: item(),
  tree: tree()
};

},{}]},{},[2])

