import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading";

const AddDoctor = () => {
    const formData = new  FormData();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();
  const { data: services, isLoading } = useQuery("services", () =>
    fetch("http://localhost:5000/service").then((res) => res.json())
  );
  const onSubmit = async (data) => {
    console.log(data);
    const image = data.image[0];
    formData.append('image',image);
    const secretApiKey='d281449f0f986aa18066ad56b6e0e247';
    const url = `https://api.imgbb.com/1/upload?key=${secretApiKey}`;
    fetch(url,{
        method:'POST',
        body:formData
    })
    .then((res)=>res.json())
    .then((result) => {
        if(result.success){
            const doctor = {
                name:data.name,
                email:data.email,
                specility:data.specility,
                image:result.data?.url
            }

            // send to DB : 
            fetch('http://localhost:5000/doctors',{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body:JSON.stringify(doctor)

            }).then((res) => res.json())
            .then((result) => {
                console.log(result);
                if(result.insertedId){
                    reset();
                    toast.success('data save successfully')
                } else {
                    toast.error('there was problem in request!!!');
                }
            })
        }
    })
  };
  return (
      <>
      
      {
          isLoading ? <Loading/> : <div>
          <h1 className="text-center text-2xl">Add new a Doctor</h1>
          <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full max-w-xs"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>
    
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full max-w-xs"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is Required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide a valid Email",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
    
              <div className="form-control w-full max-w-xs">
                <select {...register('specility')} className="select select-bordered w-full max-w-xs">
                 {
                     services.map((service) => <option key={service._id} value={service.name}>{service.name}</option>)
                 }
                  
                </select>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">upload image</span>
                </label>
                <input
                  type="file"
                  className="input input-bordered w-full max-w-xs"
                  {...register("image", {
                    required: {
                      value: true,
                      message: "Email is Required",
                    }
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>

              <input
                className="btn w-full max-w-xs text-white"
                type="submit"
                value="add"
              />
            </form>
          </div>
        </div> 
      }
      </>
  );
};

export default AddDoctor;
