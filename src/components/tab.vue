<template>
  <div class="tab-bar">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane :label="item.type_name" :name="item.type_code" v-for="(item,index) in tabData" :key="item.id">
        <v-list :type-code="item.type_code" v-if="index === 0"></v-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getTabData} from '../utils/tool';
  import list from './list.vue';

  export default {
    data() {
      return {
        activeName: '',
        tabData : []
      };
    },
    methods: {
      handleTabClick(tab, event) {
        console.log(tab, event);
      }
    },
    created() {
      getTabData((data) => {
        this.tabData = data;
        this.activeName = data[0].type_code;
      });
    },
    components: {
      'v-list' : list
    }
  };
</script>

<style lang="less">
  .tab-bar {
    width: 1200px;
    margin: 0 auto;
  }
</style>