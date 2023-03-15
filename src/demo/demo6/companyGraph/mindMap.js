import * as d3 from "d3";
import Emitter from "./Emitter";
import Tree from "./tree";

export default class MindMap extends Emitter {
  init(treeData) {
    /** 避免重复绘制，先将之前的 g 元素删掉 */
    d3.select("#demo6").select("svg").select("g").remove();

    /** 创建画布，保存在 g_container 属性下 */
    this.g_container = this.svg_container.append("g");

    /** 创建左右两侧的 tree 实例 */
    this.left = this.createLeftTree();
    this.right = this.createRightTree();

    /** 将数据分成左右两部分，分别保存 */
    var i = Math.ceil((treeData.children?.length || 0) * 0.5);
    this.left.initTree(
      Object.assign(Object.create(treeData), {
        children: treeData.children?.slice(0, i) || [],
      })
    );
    this.right.initTree(
      Object.assign(Object.create(treeData), {
        children: treeData.children?.slice(i) || [],
      })
    );

    this.resize();
  }
  resize() {
    var width = this.svg_container.property("clientWidth"),
      height = this.svg_container.property("clientHeight");
    this.width = width;
    this.height = height;
    this.left.width = width;
    this.left.height = height;
    this.right.width = width;
    this.right.height = height;
    this.update();
    this.render();
  }
  update() {
    this.left.updateTree();
    this.right.updateTree();
  }
  render() {
    this.left.renderTree();
    this.right.renderTree();
  }
  createLeftTree() {
    return new Tree({
      parent: this, // 连接Tree和MindMap，点击节点事件会用到parent里的方法
      css: "left",
      direction: -1,
      g_container: this.g_container,
    });
  }
  createRightTree() {
    return new Tree({
      parent: this,
      css: "right",
      direction: 1,
      g_container: this.g_container,
    });
  }
  onTreeNodeClick(d, tree) {
    /** 触发节点点击事件 */
    this.emit("treeNodeClick", d, tree);
  }
}
