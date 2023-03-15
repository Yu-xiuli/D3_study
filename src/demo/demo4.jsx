import { useRef, useEffect } from "react";
import * as d3 from "d3";

/** 绘制基础图形 */
const Demo4 = () => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      const svg = d3
        .select("#demo4")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 1000);
      /** 圆 */
      svg
        .append("circle")
        .attr("cx", 100)
        .attr("cy", 100)
        .attr("r", 100)
        .attr("fill", "#d87a3c");

      /** 矩形 */
      svg
        .append("rect")
        .attr("x", 300)
        .attr("y", 50)
        .attr("width", 300)
        .attr("height", 100)
        .attr("fill", "#377599")
        .attr("rx", "10") // 圆角
        .attr("ry", "10")
        .style("stroke", "#ca311d")
        .style("stroke-width", "4")
        .style("opacity", "0.5");

      /** 椭圆 */
      svg
        .append("ellipse")
        .attr("rx", 100)
        .attr("ry", 50)
        .attr("cx", 100)
        .attr("cy", 350)
        .attr("fill", "#6b4d88");

      /** 线段 */
      svg
        .append("line")
        .attr("stroke-width", 10)
        .attr("stroke", "#4ba753")
        .attr("x1", 300)
        .attr("y1", 360)
        .attr("x2", 600)
        .attr("y2", 280);

      /** 折线 */
      /** 折线拐点位置集合 */
      const pathList = [
        [150, 600],
        [550, 600],
        [240, 800],
        [350, 450],
        [500, 800],
        [150, 600],
      ];
      svg
        .append("polyline")
        .attr("points", pathList)
        .attr("stroke", "#f70c0c")
        .attr("stroke-width", 10)
        .attr("fill", "none");

      /** 多边形 */
      /** 多边形顶点的位置集合 */
      const pathList2 = [
        [900, 50],
        [800, 150],
        [800, 250],
        [900, 350],
        [1000, 250],
        [1000, 150],
      ];
      svg
        .append("polygon")
        .attr("stroke-width", 10)
        .attr("stroke", "#e8f71e")
        .attr("points", pathList2)
        .attr("fill", "#9cced1");

      // 曲线生成器
      const pathData = [
        { x: 800, y: 600 },
        { x: 700, y: 700 },
        { x: 900, y: 700 },
      ];
      const line = d3
        .line()
        .x((d) => d.x)
        .y((s) => s.y);

      svg
        .append("path")
        .attr("d", line(pathData) + "Z") // Z是d属性的参数，表示关闭路径
        .attr("stroke-width", 10)
        .attr("stroke", "#7854b1")
        .attr("fill", "none");

      /** d属性 测试 */
      svg
        .append("path")
        .attr("d", "M 50,700 L 150,900 H 400 ")
        .attr("stroke-width", 20)
        .attr("stroke", "#0d85aa")
        .attr("fill", "none");

      firstRenderRef.current = false;
    }
  }, []);

  return <div id="demo4" />;
};

export default Demo4;
