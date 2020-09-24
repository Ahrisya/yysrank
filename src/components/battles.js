import isContained from "@/utils/arrays";
import battleTable from "../../data/data.json";
import * as _ from "underscore";

export const beautifyOutput = (list, input) =>
    _.sortBy(list, index =>
        input.indexOf(Number.parseInt(index)) >= 0 ? input.indexOf(Number.parseInt(index)) : Number.parseInt(index)
    )

const reports = (banList, thisTeamList, thatTeamList) => {
    let results = battleTable.data
        .filter(battle => _.isEmpty(banList) || !(isContained(banList, battle.w) || isContained(banList, battle.l))) // 首先排除ban选的式神
        .filter(battle => !_.isEqual(battle.w, battle.l)) // 排除胜负双方阵容一致的
        .filter(battle => _.isEmpty(thisTeamList) || isContained(thisTeamList, battle.w) || isContained(thisTeamList, battle.l)) // 只看自己场的式神
        .filter(battle => _.isEmpty(thatTeamList) || isContained(thatTeamList, battle.w) || isContained(thatTeamList, battle.l)) // 只看对方场的式神
        .map(battle => {
            const reports = {}
            if (
                isContained(thisTeamList, battle.w) &&
                isContained(thatTeamList, battle.l) &&
                (
                    isContained(thisTeamList, thatTeamList) ||
                    !isContained(thisTeamList, battle.l)
                )
            ) {
                const key = [battle.w.sort(), battle.l.sort()].flat().join('_')
                reports[key] = { // 计算胜场
                    key,
                    thisTeam: beautifyOutput(battle.w, thisTeamList),
                    thatTeam: beautifyOutput(battle.l, thatTeamList),
                    s: 1,
                    w: 1,
                    l: 0,
                }
            }
            if (
                isContained(thisTeamList, battle.l) &&
                isContained(thatTeamList, battle.w) &&
                (
                    isContained(thisTeamList, thatTeamList) ||
                    !isContained(thisTeamList, battle.w)
                )
            ) {
                const key = [battle.l.sort(), battle.w.sort()].flat().join('_')
                reports[key] = { // 计算负场
                    key,
                    thisTeam: beautifyOutput(battle.l, thisTeamList),
                    thatTeam: beautifyOutput(battle.w, thatTeamList),
                    s: 1,
                    w: 0,
                    l: 1,
                }
            }
            return reports
        });

    if (!_.isEmpty(results)) {
        results = results.reduce((prev, next) => {
            for (const key of Object.keys(next)) {
                if (/^\d{2,3}(_\d{2,3}){9}$/.test(key)) {
                    const value = prev[key] || {...next[key], s: 0, w: 0, l: 0};
                    value.s = value.s + next[key].s;
                    value.w = value.w + next[key].w;
                    value.l = value.l + next[key].l;
                    prev[key] = value;
                }
            }
            return prev;
        })
    }
    return Object.values(results);
};

export default reports;
