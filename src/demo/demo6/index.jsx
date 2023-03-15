import { useEffect, useMemo } from "react";
import { useMemoizedFn } from "ahooks";
import * as d3 from "d3";

import { data, houseIconTop, houseIconBottom } from "./data";

/** root节点位置信息,x轴y轴翻转之前的 */
const rootX = 470;
const rootY = 485;

const width = 1000;
const height = 900;

/** demo: 树状图 */
const Demo6 = () => {
  const { leftTreeData, rightTreeData } = useMemo(() => {
    var i = Math.ceil((data.children?.length || 0) * 0.5);
    return {
      leftTreeData: Object.assign(Object.create(data), {
        children: data.children?.slice(0, i) || [],
      }),
      rightTreeData: Object.assign(Object.create(data), {
        children: data.children?.slice(i) || [],
      }),
    };
  }, []);

  /** 节点点击事件 */
  const handleExpandClose = useMemoizedFn((selectedNode) => {
    if (selectedNode.depth === 1) {
      console.log("kkk--触发点击事件");
    }
  });

  useEffect(() => {
    d3.select("#demo6").select("svg").remove();

    /** 1. 创建画布 */
    const container = d3
      .select("#demo6")
      .style("border", "1px solid blue")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(0,0)")
      .append("g");

    /** 2. 创建层级布局 */
    const leftRoot = d3.hierarchy(leftTreeData);
    const rightRoot = d3.hierarchy(rightTreeData);

    /** 3. 创建树状图 */
    const tree = d3
      .tree()
      .size([900, 400])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

    /** 4. 初始化 */
    const initLeftTree = tree(leftRoot);
    const initRightTree = tree(rightRoot);

    /** 5. 获取边和节点 */
    const leftNodes = initLeftTree.descendants();
    const leftLinks = initLeftTree.links();

    const rightNodes = initRightTree.descendants();
    const rightLinks = initRightTree.links();

    /** 6. 画边 */
    /** 左侧边 */
    container
      .append("g")
      .selectAll("path")
      .data(leftLinks)
      .enter()
      .append("path")
      .attr("d", (d) => {
        const start = {
          y: !d.source.depth ? rootX : d.source.x,
          x: !d.source.depth ? rootY : 500 - d.source.y, // 负号-翻转方向，500-向右平移
        };
        const end = {
          y: d.target.x,
          x: 500 - d.target.y,
        };
        return `M${start.x},${start.y}H${(end.x + start.x) / 2}V${end.y}L${
          end.x
        },${end.y}`;
      })
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1);

    /** 右侧边 */
    container
      .append("g")
      .selectAll("path")
      .data(rightLinks)
      .enter()
      .append("path")
      .attr("d", (d) => {
        const start = {
          x: !d.source.depth ? rootX : d.source.x,
          y: !d.source.depth ? rootY : 500 + d.source.y,
        };
        const end = {
          x: d.target.x,
          y: 500 + d.target.y,
        };
        //   M 起始位置 L 画直线  H横着画  V竖着画
        return `M${start.y},${start.x}H${(end.y + start.y) / 2}V${end.x}L${
          end.y
        },${end.x}`;
      })
      .attr("fill", "none")
      .attr("stroke", "#f3960b")
      .attr("stroke-width", 2);

    /** 7. 创建每个节点和对应文字的分组 */
    const groupLeft = container
      .append("g")
      .selectAll("g")
      .data(leftNodes)
      .enter()
      .append("g")
      .attr("transform", (d) => {
        if (!d.depth) {
          return "translate(" + rootY + "," + rootX + ")";
        }
        return "translate(" + Number(500 - d.y) + "," + d.x + ")";
      });

    const groupRight = container
      .append("g")
      .selectAll("g")
      .data(rightNodes)
      .enter()
      .append("g")
      .attr("transform", (d) => {
        return "translate(" + (500 + d.y) + "," + d.x + ")";
      });

    /** 7.1 画节点 */
    groupLeft
      .append("circle")
      .attr("r", (d) => {
        if (d.children) return 20;
        return 0;
      })
      .attr("fill", (d) => {
        if (!d.parent) return "red";
        return "#87c5dd";
      })
      .attr("x", (d) => {
        if (!d.parent) {
          return rootX;
        }
        return d.x;
      })
      .attr("y", (d) => {
        if (!d.parent) return rootY;
        return d.y;
      })
      .on("click", (d) => {
        handleExpandClose(d);
      });

    groupRight
      .append("circle")
      .attr("r", (d) => {
        if (d.children) return 20;
        return 0;
      })
      .attr("x", (d) => {
        if (!d.parent) return rootX;
        return d.x;
      })
      .attr("y", (d) => {
        if (!d.parent) return rootY;
        return d.y;
      })
      .attr("fill", (d) => {
        if (!d.parent) return "none";
        return "#ebb60b";
      })
      .on("click", (d) => {
        handleExpandClose(d);
      });

    /** 根节点增加房子的图标 */
    const houseNode = groupLeft
      .append("g")
      .attr("transform", "translate(-8,-8)");
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

    /** 7.2 节点处添加文字 */
    groupLeft
      .append("text")
      .attr("x", (d) => {
        return d.depth !== 1
          ? d.data.name.length > 1
            ? -40
            : -27
          : d.data.name.length > 1
          ? -16
          : -7;
      })
      .attr("y", 5)
      .append("tspan")
      .text((d) => {
        if (!d.parent) return "";
        return d.data.name;
      })
      .on("click", (d) => {
        handleExpandClose(d);
      });

    groupRight
      .append("text")
      .attr("x", (d) => {
        return d.depth !== 1 ? 5 : -10;
      })
      .attr("y", 5)
      .text((d) => {
        if (!d.parent) return "";
        return d.data.name;
      })
      .on("click", (d) => {
        handleExpandClose(d);
      });
  }, [leftTreeData, rightTreeData, handleExpandClose]);

  return <div id="demo6" />;
};

export default Demo6;
