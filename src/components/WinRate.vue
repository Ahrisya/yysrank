<template>
  <div>
    <!--    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">-->
    <!--      <a-form-item label="Note">-->
    <!--        <a-input-->
    <!--            v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"-->
    <!--        />-->
    <!--      </a-form-item>-->
    <!--      <a-form-item label="Gender">-->
    <!--        <a-select-->
    <!--            v-decorator="[-->
    <!--          'gender',-->
    <!--          { rules: [{ required: true, message: 'Please select your gender!' }] },-->
    <!--        ]"-->
    <!--            placeholder="Select a option and change input text above"-->
    <!--            @change="handleSelectChange"-->
    <!--        >-->
    <!--          <a-select-option value="male">-->
    <!--            male-->
    <!--          </a-select-option>-->
    <!--          <a-select-option value="female">-->
    <!--            female-->
    <!--          </a-select-option>-->
    <!--        </a-select>-->
    <!--      </a-form-item>-->
    <!--      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">-->
    <!--        <a-button type="primary" html-type="submit">-->
    <!--          Submit-->
    <!--        </a-button>-->
    <!--      </a-form-item>-->
    <!--    </a-form>-->
    <div id="components-form-demo-advanced-search">
      <a-form :form="form" layout="horizontal" @submit="handleSearch">
        <!-- ban 位 -->
        <a-row>
          <a-col :span="12">
            <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span:8 }" label="我方ban位">
              <HeroSelect v-decorator="[`this-ban`]" placeholder="place_holder"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span:8 }" label="敌方ban位">
              <HeroSelect v-decorator="[`that-ban`]" placeholder="place_holder"/>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- 五个可选位置 -->
        <a-row v-for="i in 5" :key="i">
          <a-col :span="12">
            <a-form-item :label="`我方${i}号位`" :label-col="{ span: 4 }" :wrapper-col="{ span:8 }">
              <HeroSelect v-decorator="[`this-${i}`]" placeholder="place_holder"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label="`敌方${i}号位`" :label-col="{ span: 4 }" :wrapper-col="{ span:8 }">
              <HeroSelect v-decorator="[`that-${i}`]" placeholder="place_holder"/>
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
      <div class="search-result-list">
        Search Result List
      </div>
    </div>

  </div>
</template>

<script>
import HeroSelect from "@/components/HeroSelect";

export default {
  name: "WinRate",
  components: {HeroSelect},
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
      const values = this.form.getFieldsValue();
      console.log(values);
      this.form.validateFields((error, values) => {
        console.log('error', error);
        console.log('Received values of form: ', values);
      });
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
