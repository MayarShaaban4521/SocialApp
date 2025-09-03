import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import { getUserPosts } from '../../API/posts/userPosts.api';
import PostItem from '../PostItem/PostItem';
import Comments from '../Comments/Comments';
import AddPost from '../addPost/addPost';
import { Helmet } from 'react-helmet';
import AddComment from '../addComment/addComment';


export default function Profile() {
    const [showComments, setShowComments] = useState(false);

  const { id } = useParams();
  console.log("profile id:",id);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getUserPosts(id)
  });
  console.log(data?.posts);
  
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

  return (
   <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Profile</title>
            </Helmet>
    {<AddPost/>}
      {
      data?.posts.map((post)=>{
        return  <div  key={post?._id} className="card bg-base-100 shadow-md p-4 max-w-xl mx-auto my-6">
        
          <PostItem post={post} key={post?._id}/>

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
         
         {post?.comments.map((comment)=><Comments comment={comment}/>)}


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

        <AddComment postId={post?._id}/>
        </div>
      )}
    </div>
      })
    }
    </>
  
  );
}
