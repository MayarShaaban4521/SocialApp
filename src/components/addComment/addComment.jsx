import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createComment } from '../../API/comments/createComment.api';

export default function AddComment({postId}) {
 const [content,setContent]=useState('')
 const queryClinet = useQueryClient();
const {data,isPending,mutate,isError} =  useMutation({
    mutationFn:(data)=>createComment(data),
     onSuccess:()=>{
      toast.success('comment added successfuly',{duration:5000})
      queryClinet.invalidateQueries({
        queryKey:['comments']
      })
    },
    onError:()=>{
      toast.error('there is an error')
    }
  })


  function addComment(){
   const obj={
        content:content,
        post:postId
   }
    if(content){
      console.log('hi from comment')
      mutate(obj)
      
    }
  }

  return (
    <>
      {/* New Comment Input */}
            <div className="flex  gap-5 content-between items-center">
            <input
              type="text"
              name="content"
              value={content}
              onChange={(e)=>setContent(e.target.value)}
              placeholder="Write a comment..."
              className="input input-bordered w-full"
            />
            <button onClick={addComment} className="px-3 cursor-pointer py-2 bg-blue-400 text-white rounded-xl">
              Add
            </button>
          </div>
    </>
  )
}
