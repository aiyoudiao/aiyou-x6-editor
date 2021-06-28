// import '@antv/x6-vue-shape';
import { Graph, Shape, Addon, FunctionExt } from '@antv/x6';
import NodeMap from './Node/nodeMap'

// 拖拽生成四边形或者圆形
export const startDragToGraph = (graph, type, e) => {

    let nodeConfig = NodeMap[type] || NodeMap['Condition']
    const node = graph.createNode(nodeConfig)

    const dnd = new Addon.Dnd({ target: graph })
    dnd.start(node, e)
}


// 改变 边 形状
export const changeEdgeTypeToGraph = (graph, type, vueEntity) => {
    const that = vueEntity
    if (type === "直线箭头") {
        that.connectEdgeType = {
            connector: "normal",
            router: { name: "" },
        };
        that.currentArrow = 1;
    } else if (type === "曲线箭头") {
        that.connectEdgeType = {
            connector: "smooth",
            router: { name: "" },
        };
        that.currentArrow = 2;
    } else if (type === '直角箭头') {
        that.connectEdgeType = {
            connector: "normal",
            router: { name: "manhattan" },
        };
        that.currentArrow = 3;
    }
},