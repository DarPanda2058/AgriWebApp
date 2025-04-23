import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { Navigate, useNavigate } from "react-router-dom" // Assuming you're using React Router
import axios from "axios"
import getBaseURL from "../Utils/apiConfig"

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        setErrorMessage("")

        try {
            const response = await axios.post(getBaseURL() + "/auth/login", {
                email: data.email,
                password: data.password,
            })
            const token = response.data.token;
            const userId = response.data.user_id;
            const userName = response.data.first_name;

            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);

            navigate("/"); // Redirect to home page after successful login
        } catch (error) {
            
            setErrorMessage("Incorrect Password or Email." + (error.response?.data?.error || ""))
        } finally {
            setIsSubmitting(false)
        }

    }

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
                                <Link to="/">
                                <span className="text-xs font-medium text-gray-600">LOGO</span>
                                </Link>
                            </div>
                    </div>
                   

                    {/* Form header */}
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-gray-900">Login to your Account</h1>
                        <p className="mt-2 text-sm text-gray-600">See what is going on with your business</p>
                    </div>

                    {/* Form */}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
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
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", {
                                            required: "Password is required",
                                        })}
                                        placeholder="••••••••"
                                        className={`mt-1 block w-full rounded-md border ${
                                            errors.password ? "border-red-500" : "border-gray-300"
                                        } px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm`}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                            <Eye className="h-5 w-5" aria-hidden="true" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        {...register("rememberMe")}
                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-500"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember Me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-gray-700 hover:text-gray-900">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>
                        </div>

                        {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex w-full justify-center rounded-md bg-black px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-70"
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </div>
                    </form>

                    {/* Sign up link */}
                    <div className="text-center text-sm">
                        <span className="text-gray-600">Not Registered Yet? </span>
                        <Link to="/signup" className="font-medium text-gray-900 hover:underline">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
