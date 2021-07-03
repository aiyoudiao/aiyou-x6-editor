export const pingManagerConfigData = {
    // 节点
    nodes: [
        {
            id: 'node-2021-06-16-001', shape: 'rect', x: 40, y: 40, width: 80, height: 40, label: 'first x6 node',
            attrs: {
                body: {
                    fill: '#2ecc',
                    stroke: '#000',
                    strokeDasharray: '10,2',
                },
                label: {
                    text: 'first x6 node 2',
                    fill: '#a0f',
                    fontSize: 13
                }
            }
        },
        {
            id: 'node-2021-06-16-002', shape: 'ellipse', x: 160, y: 180, width: 80, height: 40, label: 'last x6 node',
            attrs: {
                body: {
                    fill: '#ffa0a0',
                    stroke: '#a0a0ff',
                    rx: 16,
                    ry: 16
                },
                label: {
                    text: 'last x6 node 2',
                    fill: '#a3a3a3',
                    fontSize: 18,
                    fontWeight: 'bold',
                    fontVariant: 'small-caps'
                }
            }
        },
    ],
    // 边 关系
    edges: [
        {
            source: 'node-2021-06-16-001',
            target: 'node-2021-06-16-002',
            // shape: 'double-edge',
            shape: 'shadow-edge',
            attrs: {
                line: {
                    stroke: 'orange'
                }
            }
        }
    ]
}