'use strict';

import directive from './ng-tree-view.directive';
import compiled from './directive.compiled';
import controller from './ng-tree-view.controller';

angular
  .module('tolgaakyuz.ngtree', [])
  .controller('NgTreeViewController', controller)
  .directive('ngTreeView', directive)
  .directive('compiled', compiled)
