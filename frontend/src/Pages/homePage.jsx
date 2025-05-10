"use client"

import Footer from "../Components/footer"
import Navbar from "../Components/navBar"
import { Globe, Leaf, Droplets, Star } from "lucide-react"

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10">
            <h1 className="text-4xl font-bold leading-tight mb-6">
              Empowering Farmers with <span className="text-green-700">Smart Soil Solutions</span>
            </h1>
            <p className="text-gray-700 mb-8">
              Welcome to our innovative agriculture web application, designed to provide you with real-time soil data
              and fertility insights. Maximize your crop yield and make informed decisions with personalized weather
              alerts and tailored fertilizer suggestions.
            </p>
            <button
              onClick={() => {
                const isLoggedIn = localStorage.getItem("token") // Or however you check auth status
                if (isLoggedIn) {
                  window.location.href = "/land-selection"
                } else {
                  window.location.href = "/login"
                }
              }}
              className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition-colors shadow-md"
            >
              Get Started
            </button>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="bg-gray-300 h-64 md:h-80 w-full flex items-center justify-center rounded-lg overflow-hidden shadow-lg border-2 border-amber-100">
              <img src="/images/farm1.jpg" alt="Placeholder" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <p className="text-sm font-medium text-green-700 mb-2">Empower</p>
            <h2 className="text-3xl font-bold text-amber-800">Unlock the Potential of Your Land</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-600">
              <div className="mb-4">
                <Globe className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-amber-800">Advanced Soil Data Analytics at Your Fingertips</h3>
              <p className="text-gray-600">Gain insights into soil health and fertility.</p>
            </div>

            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-600">
              <div className="mb-4">
                <Leaf className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-amber-800">
                Personalized Crop Suggestions for Optimal Growth
              </h3>
              <p className="text-gray-600">Choose the best crops based on soil data.</p>
            </div>

            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-600">
              <div className="mb-4">
                <Droplets className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-amber-800">
                Smart Fertilizer Recommendations Tailored for You
              </h3>
              <p className="text-gray-600">Enhance your soil's potential with the right fertilizers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-amber-800">Customer testimonials</h2>
          <p className="text-gray-700 mb-12">This app transformed my farming experience completely!</p>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-sm border-t-4 border-amber-400">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"The insights provided have significantly improved my yields."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-amber-100 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-600">Farmer, Local Farm</p>
                </div>
              </div>
              <div className="mt-4 text-green-600 text-sm">Crop Yield</div>
            </div>

            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-sm border-t-4 border-amber-400">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"I never knew my soil could be so productive!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-amber-100 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-sm text-gray-600">AgriTech, AgriTech</p>
                </div>
              </div>
              <div className="mt-4 text-green-600 text-sm">Soil Health</div>
            </div>

            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-sm border-t-4 border-amber-400">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"The weather alerts help me plan better!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-amber-100 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">Emily Johnson</p>
                  <p className="text-sm text-gray-600">Gardener, FarmLot</p>
                </div>
              </div>
              <div className="mt-4 text-green-600 text-sm">Weather Insights</div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-10">
              <h2 className="text-3xl font-bold mb-6 text-amber-800">
                Unlock Your Land's Potential with Advanced Soil and Weather Insights
              </h2>
              <p className="text-gray-700">
                Our application provides in-depth soil data analysis to help you understand your land better. Get
                personalized crop and fertilizer suggestions tailored to your soil's unique profile. Stay informed with
                real-time weather alerts to protect your investment and optimize your farming practices.
              </p>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="bg-gray-300 h-64 md:h-80 w-full flex items-center justify-center rounded-lg overflow-hidden shadow-lg border-2 border-amber-100">
                <img src="/images/farm2.jpg" alt="Placeholder" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-amber-50 to-green-50 p-10 rounded-lg text-center shadow-md border border-green-100">
            <h2 className="text-2xl font-bold mb-6 text-green-800">Ready to get started?</h2>
            <p className="text-gray-700 mb-8">
              Start making smarter farming decisions today with real-time soil and weather insights, crop
              recommendations, and inventory tools designed for you.
            </p>
            <button
              onClick={() => {
                const isLoggedIn = localStorage.getItem("token") // Or however you check auth status
                if (isLoggedIn) {
                  window.location.href = "/land-selection"
                } else {
                  window.location.href = "/login"
                }
              }}
              className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition-colors shadow-md"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default HomePage
