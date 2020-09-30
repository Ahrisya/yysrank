import _HeroTable from "../../data/shishen.json"
import _HeroRankTable from "../../data/shishen_rank.json"
import _HeroBattleTable from "../../data/data.json"
import {db} from "./dexie"

export const HeroTable = () => _HeroTable;
export const HeroRankTable = () => _HeroRankTable;
export const HeroBattleTable = () => _HeroBattleTable;
export default {
    db,
};
