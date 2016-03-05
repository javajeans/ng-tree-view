'use strict';

export default ($compile, $timeout) => {
  'ngInject';

  return {
    restrict: 'A',
    replace: true,
    scope: {
      options: '=ngUtilsEditable'
    },
    link: (scope, ele, attrs) => {
      scope.editing = false;

      // Main element to be edit
      let $editable = angular.element(ele.find('a')[0]);

      // Add trigger
      let $add = angular.element('<a href="#" ng-show="!editing"/>');
      $add.text(scope.options.indicators.add);

      // Edit trigger
      let $editTirgger = angular.element('<a href="#" ng-show="!editing"/>');
      $editTirgger.text(scope.options.indicators.edit);

      // Save trigger
      let $save = angular.element('<a href="#" ng-show="editing"/>');
      $save.text(scope.options.indicators.save);

      // Cancel trigger
      let $cancel = angular.element('<a href="#" ng-show="editing"/>');
      $cancel.text(scope.options.indicators.cancel);
      $cancel.on('click', () => {
        // Restore from previous state
        $editable.text($editable.data('before'));

        // Turn editable off
        $editable.removeAttr('contenteditable');

        // blur to the element
        $editable[0].blur();

        if (window.getSelection) {
          if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
          } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
          }
        } else if (document.selection) {  // IE?
          document.selection.empty();
        }

        // Change status -> not editing
        $timeout(() => {
          scope.editing = false;
        }, 1);
      });

      $editTirgger.on('click', () => {
        // Save the previous state
        $editable.data('before', $editable.text());

        // Make it editable
        $editable.attr('contenteditable', '');

        // Focus to the element
        $editable[0].focus();

        // Select all the content of the element
        var range = document.createRange();
        range.selectNodeContents($editable[0]);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        // Change status -> editing
        $timeout(() => {
          scope.editing = true;
        }, 1);
      });

      ele.append($add)
      ele.append($editTirgger)
      ele.append($save)
      ele.append($cancel)
      $compile(ele.contents())(scope);

      //$('body').on('focus', '[contenteditable]', function() {
        //var $this = $(this);
        //$this.data('before', $this.html());
        //return $this;
      //}).on('blur keyup paste input', '[contenteditable]', function() {
        //var $this = $(this);
        //if ($this.data('before') !== $this.html()) {
          //$this.data('before', $this.html());
          //$this.trigger('change');
        //}
        //return $this;
      //});
    }
  };
}
