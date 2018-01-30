<template>
    <transition  name="slide">
         <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail,getSong} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
    data(){
        return {
            songs : []
        }
    },
    computed:{
        title(){
            return this.singer.name;
        },
        bgImage(){
            return this.singer.avatar;
        },
        // 获取数据
        ...mapGetters([
            'singer'
        ])
    },
    created(){
        this._getSingerDetail();
    },
    methods:{
        _getSingerDetail(){
            if(!this.singer.id){
                this.$router.push('/singer');
                return;
            }
            getSingerDetail(this.singer.id).then((res) => {
                if(res.code === ERR_OK){
                   this.songs = this._normalizeSong(res.data.list);
                //    console.log(this.singer);
                }
            })
        },
        _normalizeSong(list){
            let ret = [];
            list.forEach((item) => {
                let {musicData} = item;
                if(musicData.songid && musicData.albummid){
                    getSong(musicData.songmid).then((res) => {
                        if(res.code === ERR_OK){
                            const svkey = res.data.items;
                            const songVkey = svkey[0].vkey;
                            const newSong = createSong(musicData,songVkey);
                            ret.push(newSong);
                        }
                    })
                }
            });
            return ret;
        }
    },
    components:{
        MusicList
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable"

.slide-enter-active, .slide-leave-active//注意两个class间有一个空格
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>