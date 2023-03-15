import { useRef, useEffect, useMemo } from "react";
import * as d3 from "d3";
import { Demo3Style } from "./styles.js";

/** 绘制坐标轴 */
const Demo3 = () => {
  const firstRenderRef = useRef(true);

  const testData = useMemo(
    () => [
      { name: "周一", value: 50 },
      { name: "周二", value: 100 },
      { name: "周三", value: 200 },
      { name: "周四", value: 300 },
      { name: "周五", value: 400 },
    ],
    []
  );

  useEffect(() => {
    if (firstRenderRef.current) {
      const width = 800;
      const height = 800;
      const SVGPadding = { top: 50, left: 30, right: 30, bottom: 20 };

      /** 1. 添加一个 SVG 画布 */
      var svg = d3
        .select("#demo3")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      /** 2. 为坐标轴定义比例尺 */
      const xScale = d3
        .scaleBand()
        .domain(testData.map((item) => item.name))
        .rangeRound([0, 500 - SVGPadding.left - SVGPadding.right]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(testData.map((item) => item.value))])
        .range([d3.max(testData.map((item) => item.value)), 0]);

      /** 3. 定义坐标轴 */
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      /** 4. 将坐标轴添加到画布中 */
      svg.append("g").attr("transform", "translate(100,450)").call(xAxis);
      // .attr("class", "axis") // 添加类名

      svg.append("g").call(yAxis).attr("transform", "translate(100,50)");

      /** 截至目前已经画出了坐标轴，如果要添加数据绘制柱状图，执行下列代码 */
      // const colorList = ["red", "orange", "yellow", "green", "blue"];
      // const rectPadding = 8;
      // svg
      //   .selectAll(".selectedRect")
      //   .data(testData.map((item) => item.name))
      //   .enter()
      //   .append("rect") // 添加矩形
      //   .attr(
      //     "transform",
      //     "translate(" + SVGPadding.left + "," + SVGPadding.top + ")"
      //   )
      //   // 设置必需属性 x,y,width,height, 缺一不可
      //   .attr("x", function (d) {
      //     return 70 + xScale(d) + rectPadding / 2;
      //   })
      //   .attr("y", function (d, i) {
      //     return yScale(testData[i].value);
      //   })
      //   .attr("width", (d) => {
      //     return xScale.bandwidth() - rectPadding;
      //   })
      //   .attr("height", (_, i) => {
      //     return 400 - yScale(testData[i].value);
      //   })
      // .attr("fill", (_, i) => colorList[i]); // 设置填充色

      firstRenderRef.current = false;
    }
  }, [testData]);

  return <Demo3Style id="demo3" />;
};

export default Demo3;
