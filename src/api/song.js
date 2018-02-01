
import {commonParams,options} from './config'
import axios from 'axios'

export function getLyric(mid){
    const url = '/api/lyric'

    const data=Object.assign({},commonParams,{
        pcachetime:+new Date(),
        songmid:mid,
        g_tk:5381,
        loginUin:0,
        hostUin:0,
        format:'jsonp',
        platform:'yqq',
        needNewCode:0
    });
    
    return axios.get(url,{
        params:data
    }).then(() => {
        return Promise.resolve(res.data)
    })
}
