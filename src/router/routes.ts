const WinRate = () => import("@/components/WinRate.vue");
const Rank = () => import("@/components/Rank.vue");
const Recommend = () => import("@/components/Recommend.vue");
const MoreTools = () => import("@/components/MoreTools.vue");
const Tutorial = () => import("@/components/Tutorial.vue");

const routes = [
    {path: '/win-rate', component: WinRate},
    {path: '/rank', component: Rank},
    {path: '/recommend', component: Recommend},
    {path: '/more-tools', component: MoreTools},
    {path: '/tutorial', component: Tutorial},
    {path: '/', redirect: '/win-rate'}
]

export default routes;
