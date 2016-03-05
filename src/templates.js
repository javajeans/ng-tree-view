'use strict';

const tree = () => `
  <ul>
    <li ng-repeat="item in tree track by $index" compiled="templates.item" ng-class="{'selected': item._ngTree.selected}"></li>
  </ul>
`;

const item = () => `
  <div class='ng-tree-item-content'>
    <span ng-show="item._ngTree.status !== 'loading'">
      <span ng-click="toggleFolding(item)" ng-show="item._ngTree.folded" compiled="options.indicators.folded"></span>
      <span ng-click="toggleFolding(item)" ng-show="!item._ngTree.folded" compiled="options.indicators.unfolded"></span>
    </span>

    <span ng-show="item._ngTree.status === 'loading'" compiled="options.indicators.loading"></span>

    <div class="folder-name" ng-class="{'selected': item._ngTree.selected}" item="item" editable="item._ngTree.editing">
      <a href="#" ng-click="itemSelected(item)">
        {{item.name}}
      </a>

      <span ng-if="item.editable && !item._ngTree.editing">
        <a href="#"
          compiled="item.editableOptions.indicators.add"
          ng-click="item.addChildren();">
        </a>
      </span>

      <span ng-if="item.editable && item._ngTree.editing">
        <a href="#"
          ng-if="item.editable"
          compiled="item.editableOptions.indicators.save"
          ng-click="onSave(item);">
        </a>
        <a href="#"
          ng-if="item.editable"
          compiled="item.editableOptions.indicators.cancel"
          ng-click="item.cancel();">
        </a>
      </span>
    </div>
  </div>

  <ul ng-if="!item._ngTree.folded">
    <li ng-repeat="item in item.children track by $index" compiled="templates.item" ng-class="{'selected': item._ngTree.selected}"></li>
  </ul>
`;

export default {
  item: item(),
  tree: tree()
}
