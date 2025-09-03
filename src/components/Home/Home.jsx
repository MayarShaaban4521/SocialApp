import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../API/allPosts.api";
import Loader from "./../Loader/Loader";
import { Link } from "react-router-dom";
import PostItem from "../PostItem/PostItem";
import Comments from "./../Comments/Comments";
import {Helmet} from "react-helmet";
import AddComment from '../addComment/addComment';
import  axios  from 'axios';
import AddPost from './../addPost/addPost';



export default function home() {
  const [showComments, setShowComments] = useState(false);
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPosts,
    staleTime: 1000,
    //retry: 3,
    //retryDelay: 1000,
    //refetchInterval: 3000
    gcTime: 3000, // garbage collection time
    select: (data) => data?.posts,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-red-800 text-center mt-[150px] text-2xl">
        Error: {error.message}
      </div>
    );
  }

  //reactQuery => caching
  //useEffect => side effects
  //fetch data from API 3 times(default)

  return (
  <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
  {<AddPost/>}
  {
     data?.map((post)=>{
      return   <div key={post?._id} className="card bg-base-100 shadow-md p-4 max-w-xl mx-auto my-6">
          <PostItem post={post}/>
      <div className="flex gap-3 text-sm text-gray-500">
        <button className="btn btn-ghost btn-sm">👍 Like</button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setShowComments(!showComments)}
        >
          💬 Comment
        </button>
        <button className="btn btn-ghost btn-sm">↪️ Share</button>
      </div>

     {/* Toggle Comments Section */}
      {showComments && (
        <div className="mt-4">
          {/* Existing Comments */}
         
         <Comments postId={post?._id}/>


        <div>
                  <div className="mb-2 flex justify-between gap-3 items-center">
                    <div className="">
                      <div className=" avatar">
                        <div className="w-8 h-8 rounded-full ">
                          <img
                            src=""
                            alt="Commenter"
                          />
                        </div>
                      </div>
                      <p>name </p>
                    </div>
                    <div className="chat-bubble w-full">comment.content</div>
                  </div>
                </div>
        </div>
      )}
              <AddComment postId={post?._id}/>  

    </div>
     })
  }
  </>
  );
}
