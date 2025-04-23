import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../Pages/homePage';
import SignupPage from '../Pages/signUpPage';
import LoginPage from '../Pages/loginPage';
import LandSelectionPage from '../Pages/landSelectionPage';
import ProtectedRoute from './protectedRoute';
import ProfilePage from '../Pages/profilePage';
import InventoryPage from '../Pages/inventoryPage';
import LandHistoryPage from '../Pages/landHistoryPage';
import SoilDetailsPage from '../Pages/soilDetailsPage';
import WeatherDetailsPage from '../Pages/weatherDetailsPage';
import CropRecommendationPage from '../Pages/cropRecommendationPage';

const AppRouter = () => {
    const isAuthenticated = localStorage.getItem("token");
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                
                {!isAuthenticated ? (
                <>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </>
                ) : (
                <>
                    <Route path="/login" element={<Navigate to="/" />} />
                    <Route path="/signup" element={<Navigate to="/" />} />
                </>
                )}
                
                {/* <Route path="*" element={<NotFoundPage />} /> */}

                <Route element = {<ProtectedRoute />}>
                    <Route path="/land-selection" element={<LandSelectionPage />} />
                    <Route path ="/profile" element={<ProfilePage />} />
                    <Route path = "/inventory" element={<InventoryPage />} />
                    <Route path = "/land-history" element={<LandHistoryPage />} />
                    <Route path = "/soil-details" element = {<SoilDetailsPage />} />
                    <Route path = "/weather-details" element = {<WeatherDetailsPage />} />
                    <Route path = "/crop-suggestion" element = {<CropRecommendationPage />} />
                    
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;