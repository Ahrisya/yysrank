import shishenTable from "../data/shishen.json";

const getTeamIcons = t => {
    let team_icons = "";
    for (let i in t) {
        let key = t[i];
        let icon = shishenTable[key]["icon"];
        let name = shishenTable[key]["name"];
        team_icons += "<img src=\"" + icon + "\"  alt=" + name + " width=\"40\" height=\"40\"> &nbsp;"
    }
    return team_icons
};

export default getTeamIcons;
