import { useEffect, useRef, useState } from "react";
import { useMemoizedFn } from "ahooks";
import * as d3 from "d3";

import MindMap from "./mindMap";
import { data } from "../data";

const Graph = () => {
  const ref = useRef();
  const [minMap, setMinMap] = useState(null);

  /** 创建实例 */
  useEffect(() => {
    if (ref.current) {
      setMinMap(
        new MindMap({
          svg_container: d3.select(ref.current),
        })
      );
    }
  }, []);

  /** 节点点击事件 */
  const handleNodeClick = useMemoizedFn((selectedNode, tree) => {
    if (selectedNode.depth === 1) {
      tree.handleCollapsed(selectedNode);
    }
  });

  /** 给实例绑定点击事件 */
  useEffect(() => {
    if (minMap) {
      minMap.on("treeNodeClick", handleNodeClick);
    }
  }, [minMap, handleNodeClick]);

  /** 初始化树状图布局 */
  useEffect(() => {
    if (minMap) {
      minMap.init(data);
    }
  }, [minMap]);

  return (
    <div id="demo6">
      <svg ref={ref} width={1000} height={900} />
    </div>
  );
};

export default Graph;
