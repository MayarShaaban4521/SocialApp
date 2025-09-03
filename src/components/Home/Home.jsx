import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../API/allPosts.api";
import Loader from "./../Loader/Loader";
import PostItem from "../PostItem/PostItem";
import { Helmet } from "react-helmet";
import AddComment from "../addComment/addComment";
import AddPost from "./../addPost/addPost";
import Comments from "./../Comments/Comments";

export default function home() {
  const [showComments, setShowComments] = useState(false);
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPosts,
    staleTime: 1000,
    gcTime: 3000,
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

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      {<AddPost />}
      {data?.map((post) => {
        return (
          <div
            key={post?._id}
            className="card bg-base-100 shadow-md p-4 max-w-xl mx-auto my-6"
          >
            <PostItem post={post} />
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

            {showComments && (
              <div className="mt-4">
                {post?.comments?.map((comment, idx) => (
                  <Comments key={idx} comment={comment} />
                ))}
              </div>
            )}
            <AddComment postId={post?._id} />
          </div>
        );
      })}
    </>
  );
}
