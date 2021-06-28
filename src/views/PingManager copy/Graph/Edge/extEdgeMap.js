import { insertCss } from "insert-css"

// 虚线

// 带动画的虚线
export const animateDashedLine = {
    connector: { name: 'smooth' },
    attrs: {
      line: {
        stroke: '#1890ff',
        strokeDasharray: 5,
        targetMarker: 'classic',
        style: {
          animation: 'ant-line 30s infinite linear',
        },
      },
    },
}

insertCss(`
  @keyframes ant-line {
    to {
        stroke-dashoffset: -1000
    }
  }
`)