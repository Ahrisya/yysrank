import py from "pinyin"

const pinyin = input => py(input, {style: 0}).flat().join('');

export default pinyin;
