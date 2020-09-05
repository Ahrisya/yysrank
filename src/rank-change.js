import up from "./images/icon-championtier-up.png"
import stay from "./images/icon-championtier-stay.png"
import down from "./images/icon-championtier-down.png"
import * as _ from "underscore"

const getRankChange = value => {

    let settings = {value};
    if (value === 'new') {
        settings = {...settings, src: null, color: 'blue'};
    } else if (value > 0) {
        settings = {...settings, src: up, color: 'green'};
    } else if (value < 0) {
        settings = {...settings, src: down, color: 'red', value: String(-settings.value)};
    } else {
        settings = {...settings, src: stay, color: 'gray'}
    }

    const template = _.template(`
    <% if(src){ %>
        <img src="{{src}}" alt="">
    <% } %>
    <span style="color:{{ color }};">{{ value }}</span>
`, {interpolate: /\{\{(.+?)\}\}/g});
    return template(settings);
};

export default getRankChange;
