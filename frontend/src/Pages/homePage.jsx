import Footer from "../Components/footer"
import Navbar from "../Components/navBar"
import { Globe, Leaf, Droplets, Star, ImageIcon } from "lucide-react"

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10">
            <h1 className="text-4xl font-bold leading-tight mb-6">Empowering Farmers with Smart Soil Solutions</h1>
            <p className="text-gray-700 mb-8">
              Welcome to our innovative agriculture web application, designed to provide you with real-time soil data
              and fertility insights. Maximize your crop yield and make informed decisions with personalized weather
              alerts and tailored fertilizer suggestions.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">Get Started</button>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="bg-gray-300 h-64 md:h-80 w-full flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <p className="text-sm font-medium mb-2">Empower</p>
            <h2 className="text-3xl font-bold">Unlock the Potential of Your Land</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="mb-4">
                <Globe className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Advanced Soil Data Analytics at Your Fingertips</h3>
              <p className="text-gray-600">Gain insights into soil health and fertility.</p>
            </div>

            <div className="md:w-1/3">
              <div className="mb-4">
                <Leaf className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Crop Suggestions for Optimal Growth</h3>
              <p className="text-gray-600">Choose the best crops based on soil data.</p>
            </div>

            <div className="md:w-1/3">
              <div className="mb-4">
                <Droplets className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Fertilizer Recommendations Tailored for You</h3>
              <p className="text-gray-600">Enhance your soil's potential with the right fertilizers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Customer testimonials</h2>
          <p className="text-gray-700 mb-12">This app transformed my farming experience completely!</p>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"The insights provided have significantly improved my yields."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-600">Farmer, Local Farm</p>
                </div>
              </div>
              <div className="mt-4 text-gray-500 text-sm">Workflow</div>
            </div>

            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"I never knew my soil could be so productive!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-sm text-gray-600">AgriTech, AgriTech</p>
                </div>
              </div>
              <div className="mt-4 text-gray-500 text-sm">Workflow</div>
            </div>

            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"The weather alerts help me plan better!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">Emily Johnson</p>
                  <p className="text-sm text-gray-600">Gardener, FarmLot</p>
                </div>
              </div>
              <div className="mt-4 text-gray-500 text-sm">Workflow</div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-10">
              <h2 className="text-3xl font-bold mb-6">
                Unlock Your Land's Potential with Advanced Soil and Weather Insights
              </h2>
              <p className="text-gray-700">
                Our application provides in-depth soil data analysis to help you understand your land better. Get
                personalized crop and fertilizer suggestions tailored to your soil's unique profile. Stay informed with
                real-time weather alerts to protect your investment and optimize your farming practices.
              </p>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="bg-gray-300 h-64 md:h-80 w-full flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-gray-100 p-10 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-gray-700 mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">Get Started</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default HomePage
