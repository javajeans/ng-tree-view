'use strict';

export default ($compile) => {
  'ngInject';

  return {
    restrict: 'A',
    replace: true,
    link: (scope, ele, attrs) => {
      scope.$watch(attrs.compiled, function (html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
}
