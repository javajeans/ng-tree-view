'use strict';

import templates from './templates';

export default () => {
  'ngInject';

  return {
    template: templates.tree,
    scope: {
      _options: '=ngTreeView'
    },
    controller: 'NgTreeViewController',
    link: (scope, element, attributes) => {}
  };
}
