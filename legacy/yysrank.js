// global variables
var shishen_json
var ownteam = []
var enemyteam = []
var ban = []
var historynum = 0
var queryhistory = {}
var sp_opts = ''
var ssr_opts = ''
var sr_opts = ''
var r_opts = ''
var n_opts = ''

var last_update_date = '0831'

function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
	}
	return "";
}

function showUpdates () {
    if (getCookie("lastupdate") != last_update_date){
        $('#new_updates').modal('show')
        setCookie("lastupdate", last_update_date, 1000)
    }

}

function changeRarity(rarity, id) {
    var opt = document.getElementById(id)
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


function selectShishen(btn_id) {
    var btn = document.getElementById(btn_id)
    btn.style.display = ""
}

function resetSSOption(btn_id, opt_id) {
    var btn = document.getElementById(btn_id)
    btn.style.display = "none"
    var opt = document.getElementById(opt_id)
    opt.value = 0
    $('.selectpicker').selectpicker('refresh')
}


function sortingData(sortName, sortOrder, data) {
    var order = sortOrder === 'desc' ? -1 : 1
    data.sort(function (a, b) {
        var aa = a[sortName]
        var bb = b[sortName]
        if (typeof (aa) == 'string') {
            aa = Number(a[sortName].replace('%', ''))
            bb = Number(b[sortName].replace('%', ''))
        }
        if (aa < bb) {
            return order * -1
        }
        if (aa > bb) {
            return order
        }
        return 0
    })
}

function createProgBar(v, maxv) {
    var w = toPercent(v / maxv)
    var html = '<div class="progress" style="height: 25px;" placeholder="test"><div class="progress-bar" style="width: ' + w + ';background-color:#0489B1" role="progressbar" aria-valuenow="' + v + '" aria-valuemin="0" aria-valuemax="100"></div><p style="left:' + w + '">' + toPercent(v) + '</p></div>'
    return html
}

function resetTeams() {
    ownteam = []
    enemyteam = []
    ban = []
    var options = document.getElementsByClassName('selectpicker')
    for (var i = 0; i < options.length; i++) {
        options[i].value = 0;
    }
    $('.selectpicker').selectpicker('refresh');

    var btns = document.getElementsByClassName('minus-button')
    for (var i = 0; i < btns.length; i++) {
        btns[i].style.display = "none"
    }

}

function sortNum(a, b) {
    return a - b
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

function toPercent(x) {
    var str = Number(x * 100).toFixed(2);
    str += "%";
    return str;
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

    var more_detail = '<button class="detail-button" type="button" onclick="showHistoryDetail(' + String(historynum) + ')">' + '<img src="assets/img/three-dots.svg" alt="" width="16" height="16" title="详细胜率"></img></button>'

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

function team2Key(t1, t2) {
    return String(t1) + '.' + String(t2)
}

function key2Team(key) {
    var key_split = key.split('.')
    t1 = key_split[0].split(',')
    t2 = key_split[1].split(',')
    return {
        'ownteam': t1,
        'enemyteam': t2
    }
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

function renderDetailedResult(detailed_data) {
    $('#detailed-query-result').bootstrapTable('removeAll')
    var detailed_result = []
    for (key in detailed_data) {
        var team = key2Team(key)
        own_team_icons = getTeamIcons(beautifyOutput(team['ownteam'], ownteam))
        enemy_team_icons = getTeamIcons(beautifyOutput(team['enemyteam'], enemyteam))
        win_num = detailed_data[key]['w']
        total_num = win_num + detailed_data[key]['l']
        win_rate_percent = toPercent(win_num / total_num)

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

function showHistoryDetail(n) {
    $('#detailed-query-result').bootstrapTable('removeAll')
    $('#detailed-result').modal('show')
    $('#detailed-query-result').bootstrapTable('load', JSON.parse(queryhistory[String(n - 1)]))
}
