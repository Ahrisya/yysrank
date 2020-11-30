/* eslint-disable @typescript-eslint/member-delimiter-style */
interface Config {
    update: string,
    aiversion: string,
    range: string,
    routes: {
        [key: string]: {}
    },
    contacts: {
        [key: string]: {}
    },
}

const config: Config = {
    update: '11/30/2020',
    aiversion: '1.1.4',
    range: '11/23-11/29',
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
    contacts: {
        'group': {
            name: 'QQ交流群: 850716880',
        },
        'qq': {
            name: 'QQ: 1282519861',
        },
        'wechat': {
            name: '微信: ahrisyya'
        },
        'bili': {
            name: '哔哩哔哩: Ahrisy'
        },
    },

}
export default config;
