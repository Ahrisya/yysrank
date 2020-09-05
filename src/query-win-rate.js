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
