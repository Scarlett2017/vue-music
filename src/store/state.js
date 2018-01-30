// 存放状态,原始数据（最底层）
import {playMode} from 'common/js/config'

const state = {
    singer:{},
    playing:false,
    fullScreen:false,
    playlist:[],
    sequenceList:[],
    mode:playMode.sequence,
    currentIndex:-1
}

export default state