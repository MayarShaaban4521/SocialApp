import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { tokenContext } from './../../Context/tokenContext.jsx';

export default function login() {
  let { setToken } = useContext(tokenContext);
  let navigate = useNavigate();

  //yup - zod
  let schema = z.object({
    email:z.string().email("email is not valid").nonempty("email is required"),
    password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"password is not valid").nonempty("password is required"),
  })


  let {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values) {
   
    try {
      let { data } = await axios.post(
        'https://linked-posts.routemisr.com/users/signin',
        values
      );
      if (data.message === "success") {
        //1- save token to tokenContext
        //2 - save token in localstorage
        localStorage.setItem("token", data.token);

        setToken(data.token);
        navigate("/");
      }
    } catch (error) {
     
      setError("root", { message: error.response.data.error });
    }
  }

  return (
    <div className="bg-gray-50 h-screen pt-10">
      <div className="w-[60%] mx-auto shadow-lg rounded p-5 bg-white">
        <h1 className="text-3xl pb-5 text-sky-600 font-semibold">Login now</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email", { required: "email is required" })}
            type="email"
            placeholder="Type your email..."
            className="input input-md bg-gray-50 w-full mb-3"
          />
          {errors.email && (
            <p className="text-red-500 mb-4">{errors.email.message}</p>
          )}
          <input
            {...register("password", { required: "password is required" })}
            type="password"
            placeholder="Type your password"
            className="input input-md bg-gray-50 w-full mb-3"
          />
          {errors.password && (
            <p className="text-red-500 mb-4">{errors.password.message}</p>
          )}

          {errors.root && (
            <p className="text-red-500 mb-4">{errors.root.message}</p>
          )}

          <button className="btn btn-primary mt-4">
            {isSubmitting ? "loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
