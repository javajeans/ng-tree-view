'use strict';

var angular = require('angular');

import directive from './ng-tree-view.directive';
import compiled from './directive.compiled';
import controller from './ng-tree-view.controller';
import service from './ng-tree-view.service';

angular
  .module('ngTreeView', [])
  .service('NgTreeViewService', service)
  .controller('NgTreeViewController', controller)
  .directive('ngTreeView', directive)
  .directive('compiled', compiled);
