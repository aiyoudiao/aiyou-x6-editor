import { clone, merge } from '@/views/PingManager/Utils';

function getBasicEdgeConfig() {
    return {
        attrs: {
            line: {
                stroke: "#1890ff",
                strokeWidth: 1,
                targetMarker: {
                    name: "classic",
                    size: 8,
                },
                strokeDasharray: 0, //虚线
                style: {
                    animation: "ant-line 30s infinite linear",
                },
            },
        },
        label: {
            text: "",
        },
        connector: 'normal',
        router: {
            name: "",
        },
        zIndex: 0,
    }
}

// 实线 - 直线

const 直线箭头 = merge({
    connector: "normal",
    router: { name: "" },
}, getBasicEdgeConfig())

const Normal = 直线箭头

// 实线 - 曲线箭头
const 曲线箭头 = merge({
    connector: "smooth",
    router: { name: "" },
}, getBasicEdgeConfig())


// 实线 - 直角箭头
const 直角箭头 = merge({
    connector: "normal",
    router: { name: "manhattan" },
}, getBasicEdgeConfig())



