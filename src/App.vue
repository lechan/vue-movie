<template>
  <div id="app">
    <div class="header">
      <m-search></m-search>
      <m-tab></m-tab>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import search from './components/search.vue';
import tab from './components/tab.vue';

export default {
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
