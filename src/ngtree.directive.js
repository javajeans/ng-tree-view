'use strict';

import templates from './templates';

export default () => {
  'ngInject';

  return {
    template: templates.tree,
    scope: {
      source: '=ngTreeSource',
      onSelect: '=ngTreeOnSelect',
      load: '=ngTreeLoad'
    },
    controller: 'NgTreeController',
    link: (scope, element, attributes) => {}
  };
}
