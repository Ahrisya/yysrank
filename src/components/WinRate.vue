<template>
  <div id="components-form-demo-advanced-search">
    <a-form :form="form" layout="horizontal" @submit="handleSearch">
      <!-- ban 位 -->
      <a-row>
        <a-col :span="12">
          <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span:8 }" label="我方ban位">
            <HeroSelect v-decorator="[`this_ban`]" placeholder="请选择式神..."/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span:8 }" label="敌方ban位">
            <HeroSelect v-decorator="[`that_ban`]" placeholder="请选择式神..."/>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- 五个可选位置 -->
      <a-row v-for="i in 5" :key="i">
        <a-col :span="12">
          <a-form-item :label="`我方${i}号位`" :label-col="{ span: 4 }" :wrapper-col="{ span:8 }">
            <HeroSelect v-decorator="[`this_${i}`]" placeholder="请选择式神..."/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label="`敌方${i}号位`" :label-col="{ span: 4 }" :wrapper-col="{ span:8 }">
            <HeroSelect v-decorator="[`that_${i}`]" placeholder="请选择式神..."/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'center' }">
          <a-button html-type="submit" type="primary">
            Search
          </a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-modal
        width="80%"
        title="查询结果"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
    >
      <a-table :data-source="data">
        <a-table-column title="我方阵容">
          <template v-slot="{thisTeam}">
            <HeroIcon :id="Number.parseInt(team)" v-for="(team,index) in thisTeam" :key="index"
                      style="margin: 4px"/>
          </template>
        </a-table-column>
        <a-table-column title="对方阵容">
          <template v-slot="{thatTeam}">
            <HeroIcon :id="Number.parseInt(team)" v-for="(team,index) in thatTeam" :key="index"
                      style="margin: 4px"/>
          </template>
        </a-table-column>
        <a-table-column title="胜场" colSpan="1" dataIndex="w" :sorter="(a,b) => a.w - b.w">
        </a-table-column>
        <a-table-column title="总场次" colSpan="1" dataIndex="s" :sorter="(a,b) => a.s - b.s">
        </a-table-column>
        <a-table-column title="胜率" colSpan="1">
          <template v-slot="{w,s}">
            {{ (100 * w / s).toFixed(2) }} %
          </template>
        </a-table-column>
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle"><a-icon type="smile-o"/> Name</span>
        <span slot="tags" slot-scope="tags">
      <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
      >
        {{ tag.toUpperCase() }}
      </a-tag>
    </span>
        <span slot="action" slot-scope="text, record">
      <a>Invite 一 {{ record.name }}</a>
      <a-divider type="vertical"/>
      <a>Delete</a>
      <a-divider type="vertical"/>
      <a class="ant-dropdown-link"> More actions <a-icon type="down"/> </a>
    </span>
      </a-table>

    </a-modal>

    <a-card title="历史数据" style="margin-top: 32px">
      <a-table>

      </a-table>
    </a-card>
  </div>
</template>

<script>
import HeroSelect from "@/components/HeroSelect";
import battleTable from "@/../../data/data.json"
import * as _ from "underscore";
import isContained from "@/utils/arrays";
import HeroIcon from "@/components/HeroIcon";

