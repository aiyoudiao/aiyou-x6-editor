// import '@antv/x6-vue-shape';
import { Graph,Shape,Addon,FunctionExt} from '@antv/x6';
import NodeMap from './Node/nodeMap'

// 拖拽生成四边形或者圆形
export const startDragToGraph  = (graph,type,e) =>{

    let nodeConfig = NodeMap[type] || NodeMap['Condition']
    const node = graph.createNode(nodeConfig)

    const dnd = new Addon.Dnd({target:graph})
    dnd.start(node,e)
}
