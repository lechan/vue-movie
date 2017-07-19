<template>
  <div class="movie-list-container">
    <ul class="movie-list" v-loading.body="loading" v-masonry transition-duration="0.3s" item-selector=".movie-item" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <li v-for="item in movieData[typeCode]" :key="item.id" @click="showDetail(item.id)" v-masonry-tile class="movie-item">
        <el-card :body-style="{ padding: '5px' }">
          <div class="img-wrap"><img :src="item.film_imgs[0]"></div>
          <div class="img-desc">
            <h3>{{item.film_name}}</h3>
            <p>{{ item.publish_time|formatMovieDate }}</p>
          </div>
        </el-card>
      </li>
    </ul>
    <div class="more" v-loading.body="moreLoading" v-if="moreLoading"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getListData,searchListData,formatDate} from '../utils/tool';
  import Vue from 'vue';
  import VueMasonryPlugin from 'vue-masonry';
  import InfiniteScroll from 'vue-infinite-scroll';

  Vue.use(VueMasonryPlugin);
  Vue.use(InfiniteScroll);

  export default {
    props:{
      typeCode: {
        type: String
      },
      keyword: {
        type: String,
        default: ''
      },
      index: {
        type: String
      }
    },
    data() {
      return {
        movieData : {},
        p:[],
        pageSize:20,
        loading: false,
        moreLoading: false
      };
    },
    methods: {
      showDetail(id) {
        console.log(id);
      },
      renderList(p) {
        getListData("FilmDetail",p,this.pageSize,this.typeCode,(data) => {
          const arr = this.movieData[this.typeCode] ? this.movieData[this.typeCode] : [];
          this.movieData[this.typeCode] = [...arr, ...data];
          if(p === 1){
            this.loading = false;
          }else{
            this.moreLoading = false;
          }
        });
      },
      loadMore() {
        if(!this.moreLoading){
          this.moreLoading = true;
          this.p[this.index]++;
          this.renderList(this.p[this.index]);
        }
      }
    },
    filters: {
      formatMovieDate(date){
        return date ? formatDate(date.getTime(),'yyyy-MM-dd'):'';
      }
    },
    created() {
      this.loading = true;
      this.p[this.index] = 1;
      this.renderList(this.p[this.index]);
    },
    watch: {
      typeCode(){
        if(!this.p[this.index]){
          this.p[this.index] = 1;
          this.loading = true;
          this.renderList(this.p[this.index]);
        }
      }
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

  .more {
    height: 40px;
    padding: 10px 0px;
  }
</style>