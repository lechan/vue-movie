<template>
  <div class="detail-container" v-loading.body="detailLoading">
    <h1>{{detailData.film_name}}</h1>
    <h2>发布时间：{{detailData.publish_time | formatMovieDate}}</h2>
    <div class="img-wrap">
      <img v-for="(item,index) in detailData.film_imgs" :src="item" :key="index" />
    </div>
    <div class="content" v-html="formatContent"></div>
    <div class="download-content">
      <el-button class="download-btn" type="primary" icon="upload2" v-for="(item,index) in detailData.download_url" :key="index" :data-clipboard-text="item">下载第{{index+1}}集</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getDetailData,formatDate} from '../utils/tool';
import Clipboard from 'clipboard';

export default {
  props:{
    typeCode: {
      type: String
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      detailData: {},
      detailLoading: false
    };
  },
  methods: {
    renderDetail(id) {
      getDetailData("FilmDetail",id,(data) => {
        this.detailData = data;
        this.detailLoading = false;
        const self = this;
        const clipboard = new Clipboard('.download-btn');
        clipboard.on('success', function(e) {
          self.$message.success('复制下载地址成功，打开迅雷下载');
        });
      });
    }
  },
  computed: {
    formatContent() {
      return this.detailData.film_des && this.detailData.film_des.replace(/\n/gi,'<br>');
    }
  },
  filters: {
    formatMovieDate(date){
      return date ? formatDate(date.getTime(),'yyyy-MM-dd hh:mm:ss'):'';
    }
  },
  created() {
    this.detailLoading = true;
    this.renderDetail(this.$route.query.id);
  },
  watch: {
    '$route'() {
      const movieId = this.$route.query.id;
      this.detailData = {};
      if(movieId){
        this.detailLoading = true;
        this.renderDetail(movieId);
      }else{
        this.detailLoading = false;
      }
    }
  }
}
</script>

<style lang="less">
.detail-container {
  width: 80%;
  margin: 130px auto 20px;
  min-height: 400px;
  h1 {
    line-height: 40px;
    font-size: 24px;
    color: #1f2d3d;
    font-weight: normal;
  }
  h2 {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 30px;
  }
  .img-wrap {
    img {
      display: block;
      max-width: 600px;
      margin-bottom: 20px;
    }
  }
  .content {
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 20px;
  }
  .download-content button {
    margin: 0px 10px 10px 0px;
  }
}
</style>