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


function initOptions() {
    var url = "json/shishen.json"
    var request = new XMLHttpRequest()
    request.open("get", url)
    request.send(null)
    request.onload = function () {
        var json = JSON.parse(request.responseText)
        shishen_json = json
        sp_opts = '<optgroup label="SP">'
        ssr_opts = '<optgroup label="SSR">'
        sr_opts = '<optgroup label="SR">'
        r_opts = '<optgroup label="R">'
        n_opts = '<optgroup label="N">'
        for (var i in json) {
            if (Number(i) < 100) {
                continue
            }
            p = json[i]
            if (p["rarity"] == 6) {
                sp_opts = sp_opts + '<option value="' + String(p["id"]) + '" data-content=\'' + getTeamIcons([String(p["id"])]) + p["name"] + '\'>' + '</option>'
            } else if (p["rarity"] == 5) {
                ssr_opts = ssr_opts + '<option value="' + String(p["id"]) + '" data-content=\'' + getTeamIcons([String(p["id"])]) + p["name"] + '\'>' + '</option>'
            } else if (p["rarity"] == 4) {
                sr_opts = sr_opts + '<option value="' + String(p["id"]) + '" data-content=\'' + getTeamIcons([String(p["id"])]) + p["name"] + '\'>' + '</option>'
            } else if (p["rarity"] == 3) {
                r_opts = r_opts + '<option value="' + String(p["id"]) + '" data-content=\'' + getTeamIcons([String(p["id"])]) + p["name"] + '\'>' + '</option>'
            } else if (p["rarity"] == 2) {
                n_opts = n_opts + '<option value="' + String(p["id"]) + '" data-content=\'' + getTeamIcons([String(p["id"])]) + p["name"] + '\'>' + '</option>'
            }
        }
        sp_opts = sp_opts + '</optgroup>'
        ssr_opts = ssr_opts + '</optgroup>'
        sr_opts = sr_opts + '</optgroup>'
        r_opts = r_opts + '</optgroup>'
        n_opts = n_opts + '</optgroup>'
        var html_shishen = sp_opts + ssr_opts + sr_opts + r_opts + n_opts
        var html_rarity = '<option value="0">全部</option><option value="6">SP</option><option value="5">SSR</option><option value="4">SR</option><option value="3">R</option><option value="2">N</option>'
        var options = document.getElementsByClassName('selectpicker')
        for (var i = 0; i < options.length; i++) {
            if (options[i].name == 'select-rarity') {
                options[i].innerHTML = html_rarity
            } else if (options[i].name == 'select-own-shishen' || options[i].name == 'select-enemy-shishen' || options[i].name == 'select-ban') {
                options[i].innerHTML = html_shishen
            }
        }
        $('.selectpicker').selectpicker('refresh')
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


function initTables() {
    $('#query-result').bootstrapTable({
        classes: "table table-striped table-bordered table-hover",
        theadClasses: "thead-light",
        sortable: true,
        sortOrder: 'desc',
        customSort: sortingData,
        columns: [{
            field: 'history',
            title: '#',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 5,
            widthUnit: '%'
        }, {
            field: 'ban',
            title: 'Ban',
            align: 'center',
            valign: 'middle',
            width: 10,
            widthUnit: '%'
        }, {
            field: 'own_team',
            title: '己方阵容',
            align: 'center',
            valign: 'middle',
            width: 25,
            widthUnit: '%'
        }, {
            field: 'enemy_team',
            title: '对方阵容',
            align: 'center',
            valign: 'middle',
            width: 25,
            widthUnit: '%'
        }, {
            field: 'win_matches',
            title: '获胜场次',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 10,
            widthUnit: '%'
        }, {
            field: 'total_matches',
            title: '总场次',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 10,
            widthUnit: '%'
        }, {
            field: 'win_rate',
            title: '胜率',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 10,
            widthUnit: '%'
        }, {
            field: 'details',
            title: '更多',
            align: 'center',
            valign: 'middle',
            width: 5,
            widthUnit: '%'
        }]
    })
    $('#detailed-query-result').bootstrapTable({
        classes: "table table-striped table-bordered table-hover",
        theadClasses: "thead-light",
        sortable: true,
        sortOrder: 'desc',
        customSort: sortingData,
        pagination: true,
        pageNumber: 1,
        pageSize: 10,
        pageList: "[10, 20, 50, 200]",
        paginationHAlign: "left",
        paginationDetailHAlign: "right",

        columns: [{
            field: 'own_team',
            title: '己方阵容',
            align: 'center',
            valign: 'middle',
            width: 25,
            widthUnit: '%'
        }, {
            field: 'enemy_team',
            title: '对方阵容',
            align: 'center',
            valign: 'middle',
            width: 25,
            widthUnit: '%'
        }, {
            field: 'win_matches',
            title: '获胜场次',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 15,
            widthUnit: '%'
        }, {
            field: 'total_matches',
            title: '总场次',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 15,
            widthUnit: '%'
        }, {
            field: 'win_rate',
            title: '胜率',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 20,
            widthUnit: '%'
        }]
    })

    $('#shishen-rank-table').bootstrapTable({
        classes: "table table-striped table-hover",
        theadClasses: "thead-light",
        sortable: true,
        sortOrder: 'desc',
        pagination: true,
        pageNumber: 1,
        pageSize: 20,
        pageList: "[20, 50, 100, 200]",
        paginationHAlign: "left",
        paginationDetailHAlign: "right",
        columns: [{
            field: 'rank',
            title: '#',
            align: 'center',
            valign: 'middle',
            width: 5,
            widthUnit: '%'
        }, {
            field: 'rank_change',
            title: '',
            align: 'center',
            valign: 'middle',
            width: 5,
            widthUnit: '%'
        }, {
            field: 'shishen',
            title: '式神',
            align: 'center',
            valign: 'middle',
            width: 20,
            widthUnit: '%'
        }, {
            field: 'win_rate',
            title: '外战胜率',
            align: 'center',
            valign: 'middle',
            width: 30,
            widthUnit: '%'
        }, {
            field: 'pick_rate',
            title: '选用率',
            align: 'center',
            valign: 'middle',
            width: 30,
            widthUnit: '%'
        }, {
            field: 'total_matches',
            title: '外战次数',
            align: 'center',
            valign: 'middle',
            width: 10,
            widthUnit: '%'
        }]
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


function queryWinRate() {
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

        detailed = {}
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
