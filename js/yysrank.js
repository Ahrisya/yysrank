// global variables
var shishen_json
var data
var ownteam = []
var enemyteam = []
var historynum = 0
var queryhistory = {}

window.onload = function () {
    initOptions()
    loadData()
    initTables()
    initShishenRank()
}

function loadData() {
    var url = "json/data.json"
    var request = new XMLHttpRequest()
    request.open("get", url)
    request.send(null)
    request.onload = function () {
        data = JSON.parse(request.responseText)
    }
}

function initOptions() {
    var url = "json/shishen.json"
    var request = new XMLHttpRequest()
    request.open("get", url)
    request.send(null)
    request.onload = function () {
        var json = JSON.parse(request.responseText)
        shishen_json = json
        var sp = "<optgroup label=\"SP\">"
        var ssr = "<optgroup label=\"SSR\">"
        var sr = "<optgroup label=\"SR\">"
        var r = "<optgroup label=\"R\">"
        var n = "<optgroup label=\"N\">"
        for (var i in json) {
            if (Number(i) < 100) {
                continue
            }
            p = json[i]
            if (p["rarity"] == 6) {
                sp = sp + "<option value=\"" + String(p["id"]) + "\">" + p["name"] + "</option>"
            }
            else if (p["rarity"] == 5) {
                ssr = ssr + "<option value=\"" + String(p["id"]) + "\">" + p["name"] + "</option>"
            }
            else if (p["rarity"] == 4) {
                sr = sr + "<option value=\"" + String(p["id"]) + "\">" + p["name"] + "</option>"
            }
            else if (p["rarity"] == 3) {
                r = r + "<option value=\"" + String(p["id"]) + "\">" + p["name"] + "</option>"
            }
            else if (p["rarity"] == 2) {
                n = n + "<option value=\"" + String(p["id"]) + "\">" + p["name"] + "</option>"
            }
        }
        sp = sp + "</optgroup>"
        ssr = ssr + "</optgroup>"
        sr = sr + "</optgroup>"
        r = r + "</optgroup>"
        n = n + "</optgroup>"
        var html = sp + ssr + sr + r + n
        var options = document.getElementById("select-own-shishen")
        options.innerHTML = html
        options = document.getElementById("select-enemy-shishen")
        options.innerHTML = html
        $('.form-control').selectpicker('refresh')
    }
}


function initTables() {
    $('#query-result').bootstrapTable({
        classes:"table table-striped table-bordered table-hover",
        theadClasses: "thead-light",
        sortable: true,
        sortOrder: 'desc',
        columns: [{
            field: 'history',
            title: '#',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 5,
            widthUnit: '%'
        },{
            field: 'own_team',
            title: '己方阵容',
            align: 'center',
            valign: 'middle',
            width: 25,
            widthUnit: '%'
        },{
            field: 'enemy_team',
            title: '对方阵容',
            align: 'center',
            valign: 'middle',
            width: 25,
            widthUnit: '%'
        },{
            field: 'win_matches',
            title: '获胜场次',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 10,
            widthUnit: '%'
        },{
            field: 'total_matches',
            title: '总场次',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 10,
            widthUnit: '%'
        },{
            field: 'win_rate',
            title: '胜率',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 20,
            widthUnit: '%'
        },{
            field: 'details',
            title: '更多',
            align: 'center',
            valign: 'middle',
            width: 5,
            widthUnit: '%'
        }]
    }
    )
    $('#detailed-query-result').bootstrapTable({
        classes:"table table-striped table-bordered table-hover",
        theadClasses: "thead-light",
        sortable: true,
        sortOrder: 'desc',
        pagination:true,
        pageNumber:1,
        pageSize:10,
        pageList:"[10, 20, 50, 200]",
        paginationHAlign:"left",
        paginationDetailHAlign:"right",
        
        columns: [{
            field: 'own_team',
            title: '己方阵容',
            align: 'center',
            valign: 'middle',
            width: 25,
            widthUnit: '%'
        },{
            field: 'enemy_team',
            title: '对方阵容',
            align: 'center',
            valign: 'middle',
            width: 25,
            widthUnit: '%'
        },{
            field: 'win_matches',
            title: '获胜场次',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 15,
            widthUnit: '%'
        },{
            field: 'total_matches',
            title: '总场次',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 15,
            widthUnit: '%'
        },{
            field: 'win_rate',
            title: '胜率',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 20,
            widthUnit: '%'
        }]
    }
    )

    $('#shishen-rank-table').bootstrapTable({
        classes:"table table-striped table-hover",
        theadClasses: "thead-light",
        sortable: true,
        sortOrder: 'desc',
        pagination:true,
        pageNumber:1,
        pageSize:20,
        pageList:"[20, 50, 100, 200]",
        paginationHAlign:"left",
        paginationDetailHAlign:"right",
        columns: [{
            field: 'rank',
            title: '#',
            align: 'center',
            valign: 'middle',
            width: 5,
            widthUnit: '%'
        },{
            field: 'rank_change',
            title: '',
            align: 'center',
            valign: 'middle',
            width: 5,
            widthUnit: '%'
        },{
            field: 'shishen',
            title: '式神',
            align: 'center',
            valign: 'middle',
            width: 20,
            widthUnit: '%'
        },{
            field: 'win_rate',
            title: '外战胜率',
            align: 'center',
            valign: 'middle',
            width: 30,
            widthUnit: '%'
        },{
            field: 'pick_rate',
            title: '选用率',
            align: 'center',
            valign: 'middle',
            width: 30,
            widthUnit: '%'
        },{
            field: 'total_matches',
            title: '外战次数',
            align: 'center',
            valign: 'middle',
            width: 10,
            widthUnit: '%'
        }]
    }
    )
}

