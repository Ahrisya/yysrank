import "./index.scss"
import "./styles/icons.scss"
import demo from "./demo";
import getRankChange from "./rank-change";
import getTeamIcons from "./team-icons";
import initShishenRank from "./init/shishen-rank";
import initTables from "./init/table";
import initOptions from "./init/shishen";
import initData from "./init/data";
import queryWinRate, {resetSSOption, resetTeams, selectShishen, showHistoryDetail} from "./query-win-rate";
import {getCookie, setCookie} from "./utils/cookies"
import app from "./globals"

var last_update_date = '0831'

function showUpdates() {
    if (getCookie("lastupdate") != last_update_date) {
        $('#new_updates').modal('show')
        setCookie("lastupdate", last_update_date, 1000)
    }

}

$(window).on('load', function () {
    console.log("window done");
    initOptions();
    initTables();
    initShishenRank();
    showUpdates();
    initData();
    demo();
});


// 注册给遗留系统
window.demo = demo;
window.initTables = initTables;
window.getRankChange = getRankChange;
window.getTeamIcons = getTeamIcons;
window.queryWinRate = queryWinRate;
window.setCookie = setCookie;
window.getCookie = getCookie;
window.showHistoryDetail = showHistoryDetail;
window.resetTeams = resetTeams;
window.selectShishen = selectShishen;
window.resetSSOption = resetSSOption;
window.sp_opts = app.sp_opts;
var {
    // shishen_json,
    ownteam,
    enemyteam,
    ban,
    historynum,
    queryhistory,
    sp_opts,
    ssr_opts,
    sr_opts,
    r_opts,
    n_opts
} = app
// window.shishen_json = shishen_json;
window.ownteam = ownteam;
window.enemyteam = enemyteam;
window.ban = ban;
window.historynum = historynum;
window.queryhistory = queryhistory;
window.sp_opts = sp_opts;
window.ssr_opts = ssr_opts;
window.sr_opts = sr_opts;
window.r_opts = r_opts;
window.n_opts = n_opts;
