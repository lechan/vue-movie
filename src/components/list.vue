<template>
  <ul class="movie-list" v-loading.body="loading">
    <li v-for="item in movieData" :key="item.id" @click="showDetail(item.id)">
      <el-card :body-style="{ padding: '5px' }">
        <div class="img-wrap"><img :src="item.film_imgs[0]"></div>
        <div class="img-desc">
          <h3>{{item.film_name}}</h3>
          <p>{{ item.publish_time|formatMovieDate }}</p>
        </div>
      </el-card>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  import {getListData,searchListData,formatDate} from '../utils/tool';

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
        movieData : [],
        p:1,
        pageSize:20,
        loading: false,
        btnLoading: false
      };
    },
    methods: {
      showDetail(id) {
        console.log(id);
      }
    },
    filters: {
      formatMovieDate(date){
        return formatDate(date.getTime(),'yyyy-MM-dd');
      }
    },
    created() {
      this.loading = true;
      getListData("FilmDetail",this.p,this.pageSize,this.typeCode,(data) => {
        this.movieData = data;
        this.loading = false;
      });
    }
  };
</script>

<style lang="less">
  .movie-list {
    width: 100%;
    min-height: 400px;
    padding: 0;
    overflow: hidden;
    font-size: 0;
    text-align: center;
    li {
      display: inline-block;
      width: 18%;
      margin: 10px;
      list-style: none;
      cursor: pointer;
      .el-card {
        box-shadow: none;
        transition: all .2s linear;
        &:hover {
          box-shadow: 0 2px 8px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        }
      }
      .img-wrap {
        width: 100%;
        height: 300px;
        overflow: hidden;
        img {
          width: 100%;
          display: block;
        }
      }
      .img-desc {
        text-align: left;
        h3 {
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;
          color: #111;
          height: 40px;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin: 10px 10px 5px;
        }
        p {
          margin: 0 10px;
          font-size: 12px;
          color: #bbb;
          line-height: 20px;
        }
      }
    }
  }
</style>