<template>
  <div class="movie-list-container" v-loading.body="loading">
    <ul class="movie-list" v-show="!noData" v-masonry transition-duration="0.2s" item-selector=".movie-item" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
      <li v-for="item in (keyword === '' ? movieData[typeCode] : searchMovieData)" :key="item.id" v-masonry-tile class="movie-item">
        <router-link :to="{ path: 'detail', query: { id: item.id }}">
          <el-card :body-style="{ padding: '5px' }">
            <div class="img-wrap"><img :src="item.film_imgs[0]"></div>
            <div class="img-desc">
              <h3>{{item.film_name}}</h3>
              <p>{{ item.publish_time|formatMovieDate }}</p>
            </div>
          </el-card>
        </router-link>
      </li>
    </ul>
    <div class="noData" v-show="noData">
      <span><i class="el-icon-information"></i>未搜索到该电影</span>
    </div>
    <div class="more" v-loading.body="moreLoading" v-show="moreLoading" v-if="!isEnd"></div>
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
      }
    },
    data() {
      return {
        movieData : {},
        p:{},
        searchMovieData : [],
        searchPageNumber:1,
        pageSize:20,
        loading: false,
        moreLoading: false,
        isEnd: false,
        noData : false
      };
    },
    methods: {
      renderList(p) {
        if(p === 1){
          this.loading = true;
        }
        if(this.keyword === ''){
          getListData("FilmDetail",p,this.pageSize,this.typeCode,(data) => {
            const arr = this.movieData[this.typeCode] ? this.movieData[this.typeCode] : [];
            this.movieData[this.typeCode] = [...arr, ...data];
            this.p[this.typeCode]++;
            this.loading = false;
            this.moreLoading = false;
            this.noData = this.movieData.length === 0 ? true : false;
          });
        }else{
          searchListData("FilmDetail",this.keyword,p,this.pageSize,this.typeCode,(data) => {
            this.searchMovieData = [...this.searchMovieData, ...data];
            this.searchPageNumber++;
            this.loading = false;
            this.noData = this.searchMovieData.length === 0 ? true : false;
            if(data.length === this.pageSize){
              this.moreLoading = false;
            }else{
              if(p>1){
                this.$message.warning('已经是最后一页');
                this.isEnd = true;
              }
            }
          });
        }
      },
      loadMore() {
        if(!this.$route.query.id && !this.moreLoading && (this.p[this.typeCode] > 1 || this.searchPageNumber > 1)){
          this.moreLoading = true;
          this.renderList(this.keyword === ''?this.p[this.typeCode]:this.searchPageNumber);
        }
      }
    },
    computed: {
      newKeyWord() {
        return this.keyword;
      }
    },
    filters: {
      formatMovieDate(date){
        return date ? formatDate(date.getTime(),'yyyy-MM-dd'):'';
      }
    },
    created() {
      this.loading = true;
      this.p[this.typeCode] = 1;
      this.renderList(this.p[this.typeCode]);
    },
    watch: {
      typeCode() {
        this.isEnd = false;
        if(this.keyword !==''){
          this.newKeyWord = '';
        }
        if(!this.p[this.typeCode]){
          this.p[this.typeCode] = 1;
          this.loading = true;
          this.renderList(this.p[this.typeCode]);
        }else{
          this.loading = false;
        }
      },
      newKeyWord() {
        this.searchMovieData.length = 0;
        this.searchPageNumber = 1;
        this.isEnd = false;
        this.renderList(this.searchPageNumber);
        this.$emit('searchInputHandle',this.newKeyWord);
      }
    }
  };
</script>

<style lang="less">
  .movie-list-container{
    width: 1200px;
    margin: 130px auto 0px;
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
        a {
          text-decoration: none;
        }
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

    .noData {
      text-align: center;
      padding-top: 100px;
      font-size: 15px;
      color: #20A0FF;
      i {
        margin-right: 5px;
      }
    }
  }
</style>