<template>
  <div class="search-bar">
    <el-row>
      <el-col :span="4">
        <div class="grid-content">
          <div class="search-label">
            <label>搜索电影：</label>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <div class="search-input">
            <el-input
              placeholder="请输入电影名称"
              icon="search"
              v-model="searchInput"
              :on-icon-click="handleSearchBtn" @keyup.enter.native.13="handleKeyEnter">
            </el-input>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchInput: ''
    }
  },
  methods: {
    handleSearchBtn: function(ev){
      this.$emit('searchInputHandle',this.searchInput);
    },
    handleKeyEnter: function(ev){
      this.$emit('searchInputHandle',this.searchInput);
    }
  },
  watch: {
    keyword() {
      this.searchInput = this.keyword;
    }
  }
}
</script>

<style lang="less">
  .search-bar {
    width: 1200px;
    margin: 20px auto 10px;

    .search-label{
      line-height: 35px;
      label{
        float: right;
        margin-right: 10px;
        font-size:14px;
        color:#1f2d3d;
      }
    }

    .search-input{
      width: 500px;
    }
  }
</style>