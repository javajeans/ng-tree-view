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

var _ngtree = require('./ngtree.directive');

var _ngtree2 = _interopRequireDefault(_ngtree);

var _directive = require('./directive.compiled');

var _directive2 = _interopRequireDefault(_directive);

var _ngtree3 = require('./ngtree.controller');

var _ngtree4 = _interopRequireDefault(_ngtree3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('tolgaakyuz.ngtree', []).controller('NgTreeController', _ngtree4.default).directive('ngTree', _ngtree2.default).directive('compiled', _directive2.default);

},{"./directive.compiled":1,"./ngtree.controller":3,"./ngtree.directive":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templates = require('./templates');

var _templates2 = _interopRequireDefault(_templates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = ["$scope", function ($scope) {
  'ngInject';

  $scope.templates = _templates2.default;

  $scope.tree = $scope.source.map(function (item) {
    item._ngTree = {
      collapsed: false
    };

    return item;
  });

  $scope.itemSelected = function (item) {
    $scope.onSelect(item);
  };

  $scope.toggleFolding = function (item) {
    item._ngTree = item._ngTree || {
      collapsed: false
    };

    if (item._ngTree.collapsed) {
      item._ngTree.collapsed = false;
      return;
    }

    if (item._ngTree.status === 'loaded') {
      item._ngTree.collapsed = !item._ngTree.collapsed;
      return;
    }

    item._ngTree.status = 'loading';

    $scope.load(item).then(function (children) {
      item.children = children;
      item._ngTree.status = 'loaded';
      item._ngTree.collapsed = !item._ngTree.collapsed;
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
      source: '=ngTreeSource',
      onSelect: '=ngTreeOnSelect',
      load: '=ngTreeLoad'
    },
    controller: 'NgTreeController',
    link: function link(scope, element, attributes) {}
  };
};

},{"./templates":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tree = function tree() {
  return '\n  <ul>\n    <li ng-repeat="item in tree" compiled="templates.item"></li>\n  </ul>\n';
};

var item = function item() {
  return '\n  <span ng-show="item._ngTree.status !== \'loading\'">\n    <i ng-click="toggleFolding(item)" ng-show="item._ngTree.collapsed">[-]</i>\n    <i ng-click="toggleFolding(item)" ng-show="!item._ngTree.collapsed">[+]</i>\n  </span>\n\n  <i ng-show="item._ngTree.status === \'loading\'">[...]</i>\n\n  <a href="#" ng-click="itemSelected(item)">\n    {{item.name}} [id:{{item.id}}] [children:{{item.children.length}}]\n  </a>\n\n  <ul ng-if="item._ngTree.collapsed">\n    <li ng-repeat="item in item.children" compiled="templates.item"></li>\n  </ul>\n';
};

exports.default = {
  item: item(),
  tree: tree()
};

},{}]},{},[2])

