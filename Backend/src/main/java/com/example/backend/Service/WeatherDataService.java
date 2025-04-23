package com.example.backend.Service;

import com.example.backend.DTO.WeatherDataDTO;
import com.example.backend.DTO.WeatherDetailsDTO;
import com.example.backend.Model.LandPlot;
import com.example.backend.Model.WeatherDetails;
import com.example.backend.Repository.LandRepository;
import com.example.backend.Repository.WeatherRepository;
import com.example.backend.Utils.WeatherDataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class WeatherDataService {
    private final RestTemplate restTemplate = new RestTemplate();

    @Autowired
    LandRepository landRepository;

    @Autowired
    WeatherRepository weatherRepository;

    @Autowired
    WeatherAlertService weatherAlertService;

    public ResponseEntity<Object> saveWeatherDataAndAlerts(Long id){

        Optional<LandPlot> landPlot = landRepository.findById(Math.toIntExact(id));

        if (landPlot.isEmpty()) {
            return ResponseEntity.status(404).body("Land Not Found."); // Handle the case where the land plot is not found
        }

        String url = String.format(
                "https://api.open-meteo.com/v1/forecast?latitude=%s&longitude=%s&daily=weather_code,temperature_2m_mean,relative_humidity_2m_mean,visibility_mean&hourly=soil_temperature_0cm,soil_moisture_0_to_1cm&models=best_match&timezone=auto&forecast_days=3&forecast_minutely_15=4&forecast_hours=1",
                landPlot.get().getLatitude(), landPlot.get().getLongitude()
        );

        ResponseEntity<WeatherDataDTO> weatherDataDTOResponseEntity = restTemplate.getForEntity(url,WeatherDataDTO.class);
        if(weatherDataDTOResponseEntity.getStatusCode().isError()) {
            return ResponseEntity.status(weatherDataDTOResponseEntity.getStatusCode()).body("Error fetching weather data.");
        }
        if(weatherDataDTOResponseEntity.getBody() == null) {
            return ResponseEntity.status(500).body("Error: Weather data is null.");
        }
        List<String> weatherAlerts = weatherAlertService.getAlerts(weatherDataDTOResponseEntity.getBody());

        WeatherDetails weatherDetails = WeatherDataMapper.mapToWeatherDetails(weatherDataDTOResponseEntity.getBody());
        weatherDetails.setWeatherAlerts(weatherAlerts.toString());
        weatherDetails.setLandPlot(landPlot.get());
        weatherRepository.save(weatherDetails);
        return ResponseEntity.status(201).body(WeatherDataMapper.mapToWeatherDetailsDTO(weatherDetails));
    }

    public ResponseEntity<Object> fetchWeatherData(Long plotId) {
        Optional<LandPlot> landPlot = landRepository.findById(Math.toIntExact(plotId));

        if (landPlot.isEmpty()) {
            return ResponseEntity.status(404).body(null); // Handle the case where the land plot is not found
        }

        WeatherDetails weatherDetails = weatherRepository.findByLandPlot(landPlot.get());
        if (weatherDetails == null) {
            return ResponseEntity.status(404).body("Weather Details not Found."); // Handle the case where weather details are not found
        }

        WeatherDetailsDTO weatherDetailsDTO = WeatherDataMapper.mapToWeatherDetailsDTO(weatherDetails);
        return ResponseEntity.ok(weatherDetailsDTO);
    }
}
