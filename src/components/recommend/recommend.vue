<template>
  <div class="recommend">
    <!-- scroll组件让列表滚动 -->
      <scroll ref="scroll" class="recommend-content" :data="songList">
        <!-- 加v-if是为了使recommends get到后才使slot有内容后，slider组件里的mounted才执行才能正确渲染 -->
          <div>
          <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
            <slider>
              <div v-for="item in recommends">
                  <a :href="item.linkUrl"></a>
                  <!-- needsclick解决fastclick的点击冲突问题 -->
                  <img class="needsclick" @load="loadImage" :src="item.picUrl"> 
              </div>
            </slider>
          </div>
          <div class="recommend-list">
              <h1 class="list-title">热门推荐</h1>
              <ul>
                <li v-for="item in songList" class="item">
                  <div class="icon">
                    <img v-lazy="item.picUrl" width="60" height="60">
                  </div>
                  <div class="text">
                    <h2 class="name">{{item.songListAuthor}}</h2>
                    <p class="desc">{{item.songListDesc}}</p>
                  </div>
                </li>
              </ul>
          </div>
          </div>
          <div v-show="!songList.length" class="loading-container">
            <loading></loading>
          </div>
      </scroll>
  </div>
</template>

<script>
import scroll from 'base/scroll/scroll'
import {getRecommend,getSongList} from "api/recommend.js"
import {ERR_OK} from "api/config.js"
import slider from "base/slider/slider"
import loading from "base/loading/loading"

export default {
  data(){
    return{
      recommends:[],
      songList:[]
    }
  },
  created(){
    this._getRecommend();
    this._getSongList();
  },
  methods:{
    _getRecommend(){
      getRecommend().then((res)=>{
        if(res.code===ERR_OK){
          this.recommends=res.data.slider;
        }
      })
    },
    _getSongList(){
      getSongList().then((res)=>{
        if(res.code===ERR_OK){
          this.songList=res.data.songList;
        }
      })
    },
    loadImage(){
      // 设置标志位checkLoaded，一旦加载出一张图片就刷新，无需加载一次刷新一次（设置标志位保证逻辑只要执行一次）
      if(!this.checkLoaded){
        this.$refs.scroll.refresh();
        this.checkLoaded=true;
      }
    }
  },
  components:{
    slider,
    scroll,
    loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center//（首先要有flex）自适应水平居中
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column 
            justify-content: center//（首先要有column）垂直居中
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>