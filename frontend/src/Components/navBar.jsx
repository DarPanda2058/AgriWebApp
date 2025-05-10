import { Link } from "react-router-dom"
import { useState } from "react"
import { Menu, X, LogOut, User } from "lucide-react"

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    window.location.href = "/login"; // Redirect to login page after logout
  }

  const isAuthenticated = localStorage.getItem("token"); // Replace with actual authentication logic

  return (
    <nav className="relative bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="font-bold text-lg"><Link to="/">AgriApp</Link></div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex space-x-8">
          <Link to="/land-selection" className="text-gray-800 hover:text-gray-600 transition-colors">
            Land Selection
          </Link>
          <Link to="/soil-details" className="text-gray-800 hover:text-gray-600 transition-colors">
            Soil Details
          </Link>
          <Link to="/weather-details" className="text-gray-800 hover:text-gray-600 transition-colors">
            Weather Details
          </Link>
          <Link to="/crop-suggestion" className="text-gray-800 hover:text-gray-600 transition-colors">
            Crop Suggestion
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
        </button>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <div className="flex items-center space-x-6">
              <Link to="/profile" className="flex items-center text-gray-800 hover:text-gray-600 transition-colors">
                <User size={18} className="mr-2" />
                <span>{localStorage.getItem("userName")}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-800 hover:text-gray-600 transition-colors"
              >
                <LogOut size={18} className="mr-2" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-800 hover:text-gray-600 transition-colors">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu - Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50 w-full">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link to="/crop-suggestion" className="text-gray-800 hover:text-gray-600 py-2 border-b border-gray-100">
              Crop Suggestion
            </Link>
            <Link to="/weather-details" className="text-gray-800 hover:text-gray-600 py-2 border-b border-gray-100">
              Weather Details
            </Link>
            <Link to="/soil-details" className="text-gray-800 hover:text-gray-600 py-2 border-b border-gray-100">
              Soil Details
            </Link>
            <Link to="/land-selection" className="text-gray-800 hover:text-gray-600 py-2 border-b border-gray-100">
              Land Selection
            </Link>
            
            {/* Mobile Auth Section */}
            <div className="flex flex-col space-y-3 pt-2">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="flex items-center text-gray-800 hover:text-gray-600 py-2 border-b border-gray-100">
                    <User size={18} className="mr-2" />
                    <span>Account</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-800 hover:text-gray-600 py-2"
                  >
                    <LogOut size={18} className="mr-2" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-800 hover:text-gray-600">
                    Login
                  </Link>
                  <Link to="/signup" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-center transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar