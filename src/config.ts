/* eslint-disable @typescript-eslint/member-delimiter-style */
interface Config {
    update: string,
    aiversion: string,
    range: string,
    routes: {
        [key: string]: {}
    },
}

const config: Config = {
    update: '11/02/2020',
    aiversion: '1.1.0',
    range: '10/26-11/01',
    routes: {
        'win-rate': {
            name: '阵容胜率排行',
        },
        'rank': {
            name: '排行榜',
        },
        'ai': {
            name: '翻牌AI',
        },
        'more-tools': {
            name: '攻略&工具导航',
        },
        'tutorial': {
            name: '食用指南',
        },
    },
}
export default config;