export default {
  name: "WinRate",
  components: {HeroIcon, HeroSelect},
  props: ['title'],
  // data() {
  //   return {
  //     formLayout: 'horizontal',
  //     form: this.$form.createForm(this, {name: 'coordinated'}),
  //   };
  // },
  // methods: {
  //   handleSubmit(e) {
  //     e.preventDefault();
  //     this.form.validateFields((err, values) => {
  //       if (!err) {
  //         console.log('Received values of form: ', values);
  //       }
  //     });
  //   },
  //   handleSelectChange(value) {
  //     console.log(value);
  //     this.form.setFieldsValue({
  //       note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
  //     });
  //   },
  // },
  data() {
    return {
      expand: false,
      form: this.$form.createForm(this, {name: 'advanced_search'}),
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      data: {},
    };
  },
  computed: {
    count() {
      return this.expand ? 11 : 7;
    },
  },
  updated() {
    console.log('updated');
  },
  methods: {
    handleSearch(e) {
      e.preventDefault();
      console.log("!!");
      this.handleSearch1(e);
      this.showModal();
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      console.log('Clicked cancel button');
      this.visible = false;
    },


    handleSearch1(e) {
      e.preventDefault();
      // eslint-disable-next-line @typescript-eslint/camelcase
      const {this_ban, this_1, this_2, this_3, this_4, this_5, that_ban, that_1, that_2, that_3, that_4, that_5} = this.form.getFieldsValue();
      // eslint-disable-next-line @typescript-eslint/camelcase
      const banList = _.without([this_ban, that_ban], undefined)
      console.log("list");
      console.log(banList);
      // eslint-disable-next-line @typescript-eslint/camelcase
      const thisTeamList = _.without([this_1, this_2, this_3, this_4, this_5], undefined)
      console.log("thisTeamList");
      console.log(thisTeamList);
      // eslint-disable-next-line @typescript-eslint/camelcase
      const thatTeamList = _.without([that_1, that_2, that_3, that_4, that_5], undefined)
      console.log("thatTeamList");
      console.log(thatTeamList);

      if (_.isEmpty(thisTeamList)) {
        console.log("己方阵容不能为空");
        this.$notification['error']({
          message: '己方阵容不能为空',
          description:
              'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
      }
      if (!_.isEmpty(banList) &&
          !_.isEmpty(_.intersection(banList, _.union(thisTeamList, thatTeamList)))
      ) {
        console.log("Ban位冲突");
        this.$notification['error']({
          message: 'Ban位冲突',
          description:
              'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
      }

      // let reports = {};
      const results = battleTable.data
          .filter(battle => _.isEmpty(banList) || !(isContained(banList, battle.w) || isContained(banList, battle.l))) // 首先排除ban选的式神
          .filter(battle => !_.isEqual(battle.w, battle.l)) // 排除胜负双方阵容一致的
          .filter(battle => _.isEmpty(thisTeamList) || isContained(thisTeamList, battle.w) || isContained(thisTeamList, battle.l)) // 只看自己场的式神
          .filter(battle => _.isEmpty(thatTeamList) || isContained(thatTeamList, battle.w) || isContained(thatTeamList, battle.l)) // 只看对方场的式神
          .map(battle => {
            const reports = {}
            if (isContained(thisTeamList, battle.w) && isContained(thatTeamList, battle.l) && (isContained(thisTeamList, thatTeamList) || !isContained(thisTeamList, battle.l))) {
              const key = [battle.w.sort(), battle.l.sort()].flat().join('_')
              reports[key] = { // 计算胜场
                s: 1,
                w: 1,
                l: 0,
              }
            }
            if (isContained(thisTeamList, battle.l) && isContained(thatTeamList, battle.w) && (isContained(thisTeamList, thatTeamList) || !isContained(thisTeamList, battle.w))) {
              const key = [battle.l.sort(), battle.w.sort()].flat().join('_')
              reports[key] = { // 计算负场
                s: 1,
                w: 0,
                l: 1,
              }
            }
            return reports
          }).reduce((prev, next) => {
            for (const key of Object.keys(next)) {
              if (/^\d{2,3}(_\d{2,3}){9}$/.test(key)) {
                const value = prev[key] || {s: 0, w: 0, l: 0};
                value.key = key;
                const teams = _.chunk(key.split('_'), 5);
                value.thisTeam = _.first(teams);
                value.thatTeam = _.last(teams);
                value.s = value.s + next[key].s;
                value.w = value.w + next[key].w;
                value.l = value.l + next[key].l;
                prev[key] = value;
              }
            }
            return prev;
          })
      // console.log(reports);
      this.data = Object.values(results);
      // console.log(Object.values(results));
    },

    handleReset() {
      this.form.resetFields();
    },

    toggle() {
      this.expand = !this.expand;
    },
  },
}
</script>

<style scoped>

</style>
