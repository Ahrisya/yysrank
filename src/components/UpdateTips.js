import config from "@/config";
import moment from "moment";
import battleTable from "../../data/data.json";

export const updateTips = () => {
    if (this.$cookies.get('last_updated') !== config.update) {
        const handleOk = () => {
            this.$cookies.set('last_updated', config.update, moment().add(1000, 'days').toDate())
        }
        const h = this.$createElement;
        this.$info({
            width: '36%',
            maskClosable: true,
            title: 'Update',
            content: h('div', {}, [
                h('h3', config.update),
                h('ul', {}, [
                    h('li', '数据更新：更新了' + config.range + '式神排行榜及' + battleTable.data.length + '场斗技数据。')
                ]),
            ]),
            onOk: handleOk,
            onCancel: handleOk,
        });
    }
}
