import "./yysrank.css"
import "./index.scss"
import "./css/icons.scss"
import demo from "./demo";
import getRankChange from "./rank-change";

$(window).on('load', function () {
    console.log("window done");
    initOptions();
    initTables();
    initShishenRank();
    showUpdates();
    demo();
});


function initShishenRank() {
    var url = "json/shishen_rank.json"
    var request = new XMLHttpRequest()
    request.open("get", url)
    request.send(null)
    request.onload = function () {
        var json = JSON.parse(request.responseText)
        var shishen_rank = []
        for (var key in json) {
            var shishen_html = getTeamIcons([json[key][2]])
            shishen_html = shishen_html + shishen_json[json[key][2]]['name']
            var win_rate_html = createProgBar(json[key][3] / 100, 1)
            var pick_rate_html = createProgBar(json[key][4], 1)
            var rank_change = getRankChange(json[key][1])
            var row = {
                rank: json[key][0],
                rank_change: rank_change,
                shishen: shishen_html,
                win_rate: win_rate_html,
                pick_rate: pick_rate_html,
                total_matches: json[key][5]

            }
            shishen_rank.push(row)
        }
        $('#shishen-rank-table').bootstrapTable('load', shishen_rank)
    }
}


// 注册给遗留系统
window.demo = demo;
window.getRankChange = getRankChange;
