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
              :on-icon-click="handleSearch" @keyup.enter.native.13="handleSearch">
            </el-input>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      searchInput: ''
    }
  },
  methods: {
    handleSearch: function(){
      this.$store.dispatch('changeInput',this.searchInput);
      this.$router.push({ path: '/list', query: this.keyWord === '' ? { typeCode: this.typeCode } : { typeCode: this.typeCode, keyWord: this.keyWord } });
    }
  },
  computed: {
    ...mapGetters({
      keyWord: 'getKeyWord',
      typeCode: 'getTypeCode'
    })
  },
  created() {
    this.$store.dispatch('changeInput',this.$route.query.keyWord || '');
  },
  watch: {
    keyWord() {
      this.searchInput = this.keyWord;
    },
    '$route'() {
      this.$store.dispatch('changeInput',this.$route.query.keyWord || '');
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