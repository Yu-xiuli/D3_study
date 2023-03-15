import * as d3 from "d3";
import Base from "./Base";
import { houseIconTop, houseIconBottom } from "../data";

export default class Tree extends Base {
  initTree(data) {
    /** 创建层级布局 */
    this.root = d3.hierarchy(data);
  }
  updateTree() {
    const root = this.root;
    /** 获取树的节点和连线信息 */
    let nodes = root.descendants();
    const links = root.links();

    /** 创建树状图并初始化 */
    d3
      .tree()
      .size([this.height, this.width * 0.4])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth)(root);

    root.x = this.height * 0.5;
    root.y = this.width * 0.5;
    /** 保存 */
    this.nodes = nodes;
    this.links = links;
  }
  renderTree() {
    this.renderLinks();
    this.renderNodes();
  }
  renderNodes() {
    /** 创建每个节点和对应文字的分组 */
    const group = this.g_container
      .selectAll(`.node-${this.css}`)
      .data(this.nodes)
      .enter()
      .append("g")
      .attr("class", `node-${this.css}`)
      .attr("transform", this.nodesTransform.bind(this))
      .on("click", (d) => {
        this.parent.onTreeNodeClick(d, this);
      });

    /** 添加节点和文字 */
    this.addCircle(group);
    this.addText(group);

    /** root节点添加小房子图标 */
    this.addHouseIcon(group);
  }
  renderLinks() {
    this.g_container
      .selectAll(`.link-${this.css}`)
      .data(this.links)
      .enter()
      .append("path")
      .attr("class", `link-${this.css}`)
      .attr("d", this.pathTransform.bind(this))
      .attr("fill", "none")
      .attr("stroke", () => (this.direction > 0 ? "#f3960b" : "blue"))
      .attr("stroke-width", 1);
  }
  addCircle(g) {
    g.selectAll("circle").remove();
    g.append("circle")
      .attr("r", (d) => {
        return d.depth < 2 ? 20 : 0;
      })
      .attr("fill", (d) => {
        if (!d.depth) return "red";
        return this.direction < 0 ? "#87c5dd" : "#ebb60b";
      })
      .attr("x", (d) => {
        if (!d.depth) {
          return this.root.x;
        }
        return d.x;
      })
      .attr("y", (d) => {
        if (!d.depth) return this.root.y;
        return d.y;
      });
  }
  addText(g) {
    g.append("text")
      .attr("x", (d) => {
        return this.direction < 0
          ? d.depth !== 1
            ? d.data.name.length > 1
              ? -40
              : -27
            : d.data.name.length > 1
            ? -16
            : -7
          : d.depth !== 1
          ? 5
          : -10;
      })
      .attr("y", 5)
      .attr("dy", 0)
      .append("tspan")
      .text((d) => {
        if (!d.parent) return "";
        return d.data.name;
      });
  }
  addHouseIcon(g) {
    const houseNode = g
      .append("g")
      .attr("transform", "translate(-13, -13) scale(1.5)");
    houseNode
      .append("path")
      .attr("d", (d) => {
        if (!d.parent) return houseIconTop;
      })
      .attr("fill", "#fff");
    houseNode
      .append("polygon")
      .attr("points", (d) => {
        if (!d.parent) return houseIconBottom;
      })
      .attr("fill", "#fff");
  }
  nodesTransform(d) {
    if (!d.depth) {
      return "translate(" + this.root.y + "," + this.root.x + ")";
    } else {
      return (
        "translate(" +
        this.offsetPosition(this.direction * d.y) +
        "," +
        d.x +
        ")"
      );
    }
  }
  pathTransform(d) {
    const start = {
      y: !d.source.depth ? this.root.x : d.source.x,
      x: !d.source.depth
        ? this.root.y
        : this.offsetPosition(d.source.y * this.direction),
    };
    const end = {
      y: d.target.x,
      x: this.offsetPosition(d.target.y * this.direction),
    };
    /** M 起始位置 L 画直线  H横着画  V竖着画 */
    return `M${start.x},${start.y}H${(end.x + start.x) / 2}V${end.y}L${end.x},${
      end.y
    }`;
  }
  offsetPosition(p) {
    /** 向右偏移500像素 */
    return Number(p) + 500;
  }
  handleCollapsed(node) {
    console.log('kkk---点击事件')
  }
}
