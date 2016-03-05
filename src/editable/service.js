'use strict';

export default ($q) => {
  'ngInject';

  let options = {
    selectAll: false
  };

  let edit = (element) => {
    let d = $q.defer();

    $(element).attr('contenteditable', '');

    d.resolve();
    return d.promise;
  }

  let selectAll = (element) => {
    let d = $q.defer();

    var range = document.createRange();
    range.selectNodeContents(element);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    d.resolve();
    return d.promise;
  }

  return {
    Edit: edit,
    SelectAll: selectAll
  }
}
