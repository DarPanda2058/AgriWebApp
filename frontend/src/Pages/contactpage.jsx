"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import Navbar from "../Components/navBar"
import { Loader2 } from "lucide-react"

export default function ContactUsPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const onSubmit = (data) => {
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Form data:", data)
      setIsSubmitting(false)
      setSuccessMessage("Thank you for your message! We'll get back to you soon.")
      reset()

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex min-h-screen">
        {/* Added pt-16 to account for navbar */}
        {/* Left side with image and text */}
            <div className="hidden w-full lg:flex lg:flex-col lg:relative">
                {/* Text overlay */}
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-start p-12 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <h2 className="text-3xl font-bold text-white mb-3">We're Here to Help</h2>
                <p className="text-white/90 max-w-md">
                    Have questions or need assistance? Reach out to us for support, feedback, or inquiries—we’re happy to connect with you.
                </p>
                </div>

            {/* Image */}
            <img src="/images/contact.jpg" className="object-cover h-full w-full" />
        </div>
        {/* Right side with form */}
        <div className="flex w-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center bg-gray-200">
                <Link to="/" className="text-xs font-medium text-gray-600">
                  LOGO
                </Link>
              </div>
            </div>

            {/* Form header */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-900">Contact Us</h1>
              <p className="mt-2 text-sm text-gray-600">Give us genuine feedback or Ask us anything.</p>
            </div>

            {/* Success message */}
            {successMessage && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">{successMessage}</p>
                  </div>
                </div>
              </div>
            )}

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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register("message", { required: "Message is required" })}
                    rows={5}
                    placeholder="Type your message here..."
                    className={`mt-1 block w-full rounded-md border ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>

            {/* Home link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Want to go back? </span>
              <Link to="/" className="font-medium text-gray-900 hover:underline">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
