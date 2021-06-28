import { clone } from '@/views/PingManager/Utils';
import { ports } from './ports'
import {
    核心路由器,
    核心交换机,
    服务器,
    管理服务器,
    用户,
    终端机,
} from "@/views/PingManager/IMG/img";

function getBasicConfig() {
    return {
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
}

export const CoreRouter = Object.assign(getBasicConfig(), {
    imageUrl: 核心路由器,
})

export const CoreAlterMachine = Object.assign(getBasicConfig(), {
    imageUrl: 核心交换机,
})

export const Server = Object.assign(getBasicConfig(), {
    imageUrl: 服务器,
})

export const ManagerServer = Object.assign(getBasicConfig(), {
    imageUrl: 管理服务器,
})

export const User = Object.assign(getBasicConfig(), {
    imageUrl: 用户,
})

export const Commander = Object.assign(getBasicConfig(), {
    imageUrl: 终端机,
})

export {
    CoreRouter,
    CoreAlterMachine,
    Server,
    ManagerServer,
    User,
    Commander,
}