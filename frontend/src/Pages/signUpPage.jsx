import { useState } from "react"
import {Link} from "react-router-dom"
import { useForm } from "react-hook-form"
import  getBaseURL  from "../Utils/apiConfig"
import axios from "axios"
export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const onSubmit = async(data) => {
    setIsSubmitting(true)
    // Here you would typically send the data to your API
    console.log(data)

    // Simulate API call
    try{
        const response = await axios.post(`${getBaseURL()}/auth/register`, {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: data.password
        })
        window.location.href = "/login"
    }
    catch (error) {
        setErrorMessage(error.response.data)
    }finally{
        setIsSubmitting(false)
    }
    
  }

  // Watch the password field for confirmation validation
  const password = watch("password")

  return (
    <div className="flex min-h-screen">
      {/* Left side with background and text */}
      <div className="hidden w-full bg-gray-400 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex-1"></div>
        <div className="px-8 py-6">
          <h2 className="text-3xl font-bold text-gray-900">Lorem ipsum dolor sit amet consectetur.</h2>
          <p className="mt-2 text-gray-900">
            Lorem ipsum dolor sit amet consectetur. Pretium feugiat eget in eu ipsum interdum.
          </p>
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          
          <div className="flex justify-center">
            
              <div className="flex h-12 w-12 items-center justify-center bg-gray-200">
                  <Link to="/" className="text-xs font-medium text-gray-600">LOGO</Link>
              </div>
            
          </div>

          {/* Form header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Create your Account</h1>
            <p className="mt-2 text-sm text-gray-600">See what is going on with your business</p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  {...register("firstName", { required: "First name is required" })}
                  placeholder="John"
                  className={`mt-1 block w-full rounded-md border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm`}
                />
                {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  {...register("lastName", { required: "Last name is required" })}
                  placeholder="Doe"
                  className={`mt-1 block w-full rounded-md border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm`}
                />
                {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="john@example.com"
                  className={`mt-1 block w-full rounded-md border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  placeholder="••••••••"
                  className={`mt-1 block w-full rounded-md border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm`}
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                  placeholder="••••••••"
                  className={`mt-1 block w-full rounded-md border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
            
            {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Sign in link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Already Have an Account? </span>
            <Link to="/login" className="font-medium text-gray-900 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
