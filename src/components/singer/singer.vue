<template>
  <div class="singer">
      <list-view :data="singers" @select="selectSinger"></list-view>
      <router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from 'api/singer.js'
import {ERR_OK} from "api/config.js"
import Singer from 'common/js/singer.js'
import ListView from 'base/listview/listview'
import {mapMutations} from 'vuex'

const HOT_NAME='热门'
const HOT_SINGER_LEN=10

export default {
  data(){
      return{
          singers:[]
      }
  },
  created(){
      this._getSingerList();
  },
  methods:{
      selectSinger(singer){
        //   router编程式跳转
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList(){
          getSingerList().then((res)=>{
              if(res.code===ERR_OK){
                  this.singers=this._normalizeSinger(res.data.list);
              }
          })
      },
      _normalizeSinger(list){
          let map={
              hot:{
                  title:HOT_NAME,
                  items:[]
              }
          };
          list.forEach((item,index) => {
              if(index<HOT_SINGER_LEN){
                  map.hot.items.push(new Singer({
                      id:item.Fsinger_mid,
                      name:item.Fsinger_name
                  }))
              }

              const key=item.Findex;
              if(!map[key]){
                  map[key]={
                      title:key,
                      items:[]
                  }
              }
              map[key].items.push(new Singer({
                  id:item.Fsinger_mid,
                  name:item.Fsinger_name
              }))
          });

        //   为了得到有序列表，将map排序
        let hot=[];
        let ret=[];
        for(let key in map){
            let val=map[key];
            if(val.title.match(/[a-zA-Z]/)){
                ret.push(val);
            }else if(val.title===HOT_NAME){
                hot.push(val)
            }
        }
        
        ret.sort((a,b)=>{
            return a.title.charCodeAt(0)-b.title.charCodeAt(0);//升序
        })
        return hot.concat(ret);//concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
    },
    ...mapMutations({
        // 方法映射
        setSinger:'SET_SINGER'
    })
  },
  components:{
      ListView
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px  //固定父容器高度（better-scroll需要）
    bottom: 0
    width: 100%
</style>
