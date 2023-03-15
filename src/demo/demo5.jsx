import { useRef, useEffect } from "react";
import * as d3 from "d3";

/** 事件处理机制 */
const Demo5 = () => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      const container = d3.select("#demo5");
      /** 注册鼠标事件 */
      container
        .on("mouseover ", () => {
          console.log("kkk--鼠标移到元素上");
          container.style("border", "1px solid blue");
        })
        .on("mouseout ", () => {
          console.log("kkk--鼠标移开");
          container.style("border", "none");
        });
      // .on("click", () => {
      //   console.log("kkk--触发点击事件");
      // }).on("mousemove ", () => {
      //   console.log( "kkk--鼠标移动");
      // }).on("mousedown", () => {
      //   console.log("kkk--鼠标按下");
      // }).on("mouseup", () => {
      //   console.log("kkk--鼠标松开");
      // }).on("dblclick ", () => {
      //   console.log("kkk--双击鼠标");
      // });

      /** 注册自定义事件 */
      container.on("hello", (_, idx, dom) => {
        console.log(d3.event, _, idx, dom);
      });

      /** 触发自定义事件 ，参数只能放进detail里*/
      setTimeout(() => {
        container.dispatch("hello", { detail: { name: "小明" } });
      }, 1000);

      /** 卸载事件 */
      // container.on("hello", null);

      firstRenderRef.current = false;
    }
  }, []);

  return <div id="demo5">demo5</div>;
};

export default Demo5;
