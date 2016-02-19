'use strict';

const tree = () => `
  <ul>
    <li ng-repeat="item in tree" compiled="templates.item"></li>
  </ul>
`;

const item = () => `
  <span ng-show="item._ngTree.status !== 'loading'">
    <i ng-click="toggleFolding(item)" ng-show="item._ngTree.collapsed">[-]</i>
    <i ng-click="toggleFolding(item)" ng-show="!item._ngTree.collapsed">[+]</i>
  </span>

  <i ng-show="item._ngTree.status === 'loading'">[...]</i>

  <a href="#" ng-click="itemSelected(item)">
    {{item.name}} [id:{{item.id}}] [children:{{item.children.length}}]
  </a>

  <ul ng-if="item._ngTree.collapsed">
    <li ng-repeat="item in item.children" compiled="templates.item"></li>
  </ul>
`;

export default {
  item: item(),
  tree: tree()
}
