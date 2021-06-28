import { ports } from './ports'

export const Rect = {
    width: 100,
    height: 60,
    attrs: {
        label: {
            text: '正方形节点',
            fill: '#000000',
            fontSize: 14,
            textWrap: {
                width: -10,
                height: -10,
                ellipsis: true,
            },
        },
        body: {
            stroke: '#000000',
            strokeWidth: 1,
            fill: '#ffffff',
        }
    },
    ports: ports
}

export const Circle = {
    shape: 'ellipse',
    width: 100,
    height: 100,
    attrs: {
        label: {
            text: '圆形节点',
            fill: '#000000',
            fontSize: 14,
            textWrap: {
                width: -20,
                height: -10,
                ellipsis: true,
            },
        },
        body: {
            stroke: '#000000',
            strokeWidth: 1,
            fill: '#ffffff',
        }
    },
    ports: ports
}

export const Condition = {
    shape: 'polygon',
    x: 40,
    y: 40,
    width: 120,
    height: 120,
    attrs: {
        label: {
            text: '条件节点',
            fill: '#000000',
            fontSize: 14,
            textWrap: {
                width: -50,
                height: '70%',
                ellipsis: true,
            },
        },
        body: {
            fill: '#ffffff',
            stroke: '#000000',
            refPoints: '0,10 10,0 20,10 10,20',
            strokeWidth: 1,
        },
    },
    ports: ports
}