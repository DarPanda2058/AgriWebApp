
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Thermometer,
  Droplets,
  Calendar,
  AlertTriangle,
  MapPin,
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Loader2,
  ArrowRight,
  CloudSun,
  Wind,
  Eye,
  Info,
} from "lucide-react"
import Navbar from "../Components/navBar"
import apiClient from "../Utils/apiClient"
import Footer from "../Components/footer"

// No Plot Selected component
const NoPlotSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full overflow-hidden">
        <div className="bg-blue-50 p-6 flex items-center justify-center">
          <CloudSun className="h-16 w-16 text-blue-400" />
        </div>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No Land Plot Selected</h2>
          <p className="text-gray-600 mb-6">
            You need to select a land plot before viewing weather details. Please go to the Land Selection page to
            choose a plot or create a new one.
          </p>
          <Link
            to="/land-selection"
            className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Go to Land Selection
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="bg-blue-50 p-4 border-t border-blue-100">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-blue-800 text-sm">
              Weather forecasts and soil conditions are specific to each land plot. Select a plot to view detailed
              weather information for your farm.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Current Weather Banner component
const CurrentWeatherBanner = ({ weatherData, todayAlert }) => {
  // Helper function to get weather description based on weather code
  const getWeatherDescription = (code) => {
    if (code < 200) return "Clear Sky"
    if (code < 300) return "Foggy"
    if (code < 400) return "Cloudy"
    if (code < 600) return "Rainy"
    if (code < 700) return "Snowy"
    if (code < 800) return "Thunderstorm"
    return "Partly Cloudy"
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl overflow-hidden shadow-lg mb-8">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-4">
              {weatherData.weatherCode1 < 200 ? (
                <Sun className="w-16 h-16 text-yellow-300" />
              ) : weatherData.weatherCode1 < 300 ? (
                <CloudFog className="w-16 h-16 text-gray-200" />
              ) : weatherData.weatherCode1 < 400 ? (
                <Cloud className="w-16 h-16 text-gray-200" />
              ) : weatherData.weatherCode1 < 600 ? (
                <CloudRain className="w-16 h-16 text-blue-200" />
              ) : weatherData.weatherCode1 < 700 ? (
                <CloudSnow className="w-16 h-16 text-blue-100" />
              ) : weatherData.weatherCode1 < 800 ? (
                <CloudLightning className="w-16 h-16 text-yellow-300" />
              ) : (
                <CloudSun className="w-16 h-16 text-yellow-300" />
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold">{weatherData.tempMean1}°C</h2>
              <p className="text-blue-100">{getWeatherDescription(weatherData.weatherCode1)}</p>
              {todayAlert && <p className="text-sm mt-1 text-blue-100">{todayAlert}</p>}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end mb-1">
              <MapPin className="w-4 h-4 mr-1 text-blue-200" />
              <p className="text-sm">
                {weatherData.latitude.toFixed(3)}, {weatherData.longitude.toFixed(3)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
              <div className="flex items-center">
                <Droplets className="w-4 h-4 mr-1 text-blue-200" />
                <span>Humidity: {weatherData.humidity1}%</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1 text-blue-200" />
                <span>Visibility: {weatherData.visibility1} km</span>
              </div>
              <div className="flex items-center">
                <Thermometer className="w-4 h-4 mr-1 text-blue-200" />
                <span>Soil Temp: {weatherData.soilTemperature0cm}°C</span>
              </div>
              <div className="flex items-center">
                <Droplets className="w-4 h-4 mr-1 text-blue-200" />
                <span>Soil Moisture: {weatherData.soilMoisture0to1cm}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WeatherDetailsPage() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [noPlotSelected, setNoPlotSelected] = useState(false)
  const [soilAlerts, setSoilAlerts] = useState([])
  const [weatherAlerts, setWeatherAlerts] = useState([])

  // Get plotId from localStorage
  const plotId = localStorage.getItem("plotId")

  // Function to parse and categorize the weather alerts string
  const parseWeatherAlerts = (alertsString) => {
    if (!alertsString) return { soilAlerts: [], weatherAlerts: [] }

    try {
      // Remove the brackets and split by comma
      const cleanString = alertsString.replace(/^\[|\]$/g, "")
      const alertsArray = cleanString.split(",").map((alert) => alert.trim())

      // First two alerts are soil alerts, next three are weather alerts for each day
      const soilAlertsArray = alertsArray.slice(0, 2)
      const weatherAlertsArray = alertsArray.slice(2, 5)

      return {
        soilAlerts: soilAlertsArray,
        weatherAlerts: weatherAlertsArray,
      }
    } catch (err) {
      console.error("Error parsing weather alerts:", err)
      return { soilAlerts: [], weatherAlerts: [] }
    }
  }

  // Function to determine the appropriate icon for a soil alert
  const getSoilAlertIcon = (alertText) => {
    const alertLower = alertText.toLowerCase()

    if (alertLower.includes("moisture") || alertLower.includes("irrigation") || alertLower.includes("water")) {
      return <Droplets className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
    }

    if (
      alertLower.includes("temperature") ||
      alertLower.includes("hot") ||
      alertLower.includes("cold") ||
      alertLower.includes("heat")
    ) {
      return <Thermometer className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
    }

    // Default icon for other soil alerts
    return <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
  }

  // Function to determine the appropriate icon for a weather alert
  const getWeatherAlertIcon = (alertText, dayIndex) => {
    const alertLower = alertText.toLowerCase()

    if (alertLower.includes("thunderstorm") || alertLower.includes("lightning")) {
      return <CloudLightning className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
    }

    if (alertLower.includes("rain") || alertLower.includes("precipitation")) {
      return <CloudRain className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
    }

    if (alertLower.includes("snow") || alertLower.includes("frost") || alertLower.includes("freezing")) {
      return <CloudSnow className="h-5 w-5 text-blue-200 mr-3 flex-shrink-0" />
    }

    if (alertLower.includes("fog") || alertLower.includes("mist")) {
      return <CloudFog className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
    }

    if (alertLower.includes("wind") || alertLower.includes("gust")) {
      return <Wind className="h-5 w-5 text-teal-500 mr-3 flex-shrink-0" />
    }

    if (alertLower.includes("clear") || alertLower.includes("sunny")) {
      return <Sun className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
    }

    if (alertLower.includes("cloud") || alertLower.includes("overcast") || alertLower.includes("partly")) {
      return <CloudSun className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
    }

    // Default icon for other weather alerts
    return <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true)

        // Check if plotId exists
        if (!plotId) {
          setNoPlotSelected(true)
          setLoading(false)
          return
        }

        // Make API request with the plotId
        const response = await apiClient.post("http://localhost:8080/api/weather/get", {
          plot_id: plotId,
        })

        const data = response.data
        setWeatherData(data)

        // Parse and categorize weather alerts if they exist
        if (data.weatherAlerts) {
          const { soilAlerts, weatherAlerts } = parseWeatherAlerts(data.weatherAlerts)
          setSoilAlerts(soilAlerts)
          setWeatherAlerts(weatherAlerts)
        }

        setError(null)
      } catch (err) {
        console.error("Error fetching weather data:", err)
        setError("Failed to load weather data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [plotId])

  // Helper function to get weather icon based on weather code
  const getWeatherIcon = (code) => {
    // WMO Weather interpretation codes: https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
    if (code < 200) return <Sun className="w-10 h-10 text-yellow-400" />
    if (code < 300) return <CloudFog className="w-10 h-10 text-gray-400" />
    if (code < 400) return <Cloud className="w-10 h-10 text-gray-500" />
    if (code < 600) return <CloudRain className="w-10 h-10 text-blue-400" />
    if (code < 700) return <CloudSnow className="w-10 h-10 text-blue-200" />
    if (code < 800) return <CloudLightning className="w-10 h-10 text-yellow-500" />
    return <Cloud className="w-10 h-10" />
  }

  // Format date from ISO string
  const formatDate = (dateString) => {
    if (!dateString) return ""
    // Check if the date string contains time information
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-gray-500 mx-auto mb-4" />
            <p className="text-gray-600">Loading weather data...</p>
          </div>
        </div>
      </div>
    )
  }

  // No plot selected state
  if (noPlotSelected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <NoPlotSelected />
      </div>
    )
  }

  // Error state (for other errors)
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-10">
          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold text-red-700">Error</h2>
            </div>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mr-3"
            >
              Try Again
            </button>
            <Link to="/land-selection" className="mt-4 inline-block px-4 py-2 text-black hover:text-gray-700">
              Go to Land Selection
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        {/* Current Weather Banner */}
        {weatherData && <CurrentWeatherBanner weatherData={weatherData} todayAlert={weatherAlerts[0]} />}

        <h1 className="text-3xl font-bold mb-6">Weather Details</h1>

        {weatherData && (
          <>
            {/* Soil Alerts Section */}
            {soilAlerts.length > 0 && (
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 mb-8">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-amber-500 mr-2" />
                  <h2 className="text-xl font-semibold text-amber-700">Soil Alerts</h2>
                </div>
                <ul className="space-y-2">
                  {soilAlerts.map((alert, index) => (
                    <li key={index} className="p-3 bg-white rounded border-l-4 border-amber-400 flex items-start">
                      {getSoilAlertIcon(alert)}
                      <span>{alert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 3-Day Forecast with Integrated Weather Alerts */}
            <div className="bg-gray-100 p-6 rounded-xl mb-8">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-gray-700 mr-2" />
                <h2 className="text-xl font-semibold">3-Day Forecast</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Day 1 */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{formatDate(weatherData.forecastDate1)}</h3>
                    {getWeatherIcon(weatherData.weatherCode1)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Temperature</span>
                      <span className="font-medium">{weatherData.tempMean1}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Humidity</span>
                      <span className="font-medium">{weatherData.humidity1}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Visibility</span>
                      <span className="font-medium">{weatherData.visibility1} km</span>
                    </div>
                  </div>
                  {weatherAlerts[0] && (
                    <div className="mt-3 p-2 bg-blue-50 rounded text-sm flex items-start">
                      {getWeatherAlertIcon(weatherAlerts[0], 0)}
                      <span className="text-blue-800">{weatherAlerts[0]}</span>
                    </div>
                  )}
                </div>

                {/* Day 2 */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{formatDate(weatherData.forecastDate2)}</h3>
                    {getWeatherIcon(weatherData.weatherCode2)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Temperature</span>
                      <span className="font-medium">{weatherData.tempMean2}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Humidity</span>
                      <span className="font-medium">{weatherData.humidity2}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Visibility</span>
                      <span className="font-medium">{weatherData.visibility2} km</span>
                    </div>
                  </div>
                  {weatherAlerts[1] && (
                    <div className="mt-3 p-2 bg-blue-50 rounded text-sm flex items-start">
                      {getWeatherAlertIcon(weatherAlerts[1], 1)}
                      <span className="text-blue-800">{weatherAlerts[1]}</span>
                    </div>
                  )}
                </div>

                {/* Day 3 */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{formatDate(weatherData.forecastDate3)}</h3>
                    {getWeatherIcon(weatherData.weatherCode3)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Temperature</span>
                      <span className="font-medium">{weatherData.tempMean3}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Humidity</span>
                      <span className="font-medium">{weatherData.humidity3}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Visibility</span>
                      <span className="font-medium">{weatherData.visibility3} km</span>
                    </div>
                  </div>
                  {weatherAlerts[2] && (
                    <div className="mt-3 p-2 bg-blue-50 rounded text-sm flex items-start">
                      {getWeatherAlertIcon(weatherAlerts[2], 2)}
                      <span className="text-blue-800">{weatherAlerts[2]}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Current Soil Conditions */}
            <div className="bg-gray-100 p-6 rounded-xl mb-8">
              <div className="flex items-center mb-4">
                <Thermometer className="w-6 h-6 text-gray-700 mr-2" />
                <h2 className="text-xl font-semibold">Current Soil Conditions</h2>
              </div>
              <p className="text-gray-500 mb-4">Data as of {formatDate(weatherData.hourlyTime)}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <Thermometer className="w-8 h-8 text-red-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Soil Temperature (Surface)</p>
                      <p className="text-2xl font-bold">{weatherData.soilTemperature0cm}°C</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <Droplets className="w-8 h-8 text-blue-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Soil Moisture (0-1cm)</p>
                      <p className="text-2xl font-bold">{weatherData.soilMoisture0to1cm}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Farming Recommendations */}
            <div className="bg-green-50 p-6 rounded-xl mt-8 border border-green-200">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Farming Recommendations</h2>
              <div className="space-y-3">
                <p className="text-gray-700">
                  Based on the current soil moisture of {weatherData.soilMoisture0to1cm}% and upcoming weather
                  conditions:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {weatherData.soilMoisture0to1cm < 30 && (
                    <li>Consider irrigation in the next 24 hours to prevent crop stress.</li>
                  )}
                  {weatherData.soilTemperature0cm > 25 && (
                    <li>
                      Soil temperature is higher than optimal. Consider adding mulch to regulate soil temperature.
                    </li>
                  )}
                  {weatherAlerts.some((alert) => alert.toLowerCase().includes("thunderstorm")) && (
                    <li>Thunderstorm expected. Secure loose items and prepare for heavy rainfall.</li>
                  )}
                  {weatherData.weatherCode1 >= 400 && weatherData.weatherCode1 < 600 && (
                    <li>Rainfall expected. Consider delaying fertilizer application.</li>
                  )}
                  <li>Next ideal planting window: {formatDate(weatherData.forecastDate2)}</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default WeatherDetailsPage
