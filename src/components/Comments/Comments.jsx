import React from 'react'
import user from "../../assets/person.jpeg"
import postImg from "../../assets/socialApp.jpg"

export default function Comments({ comment }) {
  if (!comment) return null; // حماية من undefined

  const { commentCreator, content } = comment;

  return (
    <div className="mb-2 flex justify-between gap-3 items-center">
      <div className="flex items-center gap-2">
        <div className="avatar">
          <div className="w-8 h-8 rounded-full">
            <img
              src={
                commentCreator?.photo?.includes("undefined")
                  ? postImg
                  : commentCreator?.photo || user
              }
              alt="Commenter"
            />
          </div>
        </div>
        <p>{commentCreator?.name || "Anonymous"}</p>
      </div>
      <div className="chat-bubble w-full">{content}</div>
    </div>
  );
}
