<template>
  <div id="app">
    <m-search></m-search>
    <m-tab></m-tab>
  </div>
</template>

<script type="text/ecmascript-6">
import search from './components/search.vue';
import tab from './components/tab.vue';

export default {
  data () {
    return {
      movieType: '',
      keyword: ''
    }
  },

  methods: {
    
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
}
</style>
