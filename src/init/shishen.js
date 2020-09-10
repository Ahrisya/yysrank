import globals from "../globals";
import shishenTable from "../../data/shishen.json"

const initOptions = () => {
    var url = "json/shishen.json"
    var request = new XMLHttpRequest()
    var {sp_opts, ssr_opts, sr_opts, r_opts, n_opts} = globals;
    var json = shishenTable;
    // shishen_json = json
    sp_opts = '<optgroup label="SP">'
    ssr_opts = '<optgroup label="SSR">'
    sr_opts = '<optgroup label="SR">'
    r_opts = '<optgroup label="R">'
    n_opts = '<optgroup label="N">'
    for (var i in json) {
        if (Number(i) < 100) {
            continue
        }
        var p = json[i]
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

    globals.sp_opts = sp_opts;
    globals.ssr_opts = ssr_opts;
    globals.sr_opts = sr_opts;
    globals.r_opts = r_opts;
    globals.n_opts = n_opts;
    $('.selectpicker').selectpicker('refresh');
};

export default initOptions;
