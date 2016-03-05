'use strict';

export default ($compile) => {
  'ngInject';

  return {
    restrict: 'A',
    replace: true,
    scope: {
      editing: '=editable',
      item: '=item'
    },
    link: (scope, ele, attrs) => {
      scope.$watch('editing', (newValue, oldValue) => {
        if (!newValue) {
          return;
        }

        let $editable = angular.element(ele.find('a')[0]);

        $editable.data('before', $editable.text());
        $editable.attr('contenteditable', '');
        $editable[0].focus();

        var range = document.createRange();
        range.selectNodeContents($editable[0]);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        $editable.on('blur keyup paste input', () => {
          scope.item.name = $editable.text().trim();

          //if ($this.data('before') !== $this.html()) {
            //$this.data('before', $this.html());
            //$this.trigger('change');
          //}

          //return $this;
        });
      });
    }
  };
}
