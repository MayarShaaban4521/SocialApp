import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPosts } from '../../API/posts/createPost.api.js';
import toast from 'react-hot-toast';
export default function AddPost() {
  const queryClinet = useQueryClient();
  const [body,setBody]=useState('')
  const [image,setImage]=useState('')
  const [imgSrc,setImgSrc]=useState('')
  
  const {data,mutate,isPending,error,isError,isSuccess}=useMutation({
    mutationFn:createPosts,
    onSuccess:()=>{
      toast.success('post added successfuly',{duration:5000})
      queryClinet.invalidateQueries({
        queryKey:['profile']
      })
      queryClinet.invalidateQueries({
        queryKey:["getPosts"]
      })
    },
    onError:()=>{
      toast.error('there is an error')
    }
  })

// break 7:35
  function handleChange(e){
  
  const file = e.target.files[0]
  if(file){
    setImage(file)
  setImgSrc(URL.createObjectURL(file))
  }
  }

  function handleAddPost(){
    const formData = new FormData();
    if(body){
      formData.append('body',body)
    }
    if(image){
      formData.append('image',image)
    }

    mutate(formData)
    clr()
  }

  function clr(){
    setBody('');
    setImgSrc('')
  }

  return (
   <>
   {isPending && (toast('loading...'))}
    <div class="max-w-lg mx-auto mt-10">
  <div class="card bg-base-100 shadow-xl p-4">
    
    <textarea
      class="textarea textarea-bordered w-full resize-none"
      rows="4"
      value={body}
      onChange={(e)=>setBody(e.target.value)}
      placeholder="What's on your mind?">
    </textarea>

    <div class="mt-3 hidden" id="imagePreview">
      <div class="relative">
        <img src="https://via.placeholder.com/400x200" 
             class="w-full h-48 object-cover rounded-xl" alt="preview"/>
        <button class="btn btn-xs btn-circle absolute top-2 right-2 bg-base-100 shadow">✕</button>
      </div>
    </div>
   {imgSrc && (
     <img src={imgSrc} class="size-[100px] mx-auto rounded-xl my-3"/>
   )}
    

    <div class="flex justify-between items-center mt-4">
       <label class="cursor-pointer">
        <input onChange={handleChange} type="file" accept="image/*" class="hidden" />
        <div class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" 
               class="w-5 h-5" fill="none" 
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" 
              d="M21.44 11.05l-9.19 9.19a5.5 5.5 0 01-7.78-7.78l9.19-9.19a3.5 3.5 0 015 5l-9.2 9.19a1.5 1.5 0 01-2.12-2.12l8.13-8.12"/>
          </svg>
        </div>
      </label>

      <button onClick={handleAddPost} className="btn btn-primary rounded-full px-6">Post</button>
    </div>
  </div>
</div>
   </>
  )
}
