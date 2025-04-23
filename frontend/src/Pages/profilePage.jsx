import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, Package, History, LogOut, ChevronRight, Eye, EyeOff} from "lucide-react";
import Navbar from "../Components/navBar";
import apiClient from "../Utils/apiClient";
import getBaseURL from "../Utils/apiConfig";
import Sidebar from "../Components/sideBar";

function ProfilePage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apiClient.post(getBaseURL() + "/user/detail", {
                    user_id: parseInt(localStorage.getItem("userId"), 10),
                }); // Replace with your API endpoint
                setUserData(response.data);
                localStorage.setItem("userName", response.data.first_name);
                localStorage.setItem("userId", localStorage.getItem("userId"));
                localStorage.setItem("userEmail", response.data.email);
                localStorage.setItem("lastName", response.data.last_name);
               
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        reset(userData); // Reset the form whenever userData changes
    }, [userData, reset]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEdit = (e) => {
        if (e) e.preventDefault();
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        reset(userData); // Reset the form to the original userData
    };

    const onSubmit = (data) => {
        setIsSubmitting(true);

        // Simulate API call
        const updateUserData = async () => {
            try {
            const response = await apiClient.post(getBaseURL() + "/user/update", {
                user_id: parseInt(localStorage.getItem("userId"), 10),
                first_name: data.first_name,
                last_name: data.last_name,
                email: userData.email, 
                password: data.password,
            });
            console.log("User data updated:", response.data);
            window.location.reload();
            setIsEditing(false);
            alert("Profile updated successfully!");
            } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
            } finally {
            setIsSubmitting(false);
            }
        };

        updateUserData();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="md:w-1/4">
                        <Sidebar userData={userData} activePage="profile" />
                    </div>

                    {/* Main Content */}
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            {/* Profile Header */}
                            <div className="flex items-center space-x-4 mb-8">
                                <img
                                    src={"/placeholder.svg"}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h2 className="text-xl font-medium">
                                        {userData?.first_name || "First Name"} {userData?.last_name || "Last Name"}
                                    </h2>
                                    <p className="text-gray-500">{userData?.email || "Email Address"}</p>
                                </div>
                            </div>

                            {/* Profile Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <div className="relative">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    {...register("first_name", { required: "First name is required" })}
                                                    className={`w-full p-3 border ${
                                                        errors.first_name ? "border-red-500" : "border-gray-300"
                                                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                                />
                                            ) : (
                                                <div className="w-full p-3 border border-gray-200 rounded-md bg-gray-50 text-gray-700">
                                                    {userData?.first_name || "First Name"}
                                                </div>
                                            )}
                                            {errors.first_name && <p className="mt-1 text-xs text-red-500">{errors.first_name.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <div className="relative">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    {...register("last_name", { required: "Last name is required" })}
                                                    className={`w-full p-3 border ${
                                                        errors.last_name ? "border-red-500" : "border-gray-300"
                                                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                                />
                                            ) : (
                                                <div className="w-full p-3 border border-gray-200 rounded-md bg-gray-50 text-gray-700">
                                                    {userData?.last_name || "Last Name"}
                                                </div>
                                            )}
                                            {errors.last_name && <p className="mt-1 text-xs text-red-500">{errors.last_name.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <div className="relative">
                                        
                                            <div className="w-full p-3 border border-gray-200 rounded-md bg-gray-50 text-gray-700">
                                                {userData?.email || "Email Address"}
                                            </div>
                                        
                                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <div className="relative">
                                        {isEditing ? (
                                            <>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    {...register("password", {
                                                        required: "Password is required",
                                                        minLength: {
                                                            value: 8,
                                                            message: "Password must be at least 8 characters",
                                                        },
                                                    })}
                                                    className={`w-full p-3 border ${
                                                        errors.password ? "border-red-500" : "border-gray-300"
                                                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                >
                                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                </button>
                                            </>
                                        ) : (
                                            <div className="w-full p-3 border border-gray-200 rounded-md bg-gray-50 text-gray-700">
                                                ••••••••
                                            </div>
                                        )}
                                        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    {isEditing ? (
                                        <>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
                                            >
                                                {isSubmitting ? "Saving..." : "Save Change"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleEdit}
                                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
