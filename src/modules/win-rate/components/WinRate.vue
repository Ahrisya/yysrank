<template>
  <a-space direction="vertical">
    <a-card>
      <a-form :form="form" @submit="handleSearch">
        <a-row :gutter="[16,16]">
          <a-col :span="12">
            <a-card title="我方阵容" :bordered="false">
              <!-- ban 位 -->
              <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span:8 }" label="我方ban位">
                <HeroSelect v-decorator="[`this_ban`]" placeholder="请选择式神..."/>
              </a-form-item>
              <!-- 五个可选位置 -->
              <a-form-item v-for="i in 5" :key="i" :label="`我方${i}号位`" :label-col="{ span: 4 }"
                           :wrapper-col="{ span:8 }">
                <HeroSelect v-decorator="[`this_${i}`]" placeholder="请选择式神..."/>
              </a-form-item>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="对方阵容" :bordered="false">
              <!-- ban 位 -->
              <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span:8 }" label="敌方ban位">
                <HeroSelect v-decorator="[`that_ban`]" placeholder="请选择式神..."/>
              </a-form-item>
              <!-- 五个可选位置 -->
              <a-form-item v-for="i in 5" :key="i" :label="`敌方${i}号位`" :label-col="{ span: 4 }"
                           :wrapper-col="{ span:8 }">
                <HeroSelect v-decorator="[`that_${i}`]" placeholder="请选择式神..."/>
              </a-form-item>
            </a-card>
          </a-col>
        </a-row>
        <a-row :gutter="[16,16]">
          <a-col :span="24" :style="{  textAlign: 'center' }">
            <a-button html-type="submit" type="primary">
              搜索对战
            </a-button>
            <!--          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">-->
            <!--            Reset-->
            <!--          </a-button>-->
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card style="margin-top: 32px" title="历史数据">
      <a-table :data-source="histories">
        <a-table-column title="#" width="32px">
          <template slot-scope="{index}">
            {{ index }}
          </template>
        </a-table-column>
        <a-table-column title="Ban" width="120px">
          <template v-slot="{banList}">
            <HeroIcon v-for="(team,index) in banList" :id="team" :key="index"
                      style="margin: 4px"/>
          </template>
        </a-table-column>
        <a-table-column title="我方阵容" width="240px">
          <template v-slot="{thisTeamList}">
            <HeroIcon v-for="(team,index) in thisTeamList" :id="team" :key="index"
                      style="margin: 4px"/>
          </template>
        </a-table-column>
        <a-table-column title="对方阵容" width="240px">
          <template v-slot="{thatTeamList}">
            <HeroIcon v-for="(team,index) in thatTeamList" :id="team" :key="index"
                      style="margin: 4px"/>
          </template>
        </a-table-column>
        <a-table-column dataIndex="w" title="获胜场次" width="64px">
        </a-table-column>
        <a-table-column dataIndex="s" title="总场次" width="64px">
        </a-table-column>
        <a-table-column title="胜率" width="64px">
          <template v-slot="{w,s}">
            {{ (100 * w / s).toFixed(2) }} %
          </template>
        </a-table-column>
        <a-table-column title="更多" width="24px">
          <template slot-scope="record">
            <a-button type="link" @click="() => showHistory(record.key)">
              <a-icon type="small-dash"/>
            </a-button>
          </template>
        </a-table-column>
      </a-table>
    </a-card>
    <a-modal
        :visible="visible"
        title="查询结果"
        width="80%"
        @cancel="handleCancel"
        @ok="handleOk"
    >
      <a-table :data-source="data">
        <a-table-column title="我方阵容">
          <template v-slot="{thisTeam}">
            <HeroIcon v-for="(team,index) in thisTeam" :id="team" :key="index"
                      style="margin: 4px"/>
          </template>
        </a-table-column>
        <a-table-column title="对方阵容">
          <template v-slot="{thatTeam}">
            <HeroIcon v-for="(team,index) in thatTeam" :id="team" :key="index"
                      style="margin: 4px"/>
          </template>
        </a-table-column>
        <a-table-column :sorter="(a,b) => a.w - b.w" dataIndex="w" title="胜场">
        </a-table-column>
        <a-table-column :sorter="(a,b) => a.s - b.s" dataIndex="s" title="总场次">
        </a-table-column>
        <a-table-column :sorter="(a,b) => a.w/a.s - b.w/b.s" title="胜率">
          <template v-slot="{w,s}">
            {{ (100 * w / s).toFixed(2) }} %
          </template>
        </a-table-column>
      </a-table>
    </a-modal>
  </a-space>
</template>

<script>
import HeroSelect from "@/components/HeroSelect";
import * as _ from "underscore";
import isContained from "@/utils/arrays";
import HeroIcon from "@/components/HeroIcon";
import getReports from "../battles";

export default {
  name: "WinRate",
  components: {HeroIcon, HeroSelect},
  props: ['title'],
  data() {
    return {
      form: this.$form.createForm(this, {name: 'advanced_search'}),
      visible: false,
      data: [],
      histories: [],
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
    handleReset() {
      this.form.resetFields();
    },
    handleSearch(e) {
      e.preventDefault();
      // eslint-disable-next-line @typescript-eslint/camelcase
      const {this_ban, this_1, this_2, this_3, this_4, this_5, that_ban, that_1, that_2, that_3, that_4, that_5} = this.form.getFieldsValue();
      // eslint-disable-next-line @typescript-eslint/camelcase
      const banList = _.without([this_ban, that_ban], undefined)
      // eslint-disable-next-line @typescript-eslint/camelcase
      const thisTeamList = _.without([this_1, this_2, this_3, this_4, this_5], undefined)
      // eslint-disable-next-line @typescript-eslint/camelcase
      const thatTeamList = _.without([that_1, that_2, that_3, that_4, that_5], undefined)

      // 己方阵容不能为空
      if (_.isEmpty(thisTeamList)) {
        this.$notification['error']({
          message: '己方阵容不能为空',
        });
        return;
      }
      // Ban位冲突
      if (
          !_.isEmpty(banList) &&
          (
              isContained(banList, thisTeamList) ||
              isContained(banList, thatTeamList)
          )
      ) {
        this.$notification['error']({
          message: 'Ban位冲突',
        });
        return;
      }
      const reports = getReports(banList, thisTeamList, thatTeamList); // 核心逻辑
      this.data = reports;
      if (_.isEmpty(reports)) {
        this.$notification['error']({
          message: '数据为空',
        });
        return;
      }
      const report = reports.map(report => {
        const {w, s} = report;
        return {w, s};
      }).reduce((prev, next) => {
        prev.w += next.w;
        prev.s += next.s;
        return prev;
      });

      const historyKey = [banList.join('_'), thisTeamList.join('_'), thatTeamList.join('_')].join('|');

      if (this.histories.find(history => history.key === historyKey) === undefined) {
        this.histories.push(
            {
              key: historyKey,
              banList,
              thisTeamList,
              thatTeamList,
              w: report.w,
              s: report.s,
              data: reports,
            }
        )
        this.histories = this.histories.map((history, index) => ({...history, index: index + 1}))
      }
      this.showModal();
    },

    showHistory(key) {
      const history = this.histories.find(history => history.key === key);
      this.data = history.data;
      this.showModal();
    },

  },
}
</script>

<style scoped>
.ant-space {
  display: block;
}
</style>
