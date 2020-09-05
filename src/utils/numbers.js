const sortNum = (a, b) => a - b;

function toPercent(x) {
    var str = Number(x * 100).toFixed(2);
    str += "%";
    return str;
}


export {sortNum, toPercent}
