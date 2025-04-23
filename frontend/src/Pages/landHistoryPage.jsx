import { useState } from "react"
import { Search } from "lucide-react"
import { format, parseISO } from "date-fns"
import Navbar from "../Components/navBar"
import Sidebar from "../Components/sideBar"
import apiClient from "../Utils/apiClient"
import  getBaseURL  from "../Utils/apiConfig"
import { useEffect } from "react"

function LandHistoryPage() {
  // Mock user data - in a real app, this would come from an API or context
  const [userData] = useState({
    firstName: localStorage.getItem("userName"),
    lastName: localStorage.getItem("lastName"),
    email: localStorage.getItem("userEmail"),
    profileImage: "/placeholder.svg?height=100&width=100",
  })

  const [searchQuery, setSearchQuery] = useState("")

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
            
          }
        } catch (error) {
          console.error("Error fetching land history:", error)
        }
      }
  
      fetchLandHistory()
    }, [])

    const handleViewDetails = (item) => {
      // Handle view details action here
      localStorage.setItem("plotId", item.id)
      localStorage.setItem("plotName", item.title)
      window.location.href = "/soil-details"
    }

    const handleDelete = async (item) => {
      // Handle delete action here
      console.log("Deleting land with ID:", item.id)
      try {
        const response = await apiClient.post(getBaseURL() + "/land/delete", {
          plot_id: item.id,
        })
        if (response.status === 200) {
          // Filter out the deleted item from the state
          setLandHistoryItems((prevItems) => prevItems.filter((i) => i.id !== item.id))
        }
      } catch (error) {
        console.error("Error deleting land:", error)
      }
    }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Component */}
          <div className="md:w-1/4">
            <Sidebar userData={userData} activePage="land-history" />
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-8">
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

              <div className="space-y-6">
                {landHistoryItems.map((item) => (
                  
                  <div key={item.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <span className="text-sm text-gray-500">{format(parseISO(item.date), "MMMM do, yyyy - h:mm a")}</span>
                    </div>
                    <p className="text-gray-600 mb-3">Coordinates: {item.description}</p>
                    <p className="text-gray-700">{item.history}</p>
                    <div className="mt-4 flex space-x-4">
                      <button onClick={() => handleViewDetails(item)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details</button>
                      <button onClick={() => handleDelete(item)} className="text-red-600 hover:text-blue-800 text-sm font-medium">Delete Land</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandHistoryPage
