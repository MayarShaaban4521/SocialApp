import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';


export default function register() {
  let navigate = useNavigate()

  let schema = z.object({
    name:z.string().min(3,"name must be at least 3 characters").nonempty("name is required"),
    email:z.string().email("email is not valid").nonempty("email is required"),
    password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"password is not valid").nonempty("password is required"),
    rePassword:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"confirm password is not valid").nonempty("confirm password is required"),
    dateOfBirth:z.string().nonempty("date of Birth is required"),
    gender:z.enum(["female","male"])
  }).refine((data)=>data.password == data.rePassword,{
    message:"password not match",
    path:["rePassword"]
  })
  
  const { register, handleSubmit, formState: { errors, isSubmitting}, setError } = useForm({
    resolver: zodResolver(schema)
  });
  async function onSubmit(values){
    try{
    let  {data} =  await axios.post('https://linked-posts.routemisr.com/users/signup',values)
     if(data.message == "success"){
      // login
      navigate('/login')
     }
    }catch(error){
         setError('root',{message:error.response.data.error})
    }
  }

  return (
    <div className='bg-gray-50 h-screen pt-10'>
    <div className='w-[60%] mx-auto shadow-lg rounded p-5 bg-white'>
      <h1 className='text-3xl pb-5 text-sky-600 font-semibold'>Register now</h1>
     <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", {required:"name is required"})} type="text" placeholder="Type your name..." className="input input-md bg-gray-50 w-full mb-3" />
      {errors.name && (<p className='text-red-500 mb-4'>{errors.name.message}</p>)}
      <input {...register("email", {required:"email is required"})} type="email" placeholder="Type your email..." className="input input-md bg-gray-50 w-full mb-3" />
      {errors.email && (<p className='text-red-500 mb-4'>{errors.email.message}</p>)}
      <input {...register("password", {required:"password is required"})} type="password" placeholder="Type your password" className="input input-md bg-gray-50 w-full mb-3" />
      {errors.password && (<p className='text-red-500 mb-4'>{errors.password.message}</p>)}
      <input {...register("rePassword", {required:"confirm password is required"})} type="password" placeholder="Confirm password" className="input input-md bg-gray-50 w-full mb-4" />
      {errors.rePassword && (<p className='text-red-500 mb-4'>{errors.rePassword.message}</p>)}
      <input {...register("dateOfBirth")} type="date" className="input input-md bg-gray-50 w-full" />
      <div className="flex items-center gap-1.5 my-5">
        <input {...register("gender")} id='male' value="male" type="radio" name="gender" className="radio radio-primary" defaultChecked />
        <label className='me-3' htmlFor='male'>Male</label>
        <input {...register("gender")} id='female' value="female" type="radio" name="gender" className="radio radio-primary" />
        <label className='' htmlFor='female'>Female</label>
      </div>

            {errors.root && (<p className='text-red-500 mb-4'>{errors.root.message}</p>)}

      <button className='btn btn-primary mt-4'>{isSubmitting ? "loading..." :"SignUp"}</button>

     </form>
    </div>
    </div>
  )
}
