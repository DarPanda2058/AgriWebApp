package com.example.backend.Controller;

import com.example.backend.Service.WeatherAlertService;
import com.example.backend.Service.WeatherDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RequestMapping("/api/weather")
@RestController
public class WeatherController {

    @Autowired
    WeatherDataService weatherDataService;
    @Autowired
    WeatherAlertService weatherAlertService;

    @PostMapping("/forecast")
    public ResponseEntity<Object> setForecast(@RequestBody Map<String,Long> id){
        return weatherDataService.saveWeatherDataAndAlerts(id.get("plot_id"));
    }


    @PostMapping("/get")
    public ResponseEntity<Object> getForecast(@RequestBody Map<String,Long> id){
        return weatherDataService.fetchWeatherData(id.get("plot_id"));
    }
}

