import { User, Package, History, LogOut, ChevronRight } from "lucide-react"

function Sidebar({ userData, activePage = "profile" }) {
    const handleLogout = () => {
        localStorage.clear(); // Clear local storage
        window.location.href = "/login"; // Redirect to login page after logout
      }
return (
    <div className="bg-white rounded-lg shadow-sm p-6">
        {/* User Profile Header */}
        <div className="flex items-center space-x-3 pb-6 border-b border-gray-100">
            <img src={"/images/user.png"} alt="Profile" className="w-12 h-12 rounded-full" />
            <div>
                <h3 className="font-medium">
                    
                    {userData?.firstName || "Guest"} {userData?.lastName || ""}
                </h3>
                <p className="text-sm text-gray-500">{userData?.email || "No email provided"}</p>
            </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 space-y-2">
            <a
                href="/profile"
                className={`flex items-center justify-between p-3 ${
                    activePage === "profile" ? "bg-gray-50 text-gray-900" : "hover:bg-gray-50 text-gray-700"
                } rounded-md`}
            >
                <div className="flex items-center space-x-3">
                    <User className="w-5 h-5" />
                    <span>My Profile</span>
                </div>
                <ChevronRight className="w-5 h-5" />
            </a>

            <a
                href="/inventory"
                className={`flex items-center justify-between p-3 ${
                    activePage === "inventory" ? "bg-gray-50 text-gray-900" : "hover:bg-gray-50 text-gray-700"
                } rounded-md`}
            >
                <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5" />
                    <span>Inventory</span>
                </div>
                <ChevronRight className="w-5 h-5" />
            </a>

            <a
                href="/land-history"
                className={`flex items-center justify-between p-3 ${
                    activePage === "land-history" ? "bg-gray-50 text-gray-900" : "hover:bg-gray-50 text-gray-700"
                } rounded-md`}
            >
                <div className="flex items-center space-x-3">
                    <History className="w-5 h-5" />
                    <span>Land History</span>
                </div>
                <ChevronRight className="w-5 h-5" />
            </a>

            <button
                onClick={handleLogout}
                className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-md text-gray-700"
            >
                <div className="flex items-center space-x-3">
                    <LogOut className="w-5 h-5" />
                    <span>LogOut</span>
                </div>
            </button>
        </nav>
    </div>
)
}

export default Sidebar