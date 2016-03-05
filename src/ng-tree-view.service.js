'use strict';

import async from 'async';

export default ($q, $timeout) => {
  'ngInject';

  let tree = [];

  let cache = {};

  let lastSelectedItem = null;

  let initItem = (item) => {
    item._ngTree = {
      folded: true,
      selected: false,
      status: (item._ngTree) ? item._ngTree.status || 'new' : 'new'
    }

    item.editable = true;

    item.addChildren = () => {
      let self = item;

      $timeout(() => {
        let newItem = initItem({
          id: 'newid',
          name: 'Ne folder'
        });

        newItem.edit();

        self.children = [newItem].concat(self.children);
      }, 0);
    }

    item.cancel = () => {
      console.log('canceling editing');
    }

    item.edit = () => {
      let self = item;
      self._ngTree.editing = true;
    };

    item.editableOptions = {
      indicators: {
        edit: "[edit2]",
        save: "[save]",
        cancel: "[cancel]",
        add: "[add]"
      }
    }

    // Make sure children field is esits and array
    if (!item.children || !angular.isArray((item.children || []))) {
      item.children = [];
    }

    // Cache the item
    cache[item.id.toString()] = item;

    if (!item.children.length) {
      return item;
    } else {
      item.children = initItems(item.children);
      return item;
    }
  }

  let initItems = (items) => {
    return items.map((item) => {
      return initItem(item);
    });
  }

  let init = (items, options) => {
    let d = $q.defer();

    dataSource = options.dataSource;
    tree = initItems(items);

    d.resolve(tree);
    return d.promise;
  }

  let select = (item) => {
    let d = $q.defer();

    if (!item.id && cache[item]) {
      item = cache[item];
    }

    if (lastSelectedItem) {
      lastSelectedItem._ngTree.selected = false;
    }

    item._ngTree.selected = true;
    lastSelectedItem = item;

    d.resolve();
    return d.promise;
  }

  let unselect = (item) => {
    let d = $q.defer();

    if (!item.id && cache[item]) {
      item = cache[item];
    }

    if (lastSelectedItem
        && lastSelectedItem.id.toString() === item.id.toString()) {
      lastSelectedItem = null;
    }

    item._ngTree.selected = false;

    d.resolve();
    return d.promise;
  }

  let dataSource = (item) => {
    let d = $q.defer();
    d.resolve([]);
    return d.promise;
  }

  let load = (item) => {
    let d = $q.defer();

    if (item._ngTree.status === 'loaded') {
      d.resolve();
    } else {
      item._ngTree.status = 'loading';

      dataSource(item)
        .then((children) => {
          children = children || [];

          item.children = initItems(children);
          item._ngTree.status = 'loaded';
          item.children.forEach((c) => {
            c.parent = item.id.toString();
          });

          d.resolve();
        });
    }

    return d.promise;
  }

  let fold = (item) => {
    let d = $q.defer();

    item._ngTree.folded = true;

    d.resolve();
    return d.promise;
  }

  let unfold = (item) => {
    if (!item.id && cache[item]) {
      item = cache[item];
    }

    let d = $q.defer();

    item._ngTree.folded = false;

    if (item._ngTree.status === 'loaded') {
      d.resolve();
    } else {
      load(item).then(() => {
        d.resolve();
      });
    }

    return d.promise;
  }

  let toggleFold = (item) => {
    if (!item.id && cache[item]) {
      item = cache[item];
    }

    if (item._ngTree.folded) {
      return unfold(item);
    } else {
      return fold(item);
    }
  }

  let selectAndUnfold = (item) => {
    if (!item.id && cache[item]) {
      item = cache[item];
    }

    let d = $q.defer();

    select(item)
      .then(() => {
        unfold(item)
          .then(() => {
            d.resolve();
          });
      });

    return d.promise;
  }

  let selectAndFold = (item) => {
    if (!item.id && cache[item]) {
      item = cache[item];
    }

    let d = $q.defer();

    select(item)
      .then(() => {
        fold(item)
          .then(() => {
            d.resolve();
          });
      });

    return d.promise;
  }

  return {
    Init: init,
    GetTree: () => { return tree; },
    GetItem: (id) => { return cache[id]; },
    Select: select,
    Unselect: unselect,
    Fold: fold,
    Unfold: unfold,
    SelectAndUnfold: selectAndUnfold,
    SelectAndFold: selectAndFold,
    ToggleFold: toggleFold
  }
}
