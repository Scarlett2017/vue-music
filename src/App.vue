<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <!-- keepalive把dom缓存到内存中，不会发送请求，不需要重新渲染dom -->
      <router-view></router-view>    
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
// 标签用-,其他用驼峰

import MHeader from './components/m-header/m-header'
import Tab from './components/tab/tab'
import Player from 'components/player/player'

export default {
  components:{
    MHeader,
    Tab,
    Player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
