import axios from "axios";


const token = localStorage.getItem('token');
export async function getUserData(){
   const {data} = await  axios.get(`https://linked-posts.routemisr.com/users/profile-data`,{
      headers:{
        token:token
      }
    })

   return data
}