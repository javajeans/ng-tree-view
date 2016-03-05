'use strict';

var angular = require('angular');

//import utildEditable from './editable';

import directive from './ng-tree-view.directive';
import compiled from './directive.compiled';
import editable from './editable';
import controller from './ng-tree-view.controller';
import service from './ng-tree-view.service';

angular
  .module('ngTreeView', [/*'ng-utils-editable'*/])
  .service('NgTreeViewService', service)
  .controller('NgTreeViewController', controller)
  .directive('ngTreeView', directive)
  .directive('compiled', compiled)
  .directive('editable', editable)
