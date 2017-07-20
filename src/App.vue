<template>
  <div id="app">
    <m-search :keyword="keyword" @searchInputHandle="getKeyword"></m-search>
    <m-tab :typeCode="typeCode" @searchInputHandle="getKeyword" @tabHandle="changeTypeCode"></m-tab>
    <m-list :typeCode="typeCode" :keyword="keyword"></m-list>
  </div>
</template>

<script type="text/ecmascript-6">
import search from './components/search.vue';
import tab from './components/tab.vue';
import list from './components/list.vue';

export default {
  data () {
    return {
      typeCode: '10001',
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
    'm-tab': tab,
    'm-list': list
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
}
</style>
