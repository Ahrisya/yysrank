import _HeroTable from "../../data/shishen.json"
import _HeroRankTable from "../../data/shishen_rank.json"
import _HeroBattleTable from "../../data/data.json"

const h = () => {
    console.log(this);
};

export const HeroTable = () => _HeroTable;
export const HeroRankTable = () => _HeroRankTable;
export const HeroBattleTable = () => _HeroBattleTable;
export default h;
