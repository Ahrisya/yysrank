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
      <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
        <a-row :gutter="24">
          <a-col
              v-for="i in 10"
              :key="i"
              :span="8"
              :style="{ display: i < count ? 'block' : 'none' }"
          >
            <a-form-item :label="`Field ${i}`">
              <a-input
                  v-decorator="[
                `field-${i}`,
                {
                  rules: [
                    {
                      required: true,
                      message: 'Input something!',
                    },
                  ],
                },
              ]"
                  placeholder="placeholder"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit">
              Search
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
              Clear
            </a-button>
            <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
              Collapse
              <a-icon :type="expand ? 'up' : 'down'"/>
            </a>
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
export default {
  name: "WinRate",
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
