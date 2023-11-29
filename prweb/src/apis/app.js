import axios from "../axios";
export const apiGetCategory=()=>axios({
    url:'/prcategory/',
    method:'get'
})