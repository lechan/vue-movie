<template>
  <div class="tab-bar">
    <el-tabs v-model="typeCode" @tab-click="handleTabClick">
      <el-tab-pane :label="item.type_name" :name="item.type_code" v-for="(item,index) in tabData" :key="item.id"></el-tab-pane>
    </el-tabs>
    <m-list :typeCode="typeCode" :index="currentIndex"></m-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getTabData} from '../utils/tool';
  import list from './list.vue';

  export default {
    data() {
      return {
        currentIndex : '0',
        typeCode: '10001',
        tabData : []
      };
    },
    methods: {
      handleTabClick(tab, event) {
        this.currentIndex = tab.index;
        this.typeCode = tab.name;
      }
    },
    created() {
      getTabData((data) => {
        this.tabData = data;
        this.typeCode = data[this.currentIndex].type_code;
      });
    },
    components: {
      'm-list' : list
    }
  };
</script>

<style lang="less">
  .tab-bar {
    width: 1200px;
    margin: 0 auto;
  }
</style>