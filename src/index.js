'use strict';

import directive from './ngtree.directive';
import compiled from './directive.compiled';
import controller from './ngtree.controller';

angular
  .module('tolgaakyuz.ngtree', [])
  .controller('NgTreeController', controller)
  .directive('ngTree', directive)
  .directive('compiled', compiled)
