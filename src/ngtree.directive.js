'use strict';

import templates from './templates';

export default () => {
  'ngInject';

  return {
    template: templates.tree,
    scope: {
      _options: '=ngTree'
    },
    controller: 'NgTreeController',
    link: (scope, element, attributes) => {}
  };
}
