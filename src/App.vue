<template>
  <div id="app">
    <div class="header">
      <m-search :keyword="keyword" @searchInputHandle="getKeyword"></m-search>
      <m-tab :typeCode="typeCode" @searchInputHandle="getKeyword" @tabHandle="changeTypeCode"></m-tab>
    </div>
    <keep-alive>
      <router-view :typeCode="typeCode" :keyword="keyword"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import search from './components/search.vue';
import tab from './components/tab.vue';

export default {
  data () {
    return {
      typeCode: this.$route.query.typeCode||'10001',
      keyword: ''
    }
  },

  methods: {
    getKeyword (keyword) {
      this.keyword = keyword;
    },
    changeTypeCode(typeCode){
      this.typeCode = typeCode;
    }
  },
  components: {
    'm-search': search,
    'm-tab': tab
  }
}
</script>

<style lang="less">
body {
  font-family: Helvetica, sans-serif;
  margin: 0;
}
#app{
  overflow: hidden;
  .header{
    position: fixed;
    top: 0px;
    z-index: 1;
    width: 100%;
    background: #fff;
  }
}
</style>
