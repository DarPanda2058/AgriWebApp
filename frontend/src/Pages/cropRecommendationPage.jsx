
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import {
  Loader2,
  AlertTriangle,
  Droplets,
  Calendar,
  Clock,
  Leaf,
  Award,
  ChevronDown,
  ChevronUp,
  MapPin,
} from "lucide-react"
import Navbar from "../Components/navBar"
import apiClient from "../Utils/apiClient"
import Footer from "../Components/footer"

function CropRecommendationPage() {
  const [recommendations, setRecommendations] = useState(null)
  const [cropDetails, setCropDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedCrop, setExpandedCrop] = useState(null)

  // Get plotId from URL query parameters
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const plotId = localStorage.getItem("plotId")

  // API function to fetch crop recommendations
  const fetchCropRecommendations = async (plotId) => {
    try {
      // For a real API, uncomment this:
      const response = await apiClient.post("http://localhost:8080/api/crop/recommendation/get", {
        plot_id: plotId 
      })
      return response.data

    } catch (error) {
      console.error("Error fetching crop recommendations:", error)
      throw error
    }
  }

  // API function to fetch crop details
  const fetchCropDetails = async (cropName) => {
    try {
      // For a real API, uncomment this:
      const response = await apiClient.post(`http://localhost:8080/api/crop/get`,{
        name: cropName
      })
      console.log("Response data:", response.data)
      return response.data
      

  
      
    } catch (error) {
      console.error(`Error fetching details for crop ${cropName}:`, error)
      throw error
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch crop recommendations
        const recommendationsData = await fetchCropRecommendations(localStorage.getItem("plotId"))
        setRecommendations(recommendationsData)

        // Get crop names from recommendations
        const cropNames = [recommendationsData.cropName1, recommendationsData.cropName2, recommendationsData.cropName3]

        // Fetch details for each recommended crop
        const detailsPromises = cropNames.map((name) => fetchCropDetails(name))
        const detailsResults = await Promise.all(detailsPromises)

        // Create an object with crop names as keys and details as values
        const cropDetailsMap = {}
        cropNames.forEach((name, index) => {
          cropDetailsMap[name] = detailsResults[index]
        })

        setCropDetails(cropDetailsMap)
        setError(null)
      } catch (err) {
        console.error("Error fetching crop data:", err)
        setError("Failed to load crop recommendations. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (plotId) {
      fetchData()
    } else {
      setError("No plot selected. Please select a plot to view crop recommendations.")
      setLoading(false)
    }
  }, [plotId])

  // Helper function to get water requirement icon count
  const getWaterRequirementIcons = (requirement) => {
    if (requirement.toLowerCase().includes("high")) return 3
    if (requirement.toLowerCase().includes("moderate")) return 2
    return 1
  }

  // Helper function to format the recommendation date
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Helper function to get color based on suitability score
  const getSuitabilityColor = (score) => {
    if (score >= 25) return "bg-green-500"
    if (score >= 15) return "bg-yellow-500"
    return "bg-orange-500"
  }

  // Helper function to get text color based on suitability score
  const getSuitabilityTextColor = (score) => {
    if (score >= 25) return "text-green-700"
    if (score >= 15) return "text-yellow-700"
    return "text-orange-700"
  }

  const calculateProgressWidth = (score) => {
    // Cap the percentage at 100%
    return Math.min((score / 30) * 100, 100) + "%"
  }

  // Helper function to parse planting advice text with line breaks
  const renderPlantingAdvice = (advice) => {
    if (!advice) return null

    // Replace escaped newlines with actual newlines
    const formattedAdvice = advice.replace(/\\n/g, "\n")

    return formattedAdvice.split("\n").map((line, index) => (
      <p key={index} className="mb-1">
        {line}
      </p>
    ))
  }

  // Toggle expanded crop details
  const toggleCropDetails = (cropName) => {
    if (expandedCrop === cropName) {
      setExpandedCrop(null)
    } else {
      setExpandedCrop(cropName)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
          <span className="ml-2 text-lg">Loading crop recommendations...</span>
        </div>
      </div>
    )
  }

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
            {!plotId && (
              <button
                onClick={() => (window.location.href = "/land-selection")}
                className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Go to Land Selection
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Crop Recommendations</h1>

        {recommendations && (
          <>
            {/* Header Information */}
            <div className="bg-gray-100 p-6 rounded-xl mb-8">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-gray-700 mr-2" />
                <h2 className="text-xl font-semibold">Plot Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Plot Name</p>
                  <p className="font-medium">{localStorage.getItem("plotName")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Recommendation Date</p>
                  <p className="font-medium">{formatDate(recommendations.recommendationDate)}</p>
                </div>
              </div>
            </div>

            {/* Top Recommendations */}
            <div className="bg-gray-100 p-6 rounded-xl mb-8">
              <div className="flex items-center mb-6">
                <Award className="w-6 h-6 text-gray-700 mr-2" />
                <h2 className="text-xl font-semibold">Top Recommended Crops</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Crop 1 */}
                <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold capitalize">{recommendations.cropName1}</h3>
                    <div className="flex items-center">
                      <span className={`font-bold mr-2 ${getSuitabilityTextColor(recommendations.suitabilityScore1)}`}>
                        {recommendations.suitabilityScore1}
                      </span>
                      <span className="text-xs text-gray-500">score</span>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${getSuitabilityColor(recommendations.suitabilityScore1)}`}
                      style={{ width: calculateProgressWidth(recommendations.suitabilityScore1) }}
                    ></div>
                  </div>
                  <button
                    onClick={() => toggleCropDetails(recommendations.cropName1)}
                    className="mt-4 flex items-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    {expandedCrop === recommendations.cropName1 ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        View Details
                      </>
                    )}
                  </button>
                </div>

                {/* Crop 2 */}
                <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold capitalize">{recommendations.cropName2}</h3>
                    <div className="flex items-center">
                      <span className={`font-bold mr-2 ${getSuitabilityTextColor(recommendations.suitabilityScore2)}`}>
                        {recommendations.suitabilityScore2}
                      </span>
                      <span className="text-xs text-gray-500">score</span>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${getSuitabilityColor(recommendations.suitabilityScore2)}`}
                      style={{ width: calculateProgressWidth(recommendations.suitabilityScore2) }}
                    ></div>
                  </div>
                  <button
                    onClick={() => toggleCropDetails(recommendations.cropName2)}
                    className="mt-4 flex items-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    {expandedCrop === recommendations.cropName2 ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        View Details
                      </>
                    )}
                  </button>
                </div>

                {/* Crop 3 */}
                <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-500">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold capitalize">{recommendations.cropName3}</h3>
                    <div className="flex items-center">
                      <span className={`font-bold mr-2 ${getSuitabilityTextColor(recommendations.suitabilityScore3)}`}>
                        {recommendations.suitabilityScore3}
                      </span>
                      <span className="text-xs text-gray-500">score</span>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${getSuitabilityColor(recommendations.suitabilityScore3)}`}
                      style={{ width: calculateProgressWidth(recommendations.suitabilityScore3) }}
                    ></div>
                  </div>
                  <button
                    onClick={() => toggleCropDetails(recommendations.cropName3)}
                    className="mt-4 flex items-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    {expandedCrop === recommendations.cropName3 ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        View Details
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Crop Details */}
            {expandedCrop && cropDetails[expandedCrop] && (
              <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8 animate-fadeIn">
                <h2 className="text-2xl font-bold capitalize mb-4">{expandedCrop} Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Planting Season */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-gray-700 mr-2" />
                      <h3 className="font-semibold">Planting Season</h3>
                    </div>
                    <p className="text-gray-700">{cropDetails[expandedCrop].plantingSeason}</p>
                  </div>

                  {/* Growth Duration */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-gray-700 mr-2" />
                      <h3 className="font-semibold">Growth Duration</h3>
                    </div>
                    <p className="text-gray-700">{cropDetails[expandedCrop].growthDuration}</p>
                  </div>

                  {/* Water Requirements */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Droplets className="w-5 h-5 text-gray-700 mr-2" />
                      <h3 className="font-semibold">Water Requirements</h3>
                    </div>
                    <p className="text-gray-700 mb-1">{cropDetails[expandedCrop].waterRequirements}</p>
                    <div className="flex">
                      {[...Array(getWaterRequirementIcons(cropDetails[expandedCrop].waterRequirements))].map(
                        (_, i) => (
                          <Droplets key={i} className="w-4 h-4 text-blue-500 mr-1" />
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/* Planting Advice */}
                <div className="bg-gray-50 p-5 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Leaf className="w-5 h-5 text-gray-700 mr-2" />
                    <h3 className="font-semibold">Planting Advice</h3>
                  </div>
                  <div className="text-gray-700">
                    {renderPlantingAdvice(cropDetails[expandedCrop].plantingAdvises)}
                  </div>
                </div>
              </div>
            )}

            {/* Comparison Table */}
            <div className="bg-gray-100 p-6 rounded-xl mb-8">
              <h2 className="text-xl font-semibold mb-4">Crop Comparison</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Crop
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Suitability Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Planting Season
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Growth Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Water Requirements
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap capitalize font-medium">
                        {recommendations.cropName1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`font-bold mr-2 ${getSuitabilityTextColor(recommendations.suitabilityScore1)}`}
                          >
                            {recommendations.suitabilityScore1}
                          </span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getSuitabilityColor(recommendations.suitabilityScore1)}`}
                              style={{ width: calculateProgressWidth(recommendations.suitabilityScore1) }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {cropDetails[recommendations.cropName1]?.plantingSeason || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {cropDetails[recommendations.cropName1]?.growthDuration || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {cropDetails[recommendations.cropName1]?.waterRequirements || "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap capitalize font-medium">
                        {recommendations.cropName2}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`font-bold mr-2 ${getSuitabilityTextColor(recommendations.suitabilityScore2)}`}
                          >
                            {recommendations.suitabilityScore2}
                          </span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getSuitabilityColor(recommendations.suitabilityScore2)}`}
                              style={{ width: calculateProgressWidth(recommendations.suitabilityScore2) }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {cropDetails[recommendations.cropName2]?.plantingSeason || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {cropDetails[recommendations.cropName2]?.growthDuration || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {cropDetails[recommendations.cropName2]?.waterRequirements || "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap capitalize font-medium">
                        {recommendations.cropName3}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`font-bold mr-2 ${getSuitabilityTextColor(recommendations.suitabilityScore3)}`}
                          >
                            {recommendations.suitabilityScore3}
                          </span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getSuitabilityColor(recommendations.suitabilityScore3)}`}
                              style={{ width: calculateProgressWidth(recommendations.suitabilityScore3) }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {cropDetails[recommendations.cropName3]?.plantingSeason || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {cropDetails[recommendations.cropName3]?.growthDuration || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {cropDetails[recommendations.cropName3]?.waterRequirements || "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Farming Tips</h2>
              <p className="text-gray-700 mb-4">
                These crop recommendations are based on soil analysis, climate data, and historical crop performance for
                your land plot. Consider the following when making your planting decisions:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>The suitability score indicates how well the crop is expected to perform on your land.</li>
                <li>Consider crop rotation to maintain soil health and prevent pest buildup.</li>
                <li>Water requirements may vary based on seasonal rainfall patterns.</li>
                <li>
                  For perennial crops like{" "}
                  {recommendations.cropName1 === "coffee" ||
                  recommendations.cropName2 === "coffee" ||
                  recommendations.cropName3 === "coffee"
                    ? "coffee"
                    : "fruit trees"}
                  , consider the long-term investment and maintenance needs.
                </li>
                <li>Local market demand and prices should also factor into your decision.</li>
              </ul>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default CropRecommendationPage
