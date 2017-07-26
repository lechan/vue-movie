<template>
  <div class="tab-bar">
    <el-tabs v-model="typeCode" @tab-click="handleTabClick">
      <el-tab-pane :label="item.type_name" :name="item.type_code" v-for="(item,index) in tabData" :key="item.id"></el-tab-pane>
    </el-tabs>
  </div>
</template>

 <script type="text/ecmascript-6">
  import { getTabData } from '../utils/tool';
  import list from './list.vue';
  import { mapGetters } from 'vuex';

  export default {
    props: {
      keyword : {
        type : String,
        default : ''
      }
    },
    data() {
      return {
        currentIndex : '0',
        tabData : []
      };
    },
    methods: {
      handleTabClick(tab, event) {
        this.currentIndex = tab.index;
        this.$store.dispatch('changeTab',tab.name);
        this.$router.push({ path: '/list', query: { typeCode: this.typeCode }});
      }
    },
    computed: mapGetters({
      typeCode: 'getTypeCode'
    }),
    created() {
      getTabData((data) => {
        this.tabData = data;
        this.$store.dispatch('changeTab',data[0].type_code);
      });
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