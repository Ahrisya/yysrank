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
    update: '11/16/2020',
    aiversion: '1.1.2',
    range: '11/09-11/15',
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
