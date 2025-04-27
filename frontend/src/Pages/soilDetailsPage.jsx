"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { AlertTriangle, Info, Droplets, Leaf, ThermometerSun, MapPin, ArrowRight } from "lucide-react"
import Navbar from "../Components/navBar"
import apiClient from "../Utils/apiClient"
import getBaseURL from "../Utils/apiConfig"
import { Link } from "react-router-dom"

// Fetch soil data from API
const fetchSoilData = async () => {
  try {
    const plotId = localStorage.getItem("plotId")
    if (!plotId) {
      return null
    }

    const response = await apiClient.post(getBaseURL() + "/soil/get", {
      plot_id: plotId,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching soil data:", error)
    return null
  }
}

// No Plot Selected component
const NoPlotSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full overflow-hidden">
        <div className="bg-gray-100 p-6 flex items-center justify-center">
          <MapPin className="h-16 w-16 text-gray-400" />
        </div>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No Land Plot Selected</h2>
          <p className="text-gray-600 mb-6">
            You need to select a land plot before viewing soil details. Please go to the Land Selection page to choose a
            plot or create a new one.
          </p>
          <Link
            to="/land-selection"
            className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Go to Land Selection
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="bg-amber-50 p-4 border-t border-amber-100">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-amber-800 text-sm">
              Soil analysis data is specific to each land plot. You'll be able to view detailed soil information once
              you select a plot.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SoilDetailsPage() {
  const [soilData, setSoilData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [suggestions, setSuggestions] = useState([])
  const [noPlotSelected, setNoPlotSelected] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const plotId = localStorage.getItem("plotId")

      if (!plotId) {
        setNoPlotSelected(true)
        setLoading(false)
        return
      }

      const data = await fetchSoilData()
      if (data) {
        setSoilData(data)

        const newSuggestions = []

        // pH suggestions
        if (data.ph < 6.0) {
          newSuggestions.push({
            type: "warning",
            message: "Soil pH is acidic. Consider adding lime to raise pH for most crops.",
          })
        } else if (data.ph > 7.5) {
          newSuggestions.push({
            type: "warning",
            message: "Soil pH is alkaline. Consider adding sulfur to lower pH for most crops.",
          })
        } else {
          newSuggestions.push({
            type: "info",
            message: "Soil pH is in the optimal range for most crops.",
          })
        }

        // Nitrogen
        if (data.n < 0.2) {
          newSuggestions.push({
            type: "warning",
            message: "Nitrogen levels are low. Consider adding nitrogen-rich fertilizers or planting legumes.",
          })
        }

        // Phosphorus
        if (data.p < 10) {
          newSuggestions.push({
            type: "warning",
            message: "Phosphorus levels are very low. Apply phosphate fertilizers like DAP or SSP.",
          })
        } else if (data.p < 25) {
          newSuggestions.push({
            type: "warning",
            message: "Phosphorus levels are low. Consider bone meal or rock phosphate.",
          })
        } else if (data.p > 80) {
          newSuggestions.push({
            type: "info",
            message: "Phosphorus levels are high. Avoid more to prevent runoff.",
          })
        }

        // Potassium
        if (data.k < 80) {
          newSuggestions.push({
            type: "warning",
            message: "Potassium levels are low. Apply potash fertilizers or wood ash.",
          })
        } else if (data.k < 150) {
          newSuggestions.push({
            type: "info",
            message: "Potassium is moderate. Monitor for deficiency.",
          })
        } else if (data.k > 250) {
          newSuggestions.push({
            type: "info",
            message: "High potassium can interfere with magnesium/calcium uptake.",
          })
        }

        // Zinc
        if (data.zn < 0.5) {
          newSuggestions.push({
            type: "warning",
            message: "Zinc is low. Apply zinc sulfate or chelated zinc.",
          })
        } else if (data.zn > 2.0) {
          newSuggestions.push({
            type: "info",
            message: "Zinc is high. Watch for toxicity.",
          })
        }

        // Boron
        if (data.b < 0.5) {
          newSuggestions.push({
            type: "warning",
            message: "Boron is low. Apply borax or boron-based fertilizers.",
          })
        } else if (data.b > 2.0) {
          newSuggestions.push({
            type: "warning",
            message: "Boron is high. Avoid boron fertilizers and leach soil if needed.",
          })
        }

        // Fertility status
        if (data.fertilityStatus === "Infertile") {
          newSuggestions.push({
            type: "warning",
            message: "Overall fertility is low. Add organic matter and balanced fertilizers.",
          })
        }

        setSuggestions(newSuggestions)
      } else {
        setNoPlotSelected(true)
      }
      setLoading(false)
    }

    getData()
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-600">Loading soil data...</p>
          </div>
        </div>
      </div>
    )
  }

  // No plot selected state
  if (noPlotSelected || !soilData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <NoPlotSelected />
      </div>
    )
  }

  const phData = [
    { name: "pH", value: soilData.ph, optimal: 6.5, min: 0, max: 14 },
    { name: "Organic Carbon", value: soilData.oc, optimal: 2.0, min: 0, max: 5 },
  ]

  // Colors for fertility status
  const getFertilityColor = (status) => {
    switch (status.toLowerCase()) {
      case "fertile":
        return "#4CAF50"
      case "moderately fertile":
        return "#FFC107"
      case "infertile":
        return "#F44336"
      default:
        return "#9E9E9E"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Soil Details</h1>
        <p className="text-gray-600 mb-8">
          Comprehensive analysis of your soil composition and recommendations for optimal farming
        </p>

        {/* Location Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Location Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-600">Province</p>
              <p className="font-medium">{soilData.province}</p>
            </div>
            <div>
              <p className="text-gray-600">District</p>
              <p className="font-medium">{soilData.district}</p>
            </div>
            <div>
              <p className="text-gray-600">Palika</p>
              <p className="font-medium">{soilData.palika}</p>
            </div>
            <div>
              <p className="text-gray-600">Farm Name</p>
              <p className="font-medium">
                {localStorage.getItem("plotName") || "Not Specified"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Parent Soil</p>
              <p className="font-medium">{soilData.parentSoil}</p>
            </div>
            <div>
              <p className="text-gray-600">Fertility Status</p>
              <p className="font-medium" style={{ color: getFertilityColor(soilData.fertilityStatus) }}>
                {soilData.fertilityStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Soil Recommendations</h2>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg flex items-start ${
                  suggestion.type === "warning" ? "bg-amber-50" : "bg-blue-50"
                }`}
              >
                {suggestion.type === "warning" ? (
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                ) : (
                  <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                )}
                <p className={suggestion.type === "warning" ? "text-amber-800" : "text-blue-800"}>
                  {suggestion.message}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Soil Composition Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* pH and Organic Carbon */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">pH & Organic Carbon</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={phData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Current Value" />
                  <Bar dataKey="optimal" fill="#82ca9d" name="Optimal Value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">pH Level</p>
                <p className="text-xl font-medium">{soilData.ph.toFixed(2)}</p>
                <p className="text-xs text-gray-500">
                  {soilData.ph < 6.0 ? "Acidic" : soilData.ph > 7.5 ? "Alkaline" : "Neutral"}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Organic Carbon</p>
                <p className="text-xl font-medium">{soilData.oc.toFixed(2)}%</p>
                <p className="text-xs text-gray-500">
                  {soilData.oc < 1.0 ? "Low" : soilData.oc > 2.0 ? "High" : "Medium"}
                </p>
              </div>
            </div>
          </div>

          {/* Nutrient Composition */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Nutrient Composition</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Nitrogen (N)", value: soilData.n, optimal: 0.3 },
                    { name: "Phosphorus (P)", value: soilData.p, optimal: 30 },
                    { name: "Potassium (K)", value: soilData.k, optimal: 120 },
                    { name: "Zinc (Zn)", value: soilData.zn, optimal: 1.0 },
                    { name: "Boron (B)", value: soilData.b, optimal: 1.0 },
                  ]}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip
                    formatter={(value, name, props) => [`${value.toFixed(2)}`, name]}
                    labelFormatter={(value) => `Nutrient: ${value}`}
                  />
                  <Legend />
                  <Bar dataKey="value" name="Current Level" fill="#8884d8" />
                  <Bar dataKey="optimal" name="Optimal Level" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-2">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Nitrogen (N)</p>
                <p className="text-lg font-medium">{soilData.n.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{soilData.n < 0.2 ? "Low" : "Adequate"}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Phosphorus (P)</p>
                <p className="text-lg font-medium">{soilData.p.toFixed(2)}</p>
                <p className="text-xs text-gray-500">
                  {soilData.p < 10 ? "Very Low" : soilData.p < 25 ? "Low" : soilData.p > 80 ? "High" : "Adequate"}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Potassium (K)</p>
                <p className="text-lg font-medium">{soilData.k.toFixed(2)}</p>
                <p className="text-xs text-gray-500">
                  {soilData.k < 80 ? "Low" : soilData.k < 150 ? "Moderate" : "High"}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Zinc (Zn)</p>
                <p className="text-lg font-medium">{soilData.zn.toFixed(2)}</p>
                <p className="text-xs text-gray-500">
                  {soilData.zn < 0.5 ? "Low" : soilData.zn > 2.0 ? "High" : "Adequate"}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Boron (B)</p>
                <p className="text-lg font-medium">{soilData.b.toFixed(2)}</p>
                <p className="text-xs text-gray-500">
                  {soilData.b < 0.5 ? "Low" : soilData.b > 2.0 ? "High" : "Adequate"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Soil Management Tips */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Soil Management Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Droplets className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="font-medium">Water Management</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Maintain consistent soil moisture. Consider drip irrigation for efficient water use, especially with the
                current soil composition.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Leaf className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="font-medium">Organic Matter</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Add compost or well-rotted manure to improve soil structure, water retention, and nutrient availability.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <ThermometerSun className="h-6 w-6 text-orange-500 mr-2" />
                <h3 className="font-medium">Crop Rotation</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Implement crop rotation to prevent nutrient depletion and reduce pest and disease problems.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SoilDetailsPage
