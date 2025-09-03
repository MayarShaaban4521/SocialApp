import React from 'react'
import user from "../../assets/person.jpeg"
import { comment } from 'postcss'
import postImg from "../../assets/socialApp.jpg"


export default function Comments({comment}) {
  
  
  let {commentCreator, content} = comment
  return (
    <div>

                  <div className="mb-2 flex justify-between gap-3 items-center">
                    <div className="">
                      <div className=" avatar">
                        <div className="w-8 h-8 rounded-full ">
                          <img
                            src= {commentCreator?.photo.includes("undefined")? postImg : commentCreator?.photo}
                            alt="Commenter"
                          />
                        </div>
                      </div>
                      <p>{commentCreator?.name}</p>
                    </div>
                    <div className="chat-bubble w-full">{content}</div>
                  </div>
                </div>


  )
}
