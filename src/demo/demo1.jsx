import { useRef, useEffect } from "react";
import { useMemoizedFn } from "ahooks";
import * as d3 from "d3";
import c from "classnames";
import { Demo1Style } from "./styles.js";

/** 选择与绑定数据 */
const Demo1 = () => {
  const containerRef = useRef();
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      /** 选择一个节点 */
      const rootDom = d3.select(containerRef.current);
      // const nthDom = d3.select(".selected:nth-child(3)");
      console.log(rootDom);

      /** ---选择多个节点--- */
      // const domList = d3.selectAll(".selected");
      // console.log(domList);

      /** 过滤 */
      // const nth2 = rootDom
      //   .selectAll(".selected")
      //   .filter((_, b) => {
      //     return b === 2;
      //   })
      //   .filter(":nth-child(5)")
      //   .style("color", "red");
      // console.log(nth2);

      /** ---添加新节点--- */
      //   rootDom.insert("span", ".a").text("新加的节点");
      //   rootDom.append("button").text("按钮");

      /** ---删除--- */
      //   rootDom.select('.a').remove()

      /** ---增加属性--- */
      //   rootDom.selectAll(".selected").attr("class", "addClass")
      //   rootDom.selectAll(".selected").classed("addClass", true);
      // 二者区别：通过attr添加类名会把已有类名覆盖，使用classed添加类名则不会发生覆盖。

      /** ---修改样式--- */
      //   rootDom.select(".a").style("color", "green");
      //   rootDom.selectAll("div").style("color", (_, idx) => {
      //     if (idx % 2 === 0) return "red";
      //     return "blue";
      //   });

      /** 修改文本 */
      // rootDom.select(".a").text("把a改成aaa");
      // rootDom.selectAll("div").text((_, idx, nodeList) => {
      //   console.log(_, nodeList);
      //   return idx;
      // });

      /** 绑定多个数据 */
      // const demoData1 = [1, 2, 3, 4, 5];
      // rootDom
      //   .selectAll("div")
      //   .data(demoData1)
      //   .text((txt) => {
      //     return txt;
      //   });

      // 绑定一个数据
      // const demoData2 = 200;
      // rootDom
      //   .select(".a")
      //   .datum(demoData2)
      //   .text((txt) => {
      //     return txt;
      //   });

      firstRenderRef.current = false;
    }
  }, []);

  const onChangeData = useMemoizedFn(() => {
    const demoData3 = ["小猫", "小狗", "兔子", "麻雀", "松鼠", "鲨鱼"];
    d3.select(containerRef.current)
      .selectAll("div")
      .data(demoData3)
      .text((txt) => {
        return txt;
      });
    // .exit()
    // .remove();

    // .enter();
    // .append("div")
    // .text((txt) => {
    //   return txt;
    // });

    // console.log();
  });

  return (
    <Demo1Style>
      <div id="demo1" ref={containerRef}>
        <div className={c("a", "selected")}>这是A</div>
        <div>这是B</div>
        <div className="selected">这是C</div>
        <div className="d">这是D</div>
        <div className="selected">这是E</div>
      </div>
      <button onClick={onChangeData}>点击改变页面上的数据</button>
    </Demo1Style>
  );
};

export default Demo1;
