<template>
  <div class="tab-bar">
    <el-tabs v-model="currentTypeCode" @tab-click="handleTabClick">
      <el-tab-pane :label="item.type_name" :name="item.type_code" v-for="(item,index) in tabData" :key="item.id"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getTabData} from '../utils/tool';
  import list from './list.vue';

  export default {
    props: {
      keyword : {
        type : String,
        default : ''
      },
      typeCode: {
        type: String
      }
    },
    data() {
      return {
        currentIndex : '0',
        currentTypeCode : this.typeCode,
        tabData : []
      };
    },
    methods: {
      handleTabClick(tab, event) {
        this.currentIndex = tab.index;
        this.currentTypeCode = tab.name;
      }
    },
    created() {
      getTabData((data) => {
        this.tabData = data;
      });
    },
    watch: {
      currentTypeCode() {
        this.$emit('searchInputHandle','');
        this.$emit('tabHandle',this.currentTypeCode);
        this.$router.push({ path: '/list', query: { typeCode: this.currentTypeCode }});
      }
    }
  };
</script>

<style lang="less">
  .tab-bar {
    width: 1200px;
    margin: 0 auto;
    .el-tabs {
      height: 60px;
    }
  }
</style>