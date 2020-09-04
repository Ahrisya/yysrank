import "./yysrank.css"
import "./index.scss"
import "./css/icons.scss"
import demo from "./demo";
import getRankChange from "./rank-change";
import getTeamIcons from "./team-icons";
import initShishenRank from "./init/shishen-rank";
import initTables from "./init/table";

$(window).on('load', function () {
    console.log("window done");
    initOptions();
    initTables();
    initShishenRank();
    showUpdates();
    demo();
});


// 注册给遗留系统
window.demo = demo;
window.initTables = initTables;
window.getRankChange = getRankChange;
window.getTeamIcons = getTeamIcons;
