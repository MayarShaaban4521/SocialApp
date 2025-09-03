import axios from "axios";

const token = localStorage.getItem('token');
export async function createComment(obj){
   const {data} = await  axios.post(`https://linked-posts.routemisr.com/comments`,
    obj
    ,{
      headers:{
        token:token
      }
    })

   return data
}