import React from 'react'
import { ThreeDots } from "react-loader-spinner";


export default function Loader() {
  return (
    <div className= "flex justify-center items-center h-screen">
      <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#0369a1"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  )
}
