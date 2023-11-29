import axios from '../axios'

export const apiReigister=(data)=>axios({
    url:'/user/register',
    method:'post',
    data
})

export const apiLogin=(data)=>axios({
    url:'/user/login',
    method:'post',
    data
})