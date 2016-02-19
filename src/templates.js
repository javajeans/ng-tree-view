'use strict';

const tree = () => `
  <ul>
    <li ng-repeat="item in tree track by $index" compiled="templates.item"></li>
  </ul>
`;

const item = () => `
  <div class='ng-tree-item-content' ng-class="{'selected': item._ngTree.selected}">
    <span ng-show="item._ngTree.status !== 'loading'">
      <span ng-click="toggleFolding(item)" ng-show="item._ngTree.folded" compiled="options.indicators.folded"></span>
      <span ng-click="toggleFolding(item)" ng-show="!item._ngTree.folded" compiled="options.indicators.unfolded"></span>
    </span>

    <span ng-show="item._ngTree.status === 'loading'" compiled="options.indicators.loading"></span>

    <a href="#" ng-click="itemSelected(item)">
      {{item.name}} [id:{{item.id}}] [children:{{item.children.length}}] [lazy: {{item._options.lazy}}]
    </a>
  </div>

  <ul ng-if="!item._ngTree.folded">
    <li ng-repeat="item in item.children track by $index" compiled="templates.item"></li>
  </ul>
`;

export default {
  item: item(),
  tree: tree()
}
