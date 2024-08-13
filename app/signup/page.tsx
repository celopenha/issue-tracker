"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

const LoginPage = () => {
  const { register, handleSubmit,reset } = useForm();
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/signup`,
        { ...data, role: "ADMIN" }
      );
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center min-h-screen bg-rose-50">
        <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:my-10">
          <div className="p-6 md:pt-20">
            <h2 className="font-mono mb-5 text-4xl font-bold">Log In</h2>
            <p className="max-w-sm mb-12 font-sans font-light text-gray-600">
              Log in to your account to manage your issues and be more
              productivity
            </p>
            <div className="flex flex-col gap-4">
              <input
                {...register("fullName")}
                placeholder="Full Name"
                type="text"
                className="w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
              />
              <input
                {...register("email")}
                placeholder="Email"
                type="email"
                className="w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
              />
              <input
                {...register("password")}
                placeholder="Password"
                type="password"
                className="w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
              />
            </div>
            <div className="flex flex-col items-center justify-between mt-6 space-y-6 md:flex-row md:space-y-0">
              <div className="flex flex-col gap-4">
                <span className="font-thin text-cyan-700 block">
                  <a href="#">Forgot password</a>
                </span>
                <span className="font-thin text-cyan-700 block">
                  <a href="#">Dont have account? click here</a>
                </span>
              </div>
              <button className="w-full md:w-auto flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150">
                <span className="block">Next</span>
              </button>
            </div>
          </div>
          <Image
            width={300}
            height={100}
            alt="Login Image"
            src="/img/login-image.jpg"
            className="w-[330px] hidden md:block"
          />
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
