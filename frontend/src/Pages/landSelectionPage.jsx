
import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import { format, parseISO } from "date-fns"
import { Search, Loader2, ArrowRight } from "lucide-react"
import Navbar from "../Components/navBar"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import getBaseURL from "../Utils/apiConfig"
import apiClient from "../Utils/apiClient"
import Footer from "../Components/footer"

// Fix for Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

// Component to handle map clicks and update marker position
function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      setPosition([lat, lng])
    },
  })

  return null
}

function LandSelectionPage() {
  // Initial map center (Kathmandu, Nepal)
  const [center] = useState([27.7172, 85.324])
  const [position, setPosition] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [message, setMessage] = useState("") // State to store the message
  const [farmName, setFarmName] = useState("") // State to store the farm name
  const [isLoading, setIsLoading] = useState(false) // New state for loading status
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null) // Track selected history item

  // Placeholder land history data
  const [landHistoryItems, setLandHistoryItems] = useState([])

  // Fetch land history data from the API
  useEffect(() => {
    const fetchLandHistory = async () => {
      try {
        const response = await apiClient.post(getBaseURL() + "/land/get", {
          user_id: localStorage.getItem("userId"),
        })
        if (response.status === 200) {
          const formattedData = response.data.map((item) => ({
            id: item.plot_id,
            title: item.plotName,
            description: `Latitude: ${item.latitude}, Longitude: ${item.longitude}`,
            date: item.addedDate,
          }))
          setLandHistoryItems(formattedData)
          console.log("Land history data:", formattedData)
        }
      } catch (error) {
        console.error("Error fetching land history:", error)
      }
    }

    fetchLandHistory()
  }, [])

  // Function to handle clicking on a land history item
  const handleLandHistoryClick = async (item) => {
    setSelectedHistoryItem(item.id)
    console.log("Selected land history item:", item)
    localStorage.setItem("plotId", item.id)
    localStorage.setItem("plotName", item.title)
    
    const soilData = await apiClient.post(getBaseURL() + "/soil/get", {
      plot_id: localStorage.getItem("plotId"),
    })

    // Third API call to forecast weather
    const weatherData = await apiClient.post(getBaseURL() + "/weather/get", {
      plot_id: localStorage.getItem("plotId"),
    })

    console.log("Weather data:", weatherData.data)
    console.log("Soil data:", soilData.data)
    console.log(localStorage.getItem("plotId"))

    const cropRecommendationData = await apiClient.post(getBaseURL() + "/crop/recommendation/save", {
      plot_id: localStorage.getItem("plotId"),
      n: soilData.data.n,
      p: soilData.data.p,
      k: soilData.data.k,
      ph: soilData.data.ph,
      temperature: weatherData.data.tempMean1,
      humidity: weatherData.data.humidity1,
    })

    

    // Show a brief message before redirecting
    setMessage(`Selected ${item.title}. Redirecting to soil details...`)

    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = "/soil-details"
    }, 800)
  }

  // Function to filter land history items based on search query
  const filteredLandHistoryItems = landHistoryItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Function to send latitude and longitude to the API
  const sendLocationToAPI = async () => {
    if (!position) return
    if (!farmName.trim()) {
      setErrorMessage("Please name the farmland before proceeding.")
      return
    }

    // Set loading state to true before API calls
    setIsLoading(true)
    setErrorMessage("")
    setMessage("")

    const [latitude, longitude] = position

    try {
      // First API call to add land
      const landResponse = await apiClient.post(getBaseURL() + "/land/add", {
        latitude: latitude.toFixed(3),
        longitude: longitude.toFixed(3),
        plotName: farmName,
        user_id: localStorage.getItem("userId"),
      })

      localStorage.setItem("plotId", landResponse.data)

      // Second API call to predict soil
      const soilResponse = await apiClient.post(getBaseURL() + "/soil/predict", {
        plot_id: landResponse.data,
      })

      // Third API call to forecast weather
      const weatherResponse = await apiClient.post(getBaseURL() + "/weather/forecast", {
        plot_id: landResponse.data,
      })

      const cropRecommendationResponse = await apiClient.post(getBaseURL() + "/crop/recommendation/save", {
        plot_id: landResponse.data,
        n: soilResponse.data.n,
        p: soilResponse.data.p,
        k: soilResponse.data.k,
        ph: soilResponse.data.ph,
        temperature: weatherResponse.data.tempMean1,
        humidity: weatherResponse.data.humidity1,
      })

      if (landResponse.status === 200 && soilResponse.status === 201 && weatherResponse.status === 201 ) {
        setMessage("Location, Soil & Weather Data saved successfully!")
        localStorage.setItem("plotId", landResponse.data)
        localStorage.setItem("plotName", farmName)

        // Redirect after a short delay to show success message
        setTimeout(() => {
          window.location.href = "/soil-details"
        }, 1000)
      } else {
        const deleteResponse = await apiClient.post(getBaseURL() + "/land/delete", {
          plot_id: landResponse.data,
        })
        setErrorMessage(`Failed to send location: Soil - ${soilResponse.statusText}, Land - ${landResponse.statusText}, Weather - ${weatherResponse.statusText}, Crop Recommendation - ${cropRecommendationResponse.statusText}`)
      }
    } catch (error) {
      console.error("Error sending location:", error)
      const deleteResponse = await apiClient.post(getBaseURL() + "/land/delete", {
        plot_id: localStorage.getItem("plotId"),
      })
      setErrorMessage(error.response?.data?.error || "An unexpected error occurred")

    } finally {
      // Set loading state to false after API calls complete
      setIsLoading(false)
    }
  }

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-black animate-spin mb-4" />
        <p className="text-lg font-medium">Processing your data...</p>
        <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Loading overlay - shown when isLoading is true */}
      {isLoading && <LoadingOverlay />}

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Select Your Land</h1>

        {/* Map Container */}
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md mb-10">
          <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker setPosition={setPosition} />
            {position && <Marker position={position} />}
          </MapContainer>
        </div>

        {/* Selected Location Information */}
        {position && (
          <div className="bg-gray-100 p-4 rounded-md mb-8">
            <h2 className="text-lg font-semibold mb-2">Selected Location</h2>
            <p>Latitude: {position[0].toFixed(3)}</p>
            <p>Longitude: {position[1].toFixed(3)}</p>
            {errorMessage && <p className="my-4 text-sm text-red-500">{errorMessage}</p>}
            {message && <p className="my-4 text-sm text-green-500">{message}</p>}

            {/* Farm Name Input */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter farm name..."
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>

            <button
              className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center justify-center"
              onClick={sendLocationToAPI}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Use This Location"
              )}
            </button>
          </div>
        )}

        {/* Land History Section */}
        <div className="bg-gray-100 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Land History</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 pl-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Land History Records */}
          <div className="space-y-4">
            {filteredLandHistoryItems.length > 0 ? (
              filteredLandHistoryItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-gray-200 p-4 rounded relative cursor-pointer transition-all hover:bg-gray-300 hover:shadow-md ${
                    selectedHistoryItem === item.id ? "ring-2 ring-black" : ""
                  }`}
                  onClick={() => handleLandHistoryClick(item)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-500 mt-5" />
                  </div>
                  <span className="absolute top-2 right-2 text-sm text-gray-500">
                    {format(parseISO(item.date), "MMMM do, yyyy - h:mm a")}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                {searchQuery ? "No matching land records found" : "No land records found"}
              </p>
            )}
          </div>

          {/* Instruction text */}
          {landHistoryItems.length > 0 && (
            <p className="text-sm text-gray-500 mt-4 text-center">Click on any land record to view its soil details</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LandSelectionPage
