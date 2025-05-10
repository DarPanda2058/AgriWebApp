"use client"

import { useState, useEffect } from "react"
import { X, Plus, Loader2, Pencil, Trash2, AlertTriangle, ShoppingCart } from "lucide-react"
import Navbar from "../Components/navBar"
import Sidebar from "../Components/sideBar"
import apiClient from "../Utils/apiClient"
import getBaseURL from "../Utils/apiConfig"
import { format, parseISO } from "date-fns"

function InventoryPage() {
  // User data from localStorage
  const [userData] = useState({
    firstName: localStorage.getItem("userName"),
    lastName: localStorage.getItem("lastName"),
    email: localStorage.getItem("userEmail"),
  })

  // State to hold inventory data
  const [inventoryItems, setInventoryItems] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  // E-commerce site URL for buying items
  const ecommerceBaseUrl = "https://www.daraz.com.np/catalog/?q="

  // Form state
  const [newItem, setNewItem] = useState({
    itemName: "",
    quantity: "",
    unit: "",
    category: "",
  })

  // Fetch inventory data from backend API
  useEffect(() => {
    fetchInventoryData()
  }, [])

  const fetchInventoryData = async () => {
    try {
      const response = await apiClient.post(getBaseURL() + "/inventory/get", {
        user_id: localStorage.getItem("userId"),
      })
      setInventoryItems(response.data)
    } catch (error) {
      console.error("Error fetching inventory data:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewItem({
      ...newItem,
      [name]: value,
    })
  }

  const validateForm = () => {
    if (!newItem.itemName.trim()) {
      setFormError("Item name is required")
      return false
    }

    if (!newItem.quantity || isNaN(Number(newItem.quantity)) || Number(newItem.quantity) <= 0) {
      setFormError("Quantity must be a positive number")
      return false
    }

    if (!newItem.unit.trim()) {
      setFormError("Unit is required")
      return false
    }

    if (!newItem.category.trim()) {
      setFormError("Category is required")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("")
    setFormSuccess("")

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      let response

      if (editMode) {
        // Update existing item
        response = await apiClient.post(getBaseURL() + "/inventory/update", {
          itemId: selectedItem.itemId,
          itemName: newItem.itemName,
          quantity: Number.parseFloat(newItem.quantity),
          unit: newItem.unit,
          category: newItem.category,
          userId: localStorage.getItem("userId"),
        })
        setFormSuccess("Item updated successfully!")
      } else {
        // Add new item
        response = await apiClient.post(getBaseURL() + "/inventory/save", {
          itemName: newItem.itemName,
          quantity: Number.parseFloat(newItem.quantity),
          unit: newItem.unit,
          category: newItem.category,
          userId: localStorage.getItem("userId"),
        })
        setFormSuccess("Item added successfully!")
      }

      console.log("Response from server:", response.data)

      // Reset form
      setNewItem({
        itemName: "",
        quantity: "",
        unit: "",
        category: "",
      })

      // Refresh inventory data
      fetchInventoryData()

      // Close modal after a short delay
      setTimeout(() => {
        setIsModalOpen(false)
        setFormSuccess("")
        setEditMode(false)
        setSelectedItem(null)
      }, 1500)
    } catch (error) {
      console.error("Error saving inventory item:", error)
      setFormError(error.response?.data?.message || "Failed to save item. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedItem) return

    setIsDeleting(true)

    try {
      await apiClient.post(getBaseURL() + "/inventory/delete", {
        item_id: selectedItem.itemId,
      })

      // Refresh inventory data
      fetchInventoryData()

      // Close delete modal
      setIsDeleteModalOpen(false)
      setSelectedItem(null)
    } catch (error) {
      console.error("Error deleting inventory item:", error)
      alert("Failed to delete item. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }
  const handleBuyItem = (item) => {
    // Format the search query - replace spaces with plus signs
    const searchQuery = item.itemName.replace(/\s+/g, "+")

    // Create the full URL
    const searchUrl = `${ecommerceBaseUrl}${searchQuery}`

    // Open in a new window/tab
    window.open(searchUrl, "_blank")
  }

  const openAddModal = () => {
    setEditMode(false)
    setSelectedItem(null)
    setNewItem({
      itemName: "",
      quantity: "",
      unit: "",
      category: "",
    })
    setIsModalOpen(true)
    setFormError("")
    setFormSuccess("")
  }

  const openEditModal = (item) => {
    setEditMode(true)
    setSelectedItem(item)
    setNewItem({
      itemName: item.itemName,
      quantity: item.quantity.toString(),
      unit: item.unit,
      category: item.category,
    })
    setIsModalOpen(true)
    setFormError("")
    setFormSuccess("")
  }

  const openDeleteModal = (item) => {
    setSelectedItem(item)
    setIsDeleteModalOpen(true)
  }

  const closeModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false)
      setFormError("")
      setFormSuccess("")
      setEditMode(false)
      setSelectedItem(null)
      // Reset form
      setNewItem({
        itemName: "",
        quantity: "",
        unit: "",
        category: "",
      })
    }
  }

  const closeDeleteModal = () => {
    if (!isDeleting) {
      setIsDeleteModalOpen(false)
      setSelectedItem(null)
    }
  }

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
                        Category
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
                    {inventoryItems.length > 0 ? (
                      inventoryItems.map((item) => (
                        <tr key={item.itemId}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.itemName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.quantity}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.unit}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {format(parseISO(item.updatedDate), "MMMM do, yyyy - h:mm a")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                              onClick={() => handleBuyItem(item)}
                              className="text-green-600 hover:text-green-900 mr-4 focus:outline-none"
                              title="Buy this item online"
                            >
                              <span className="flex items-center">
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Buy
                              </span>
                            </button>
                            <button
                              onClick={() => openEditModal(item)}
                              className="text-blue-600 hover:text-blue-900 mr-4 focus:outline-none"
                            >
                              <span className="flex items-center">
                                <Pencil className="w-4 h-4 mr-1" />
                                Edit
                              </span>
                            </button>
                            <button
                              onClick={() => openDeleteModal(item)}
                              className="text-red-600 hover:text-red-900 focus:outline-none"
                            >
                              <span className="flex items-center">
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                          No inventory items found. Add your first item!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <button
                  onClick={openAddModal}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">{editMode ? "Edit Inventory Item" : "Add New Inventory Item"}</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                disabled={isSubmitting}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              {formError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{formError}</div>}

              {formSuccess && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">{formSuccess}</div>
              )}

              <div className="mb-4">
                <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={newItem.itemName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit *
                </label>
                <select
                  id="unit"
                  name="unit"
                  value={newItem.unit}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                  required
                >
                  <option value="">Select a unit</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="g">Grams (g)</option>
                  <option value="l">Liters (l)</option>
                  <option value="ml">Milliliters (ml)</option>
                  <option value="pcs">Pieces (pcs)</option>
                  <option value="bags">Bags</option>
                  <option value="boxes">Boxes</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Seeds">Seeds</option>
                  <option value="Fertilizers">Fertilizers</option>
                  <option value="Pesticides">Pesticides</option>
                  <option value="Tools">Tools</option>
                  <option value="Machinery">Machinery</option>
                  <option value="Harvest">Harvest</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex justify-end pt-2 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {editMode ? "Updating..." : "Saving..."}
                    </>
                  ) : editMode ? (
                    "Update Item"
                  ) : (
                    "Save Item"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                <h3 className="text-lg font-medium">Confirm Deletion</h3>
              </div>
            </div>

            <div className="p-4">
              <p className="mb-4">
                Are you sure you want to delete <span className="font-semibold">{selectedItem.itemName}</span>? This
                action cannot be undone.
              </p>

              <div className="flex justify-end pt-2 border-t">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Item"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InventoryPage