function createProgBar(v, maxv) {
    var w = toPercent(v/maxv)
    var html = '<div class="progress" style="height: 25px;" placeholder="test"><div class="progress-bar" style="width: ' + w + ';background-color:#0489B1" role="progressbar" aria-valuenow="' + v + '" aria-valuemin="0" aria-valuemax="100"></div><p style="left:' + w + '">' + toPercent(v) + '</p></div>'
    return html
}

function getRankChange(c) {
    var html
    if (c == 'new') {
        html = '<font color="blue">new</font>'
    }
    else if (c > 0) {
        html = '<img src="./assets/img/icon-championtier-up.png" alt=""><font color="green">' + String(c) + '</font>'
    }
    else if (c < 0) {
        html = '<img src="./assets/img/icon-championtier-down.png" alt=""><font color="red">' + String(-c) + '</font>'
    }
    else {
        html = '<img src="./assets/img/icon-championtier-stay.png" alt=""><font color="gray">' + String(c) + '</font>'
    }
    return html
}

function initShishenRank() {
    var url = "json/shishen_rank.json"
    var request = new XMLHttpRequest()
    request.open("get", url)
    request.send(null)
    request.onload = function () {
        var json = JSON.parse(request.responseText)
        shishen_rank = []
        for (key in json) {
            var shishen_html = getTeamIcons([json[key][2]])
            shishen_html = shishen_html + shishen_json[json[key][2]]['name']
            var win_rate_html = createProgBar(json[key][3]/100, 1)
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


function resetTeams() {
    ownteam = []
    enemyteam = []
    refreshTeam(true)
    refreshTeam(false)
}

function refreshTeam(is_own_team) {
    var team
    var team_display
    if (is_own_team) {
        team = ownteam
        team_display = document.getElementById("own-team")
        $('#select-own-shishen').selectpicker('deselectAll')
    }
    else {
        team = enemyteam
        team_display = document.getElementById("enemy-team")
        $('#select-enemy-shishen').selectpicker('deselectAll')
    }
    var html = ""
    for (var i in team) {
        var key = team[i]
        var icon = shishen_json[key]["icon"]
        var name = shishen_json[key]["name"]
        html += "<button class=\"shishen-button\" type=\"button\"><img src=\"" + icon + "\"  alt=" + name + " width=\"50\" height=\"50\" ondblclick=\"deleteShishen(" + String(is_own_team) + ", " + key + ")\"></button>"
    }
    team_display.innerHTML = html
}

function addShishen(is_own_team) {
    if (is_own_team) {
        var value = $('#select-own-shishen').val();
        for (var i in value) {
            ownteam.push(value[i])
        }
    }
    else {
        var value = $('#select-enemy-shishen').val();
        for (var i in value) {
            enemyteam.push(value[i])
        }
    }
    refreshTeam(is_own_team)
}

function deleteShishen(is_own_team, key) {
    if (is_own_team) {
        var index = ownteam.indexOf(String(key))
        ownteam.splice(index, 1)
    }
    else {
        var index = enemyteam.indexOf(String(key))
        enemyteam.splice(index, 1)
    }
    refreshTeam(is_own_team)
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
        }
        else if (a[i] == b[j]) {
            i++
            j++
        }
        else {
            return false
        }
    }
    if (i == a.length) {
        return true
    }
    return false
}

function toPercent(x) {
    var str = Number(x * 100).toFixed(2);
    str += "%";
    return str;
}


function queryWinRate() {
    if (ownteam.length > 5 || enemyteam.length > 5) {
        toastr.options.positionClass = "toast-top-center"
        toastr.warning("阵容式神数量超过5个！", "")
    }
    else if (ownteam.length == 0) {
        toastr.options.positionClass = "toast-top-center"
        toastr.warning("请设置己方阵容！", "")
    }
    else {
        $('#detailed-result').modal('show')
        $('#query-progress')[0].style.display = ""
        var progress_bar = document.getElementById("query-progress-bar")
        var t1 = ownteam.map(Number)
        t1 = t1.sort(sortNum)
        var t2 = enemyteam.map(Number)
        t2 = t2.sort(sortNum)
        var n = data['n']
        var win_num = 0
        var loss_num = 0

        detailed = {}

        for (var i = 0; i < n; i++) {
            var battle = data['data'][i]
            if (isContained(t1, battle['w']) && isContained(t2, battle['l']) && !isContained(t1, battle['l'])) {
                win_num++
                var key = team2Key(battle['w'], battle['l'])
                if (detailed.hasOwnProperty(key)) {
                    detailed[key]['w']++
                }
                else {
                    detailed[key] = {'w': 1, 'l': 0}
                }
                
            }
            else if (isContained(t1, battle['l']) && isContained(t2, battle['w']) && !isContained(t1, battle['w'])) {
                loss_num++
                var key = team2Key(battle['l'], battle['w'])
                if (detailed.hasOwnProperty(key)) {
                    detailed[key]['l']++
                }
                else {
                    detailed[key] = {'w': 0, 'l': 1}
                }
            }
            if (i % 1000 == 0) {
                progress_bar.style.width = toPercent(i / n)
                progress_bar.innerText = toPercent(i / n)
            }
        }
        progress_bar.style.width = "100%"
        progress_bar.innerText = "Done! Rendering……"
        
        renderDetailedResult(detailed)
        addResult(win_num, loss_num)
        resetTeams()
    }
}

function getTeamIcons(t) {
    var team_icons = ""
    for (var i in t) {
        var key = t[i]
        var icon = shishen_json[key]["icon"]
        var name = shishen_json[key]["name"]
        team_icons += "<img src=\"" + icon + "\"  alt=" + name + " width=\"40\" height=\"40\"> &nbsp;"
    }
    return team_icons
}

function addResult(win_num, loss_num) {
    var own_team_icons = getTeamIcons(ownteam)
    var enemy_team_icons = getTeamIcons(enemyteam)
    var win_rate_percent = toPercent(0)
    if (win_num + loss_num > 0) {
        win_rate_percent = toPercent(win_num / (win_num + loss_num))
    }
    historynum++
    
    var more_detail =  '<button class="detail-button" type="button" onclick="showHistoryDetail(' + String(historynum) +')">' + '<img src="assets/img/three-dots.svg" alt="" width="16" height="16" title="详细胜率"></img></button>'

    var new_result = [{
        history: historynum,
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
    var t1_str, t2_str
    t1 = key_split[0].split(',')
    t2 = key_split[1].split(',')
    return {
        'ownteam':t1,
        'enemyteam':t2
    }
}

function renderDetailedResult(detailed_data) {
    $('#detailed-query-result').bootstrapTable('removeAll')
    var detailed_result = []
    for (key in detailed_data) {
        var team = key2Team(key)
        own_team_icons = getTeamIcons(team['ownteam'])
        enemy_team_icons = getTeamIcons(team['enemyteam'])
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
    $('#detailed-query-result').bootstrapTable('load', JSON.parse(queryhistory[String(n-1)]))
}