// 将mutation改变的数据映射到数据中从而获取数据（对数据的映射，类似计算属性）

export const singer = state => state.singer//箭头函数简写，参数为state，回调为state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
    return state.playlist[state.currentIndex] || {}
}
