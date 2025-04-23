
import { useState } from "react"
import Navbar from "../Components/navBar"
import Sidebar from "../Components/sideBar"

function InventoryPage() {
  // Mock user data - in a real app, this would come from an API or context
  const [userData] = useState({
    firstName: localStorage.getItem("first_name"),
    lastName: localStorage.getItem("last_name"),
    email: localStorage.getItem("email"),
  })

  // Mock inventory data
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: "Wheat Seeds", quantity: 500, unit: "kg", lastUpdated: "2023-11-01" },
    { id: 2, name: "Fertilizer - NPK", quantity: 200, unit: "kg", lastUpdated: "2023-10-28" },
    { id: 3, name: "Pesticide", quantity: 50, unit: "liters", lastUpdated: "2023-10-15" },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Component */}
          <div className="md:w-1/4">
            <Sidebar userData={userData} activePage="inventory" />
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Inventory Management</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Item Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Unit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Updated
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventoryItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.quantity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.unit}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.lastUpdated}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-blue-600 hover:text-blue-900 mr-4">
                            Edit
                          </a>
                          <a href="#" className="text-red-600 hover:text-red-900">
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Add New Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InventoryPage
