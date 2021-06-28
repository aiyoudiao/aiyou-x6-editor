import { ports } from './ports'
import {
    核心路由器,
    核心交换机,
    服务器,
    管理服务器,
    用户,
    终端机,
} from "@/views/PingManager/IMG/img";
import { clone } from '@/views/PingManager/Utils';

const baseConfig = {
    shape: 'image',
    width: 64,
    height: 64,
    attrs: {
        label: {
            text: '核心路由器',
            fill: '#000000',
            fontSize: 20,
            textWrap: {
                width: -10,
                height: -10,
                ellipsis: true,
            },
            refX: 0.5,
            refY: '100%',
            refY2: 4,
            textAnchor: 'middle',
            textVerticalAnchor: 'top',
        },
        body: {
            stroke: '#000000',
            strokeWidth: 1,
            fill: '#ffffff',
        }
    },
    // 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
    ports: ports
}

export const CoreRouter = Object.assign(clone(baseConfig), {
    imageUrl: 核心路由器,
})

export const Server = {
    shape: 'image',
    width: 64,
    height: 64,
    imageUrl: 核心路由器,
    attrs: {
        label: {
            text: '核心路由器',
            fill: '#000000',
            fontSize: 20,
            textWrap: {
                width: -10,
                height: -10,
                ellipsis: true,
            },
            refX: 0.5,
            refY: '100%',
            refY2: 4,
            textAnchor: 'middle',
            textVerticalAnchor: 'top',
        },
        body: {
            stroke: '#000000',
            strokeWidth: 1,
            fill: '#ffffff',
        }
    },
    // 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
    ports: ports
}