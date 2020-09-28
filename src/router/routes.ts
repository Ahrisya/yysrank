import config from "@/config";

const WinRate = () => import("@/modules/win-rate/components/WinRate.vue");
const Rank = () => import("@/components/Rank.vue");
const Recommend = () => import("@/components/Recommend.vue");
const MoreTools = () => import("@/components/MoreTools.vue");
const Tutorial = () => import("@/components/Tutorial.vue");

const routes = [
    {
        path: '/win-rate',
        component: WinRate,
        meta: {
            title: '',
            subTitle: '数据来源于各服前百名斗技记录，每周一 12:00 ~ 14:00 更新，上次更新：' + config.update
        }
    },
    {
        path: '/rank',
        component: Rank,
        meta: {
            title: '式神外战每周胜率榜',
            subTitle: '数据来源于各服前百名斗技记录，仅列出场次大于100的式神, 上次更新：' + config.update
        }
    },
    {
        path: '/recommend',
        component: Recommend,
        meta: {
            title: "Recommend",
            subTitle: "Under construction……",
        }
    },
    {
        path: '/more-tools',
        component: MoreTools,
        meta: {
            title: 'MoreTools',
            subTitle: `感谢@老铁炸心了的建议和整理以及各位作者的付出。如果有作者不希望您的作品被列在此处，请告知本人(Ahrisy)尽快进行删除。如果发现错误或者想推荐攻略和工具，也欢迎联系。`
        }
    },
    {
        path: '/tutorial',
        component: Tutorial,
        meta: {
            title: "Tutorial",
            subTitle: "发现bug或者有好的建议欢迎联系~"
        }
    },
    {path: '/', redirect: '/win-rate'}
]

export default routes;
