import rankTable from "../../data/shishen_rank.json";
import getTeamIcons from "../team-icons";
import shishenTable from "../../data/shishen.json";
import getRankChange from "../rank-change";
import {toPercent} from "../utils/numbers"


function createProgBar(v, maxv) {
    var w = toPercent(v / maxv)
    var html = '<div class="progress" style="height: 25px;" placeholder="test"><div class="progress-bar" style="width: ' + w + ';background-color:#0489B1" role="progressbar" aria-valuenow="' + v + '" aria-valuemin="0" aria-valuemax="100"></div><p style="left:' + w + '">' + toPercent(v) + '</p></div>'
    return html
}

const initShishenRank = () => {
    var shishen_rank = [];
    for (let key in rankTable) {
        let shishen_html = getTeamIcons([rankTable[key][2]]);
        shishen_html = shishen_html + shishenTable[rankTable[key][2]]['name']
        let win_rate_html = createProgBar(rankTable[key][3] / 100, 1);
        let pick_rate_html = createProgBar(rankTable[key][4], 1);
        let rank_change = getRankChange(rankTable[key][1]);
        let row = {
            rank: rankTable[key][0],
            rank_change: rank_change,
            shishen: shishen_html,
            win_rate: win_rate_html,
            pick_rate: pick_rate_html,
            total_matches: rankTable[key][5]
        };
        shishen_rank.push(row)
    }
    $('#shishen-rank-table').bootstrapTable('load', shishen_rank);
};

export default initShishenRank;
