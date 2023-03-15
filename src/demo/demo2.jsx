import { useRef, useEffect } from "react";
import * as d3 from "d3";

/** 了解比例尺 */
const Demo2 = () => {
  const firstRenderRef = useRef(true);
  useEffect(() => {
    if (firstRenderRef.current) {
      /** 线性比例尺: 将一个区间映射到另一个区间 */
      var dataset = [0, 1, 2, 3, 4];
      var min = d3.min(dataset);
      var max = d3.max(dataset);

      var linear = d3
        .scaleLinear()
        .domain([min, max]) // 定义域。参数为数组，存放数据集中的最大值和最小值
        .range([0, 300]); // 值域。range中的数组存放的是我们希望映射出的最大值和最小值

      console.log(linear(8));

      /** 序数比例尺: 在一组数据与另一组数据之间创建映射关系 */
      var index = [0, 1, 2, 3, 4];
      var color = ["red", "blue", "green", "yellow", "black"];

      var ordinal = d3.scaleOrdinal().domain(index).range(color);
      console.log(ordinal(3));

      /** https://observablehq.com/@d3/d3-scaleband 解释源码计算逻辑 */
      let band = d3.scaleBand().domain([1, 2, 3, 4]).range([0, 100]);
      console.log(band(1));
    }
    firstRenderRef.current = false;
  }, []);

  return <div id="demo2">demo2</div>;
};

export default Demo2;
