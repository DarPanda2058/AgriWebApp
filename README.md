# 🌱 AgriWebApp – Smart Farming Assistant

**AgriWebApp** is an intelligent web application designed to assist farmers in optimizing their farming practices using real-time soil analysis, weather data, and crop recommendations powered by machine learning. The platform allows farmers to manage their land, monitor fertility, receive tailored crop suggestions, and track inventory—all from a user-friendly dashboard.

---

## 🚀 Features

### 🌍 Land Selection via Map Interface
Farmers can select and register plots using an interactive map powered by **Leaflet.js**.

### 🧪 Soil Fertility Prediction
Automatically fetches soil nutrient data using external APIs and predicts fertility using a trained **ML model**.

### ☀️ Weather Forecast Integration
Provides daily weather data and hourly soil moisture using **Open-Meteo API**.

### 🌾 AI-Powered Crop Recommendation
Suggests top 3 crops for the land based on soil and weather using **Random Forest model**.

### 📦 Inventory Management
Add, edit, and delete inventory items related to farming (seeds, fertilizers, etc.).

### 🔐 JWT-based Authentication
Secured login system with **token generation** and protected backend routes.

### 📊 Soil and Weather Visualization
Data is shown with **charts and summaries** to help farmers make informed decisions.

---

## 🛠️ Tech Stack

### 🔙 Backend
- **Spring Boot (Java)**
- **Microsoft SQL Server**
- **Spring Security + JWT** for authentication
- REST APIs to handle land, soil, weather, crop, and inventory
- **Python (ML)** for crop recommendation and fertility prediction

### 🔜 Frontend
- **React.js**
- **Tailwind CSS** for UI styling
- **Axios** for API communication
- **Leaflet.js** for interactive map

---

## 🧪 APIs Used

- [🌾 NARC Soil API (Nepal)] – for real-time soil data  
- ☁️ **Open-Meteo API** – for weather and soil moisture forecast

---
## 💡 Future Enhancements
### 📊 Admin dashboard for crop and user management

### ⚠️ Real-time weather alerts with notifications

### 🛒 Integration with local marketplaces for crop selling

### 🌐 Multilingual support for local farmers
