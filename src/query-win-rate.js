import moreIcon from "bootstrap-icons/icons/three-dots.svg"
import {sortNum, toPercent} from "./utils/numbers"
import globals from "./globals";

export function changeRarity(rarity, id) {
    let {sp_opts, ssr_opts, sr_opts, r_opts, n_opts} = globals;
    let opt = document.getElementById(id);
    switch (rarity) {
        case "0":
            opt.innerHTML = sp_opts + ssr_opts + sr_opts + r_opts + n_opts
            break;
        case "6":
            opt.innerHTML = sp_opts
            break;
        case "5":
            opt.innerHTML = ssr_opts
            break;
        case "4":
            opt.innerHTML = sr_opts
            break;
        case "3":
            opt.innerHTML = r_opts
            break;
        case "2":
            opt.innerHTML = n_opts
            break;
    }
    $('.selectpicker').selectpicker('refresh')
}


// check if sorted array a and b's intersection is not empty
function hasIntersection(a, b) {
    var i = 0
    var j = 0
    while (i < a.length && j < b.length) {
        if (a[i] > b[j]) {
            j++
        } else if (a[i] == b[j]) {
            return true
        } else {
            i++
        }
    }
    return false
}

export function selectShishen(btn_id) {
    var btn = document.getElementById(btn_id)
    btn.style.display = ""
}

export function resetSSOption(btn_id, opt_id) {
    var btn = document.getElementById(btn_id)
    btn.style.display = "none"
    var opt = document.getElementById(opt_id)
    opt.value = 0
    $('.selectpicker').selectpicker('refresh')
}


function team2Key(t1, t2) {
    return String(t1) + '.' + String(t2)
}

function key2Team(key) {
    var key_split = key.split('.')
    var t1 = key_split[0].split(',')
    var t2 = key_split[1].split(',')
    return {
        'ownteam': t1,
        'enemyteam': t2
    }
}

function renderDetailedResult(detailed_data) {
    $('#detailed-query-result').bootstrapTable('removeAll')
    var detailed_result = []
    for (var key in detailed_data) {
        var team = key2Team(key)
        var
            own_team_icons = getTeamIcons(beautifyOutput(team['ownteam'], ownteam))
        var enemy_team_icons = getTeamIcons(beautifyOutput(team['enemyteam'], enemyteam))
        var win_num = detailed_data[key]['w']
        var total_num = win_num + detailed_data[key]['l']
        var win_rate_percent = toPercent(win_num / total_num)

        var row = {
            own_team: own_team_icons,
            enemy_team: enemy_team_icons,
            win_matches: win_num,
            total_matches: total_num,
            win_rate: win_rate_percent
        }
        detailed_result.push(row)
    }
    queryhistory[String(historynum)] = JSON.stringify(detailed_result)
    $('#detailed-query-result').bootstrapTable('load', detailed_result)
    $('#query-progress')[0].style.display = "none"
}


function addResult(win_num, loss_num) {
    var own_team_icons = getTeamIcons(ownteam)
    var enemy_team_icons = getTeamIcons(enemyteam)
    var ban_icons = getTeamIcons(ban)
    var win_rate_percent = toPercent(0)
    if (win_num + loss_num > 0) {
        win_rate_percent = toPercent(win_num / (win_num + loss_num))
    }
    historynum++

    var more_detail = '<button class="detail-button" type="button" onclick="showHistoryDetail(' + String(historynum) + ')">' + '<img src="' + moreIcon + '" alt="" width="16" height="16" title="详细胜率"></img></button>'

    var new_result = [{
        history: historynum,
        ban: ban_icons,
        own_team: own_team_icons,
        enemy_team: enemy_team_icons,
        win_matches: win_num,
        total_matches: win_num + loss_num,
        win_rate: win_rate_percent,
        details: more_detail
    }]
    $('#query-result').bootstrapTable('prepend', new_result)
}

export function showHistoryDetail(n) {
    $('#detailed-query-result').bootstrapTable('removeAll')
    $('#detailed-result').modal('show')
    $('#detailed-query-result').bootstrapTable('load', JSON.parse(queryhistory[String(n - 1)]))
}


function beautifyOutput(t1, t2) {
    var beautify_result = []
    for (var i = 0; i < t2.length; i++) {
        beautify_result.push(t2[i])
    }
    var checked_idx1 = []
    var checked_idx2 = []
    for (var i = 0; i < t1.length; i++) {
        for (var j = 0; j < t2.length; j++) {
            if ($.inArray(j, checked_idx2) >= 0) {
                continue
            }
            if (t1[i] == t2[j]) {
                checked_idx1.push(i)
                checked_idx2.push(j)
                break
            }
        }
        if (checked_idx2.length == t2.length) {
            break
        }
    }
    for (var i = 0; i < t1.length; i++) {
        if ($.inArray(i, checked_idx1) < 0) {
            beautify_result.push(t1[i])
        }
    }
    if (beautify_result.length != 5) {
        alert('something is wrong when beautifying outputs')
    }
    return beautify_result
}


