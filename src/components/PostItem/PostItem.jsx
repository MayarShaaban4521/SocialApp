import React, {useContext} from 'react'
import user from "../../assets/person.jpeg"
import postImg from "../../assets/socialApp.jpg"
import { tokenContext } from '../../Context/tokenContext';
import { useMutation, QueryClient, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { deletePost } from '../../API/posts/deletePost.api';

export default function PostItem({post}) {
 const {userData} =  useContext(tokenContext);
 const QueryClient = useQueryClient();

const {data,mutate,isPending,isError,error} = useMutation({
  mutationFn:(id)=>deletePost(id),
   onSuccess:()=>{
      toast.success('post deleted successfuly',{duration:5000})
      QueryClient.invalidateQueries({
        queryKey:['profile']
      })
    },
    onError:()=>{
      toast.error('there is an error')
    }
 })

  return (
    <>
    <div className="flex justify-between mb-3">
        <div className='flex items-center gap-3'>
           <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={post?.user?.photo ?  post?.user?.photo : user} alt="User" />
              </div>
            </div>
            <div>
              <p className="font-bold">{post?.user?.name}</p>
              <p className="text-sm text-gray-400">{post?.createdAt}</p>
            </div>
            </div>
           
           <div>
               { post?.user?._id == userData?._id && (
            <span onClick={()=>mutate(post?._id)}>X</span>
            )}
        </div>

          </div>
    
          <p className="mb-3">
            {post?.body}
          </p>
    <Link to={`/postDetails/${post?._id}`}>
          <img src={post?.image ? post?.image : postImg} className="rounded-lg mb-4" alt="Post" />
    </Link> 
          
    </>
  )
}
