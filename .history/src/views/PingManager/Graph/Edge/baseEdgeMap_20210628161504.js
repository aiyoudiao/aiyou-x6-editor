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
            name: _that.connectEdgeType.router.name || "",
        },
        zIndex: 0,
    }
}

// 实线 - 直线

// 实线 - 曲线

// 实线 - 直角