// check if sorted array b contains a
function isContained(a, b) {
    var i = 0
    var j = 0
    while (i < a.length && j < b.length) {
        if (a[i] > b[j]) {
            j++
        } else if (a[i] == b[j]) {
            i++
            j++
        } else {
            return false
        }
    }
    if (i == a.length) {
        return true
    }
    return false
}

export function resetTeams() {
    var
        ownteam = []
    var enemyteam = []
    var ban = []
    var options = document.getElementsByClassName('selectpicker')
    for (var i = 0; i < options.length; i++) {
        options[i].value = 0;
    }
    $('.selectpicker').selectpicker('refresh');

    var btns = document.getElementsByClassName('minus-button')
    for (var i = 0; i < btns.length; i++) {
        btns[i].style.display = "none"
    }

    window.ownteam = ownteam;
    window.enemyteam = enemyteam;
    window.ban = ban;

}


const queryWinRate = () => {
    ownteam = []
    enemyteam = []
    ban = []

    var own_team_ele = document.getElementsByName('select-own-shishen')
    var enemy_team_ele = document.getElementsByName('select-enemy-shishen')
    for (var i = 0; i < own_team_ele.length; i++) {
        var v = own_team_ele[i].value
        if (v != "") {
            ownteam.push(v)
        }
    }
    for (var i = 0; i < enemy_team_ele.length; i++) {
        var v = enemy_team_ele[i].value
        if (v != "") {
            enemyteam.push(v)
        }
    }

    var ban_ele = document.getElementsByName('select-ban')
    for (var i = 0; i < ban_ele.length; i++) {
        var v = ban_ele[i].value
        if (v != "") {
            ban.push(v)
        }
    }

    var t1 = ownteam.map(Number)
    t1 = t1.sort(sortNum)
    var t2 = enemyteam.map(Number)
    t2 = t2.sort(sortNum)
    var tb = ban.map(Number)
    tb = tb.sort(sortNum)

    if (hasIntersection(tb, t1) || hasIntersection(tb, t2)) {
        toastr.options.positionClass = "toast-top-center"
        toastr.warning("BP冲突！", "")
    } else if (ownteam.length == 0) {
        toastr.options.positionClass = "toast-top-center"
        toastr.warning("请设置己方阵容！", "")
    } else {
        $('#detailed-result').modal('show')
        $('#query-progress')[0].style.display = ""
        var progress_bar = document.getElementById("query-progress-bar")
        var n = data['n']
        var win_num = 0
        var loss_num = 0
        var detailed = {}
        // When t1 is containted in t2
        if (isContained(t1, t2)) {
            for (var i = 0; i < n; i++) {
                var battle = data['data'][i]
                if (hasIntersection(tb, battle['w']) || hasIntersection(tb, battle['l']) || (battle['w'] == battle['l'])) {
                    continue
                }
                if (isContained(t1, battle['w']) && isContained(t2, battle['l'])) {
                    win_num++
                    var key = team2Key(battle['w'], battle['l'])
                    if (detailed.hasOwnProperty(key)) {
                        detailed[key]['w']++
                    } else {
                        detailed[key] = {
                            'w': 1,
                            'l': 0
                        }
                    }

                }
                if (isContained(t1, battle['l']) && isContained(t2, battle['w'])) {
                    loss_num++
                    var key = team2Key(battle['l'], battle['w'])
                    if (detailed.hasOwnProperty(key)) {
                        detailed[key]['l']++
                    } else {
                        detailed[key] = {
                            'w': 0,
                            'l': 1
                        }
                    }
                }
                if (i % 1000 == 0) {
                    progress_bar.style.width = toPercent(i / n)
                    progress_bar.innerText = toPercent(i / n)
                }
            }
        } else {
            for (var i = 0; i < n; i++) {
                var battle = data['data'][i]
                if (hasIntersection(tb, battle['w']) || hasIntersection(tb, battle['l'])) {
                    continue
                }
                if (isContained(t1, battle['w']) && isContained(t2, battle['l']) && !isContained(t1, battle['l'])) {
                    win_num++
                    var key = team2Key(battle['w'], battle['l'])
                    if (detailed.hasOwnProperty(key)) {
                        detailed[key]['w']++
                    } else {
                        detailed[key] = {
                            'w': 1,
                            'l': 0
                        }
                    }

                } else if (isContained(t1, battle['l']) && isContained(t2, battle['w']) && !isContained(t1, battle['w'])) {
                    loss_num++
                    var key = team2Key(battle['l'], battle['w'])
                    if (detailed.hasOwnProperty(key)) {
                        detailed[key]['l']++
                    } else {
                        detailed[key] = {
                            'w': 0,
                            'l': 1
                        }
                    }
                }
                if (i % 1000 == 0) {
                    progress_bar.style.width = toPercent(i / n)
                    progress_bar.innerText = toPercent(i / n)
                }
            }
        }
        progress_bar.style.width = "100%"
        progress_bar.innerText = "Done! Rendering……"

        renderDetailedResult(detailed)
        addResult(win_num, loss_num)
    }
};

export default queryWinRate;
