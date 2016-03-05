'use strict';

var angular = require('angular');

import directive from './directive';
import service from './service';

angular
  .module('ng-utils-editable', [])
  .service('NgUtilsEditableService', service)
  .directive('ngUtilsEditable', directive);
