import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createComment } from '../../API/comments/createComment.api';

export default function AddComment({ postId }) {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createComment(data),
    onSuccess: () => {
      toast.success('comment added successfully', { duration: 5000 });
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: () => {
      toast.error('there is an error');
    }
  });

  function addComment() {
    if (!content.trim()) return;
    const obj = { content, post: postId };
    mutate(obj);
    setContent(""); // reset input after success
  }

  return (
    <div className="flex gap-5 content-between items-center">
      <input
        type="text"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="input input-bordered w-full"
      />
      <button
        onClick={addComment}
        disabled={isPending}
        className="px-3 cursor-pointer py-2 bg-blue-400 text-white rounded-xl"
      >
        {isPending ? "Adding..." : "Add"}
      </button>
    </div>
  );
}
