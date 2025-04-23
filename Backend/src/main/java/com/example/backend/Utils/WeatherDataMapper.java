package com.example.backend.Utils;

import com.example.backend.DTO.WeatherDataDTO;
import com.example.backend.DTO.WeatherDetailsDTO;
import com.example.backend.Model.WeatherDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class WeatherDataMapper {
    public static WeatherDetails mapToWeatherDetails(WeatherDataDTO weatherDataDTO){
        WeatherDetails weatherDetails = new WeatherDetails();

        // Set coordinates
        weatherDetails.setLatitude(weatherDataDTO.getLatitude());
        weatherDetails.setLongitude(weatherDataDTO.getLongitude());

        // Formatters for datetime
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ISO_DATE_TIME;
        DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_DATE;

        // Hourly Data (take first element as latest)
        if (weatherDataDTO.getHourly() != null && !weatherDataDTO.getHourly().time.isEmpty()) {
            weatherDetails.setHourlyTime(LocalDate.parse(weatherDataDTO.getHourly().time.getFirst().substring(0, 10), dateFormatter));
            weatherDetails.setSoilTemperature0cm(weatherDataDTO.getHourly().soil_temperature_0cm.getFirst().floatValue());
            weatherDetails.setSoilMoisture0to1cm(weatherDataDTO.getHourly().soil_moisture_0_to_1cm.getFirst().floatValue());
        }

        // Daily Data (Day 1 to 3)
        if (weatherDataDTO.getDaily() != null && weatherDataDTO.getDaily().time.size() >= 3) {
            // Day 1
            weatherDetails.setForecastDate1(LocalDate.parse(weatherDataDTO.getDaily().time.getFirst(), dateFormatter));
            weatherDetails.setWeatherCode1(weatherDataDTO.getDaily().weather_code.getFirst());
            weatherDetails.setTempMean1(weatherDataDTO.getDaily().temperature_2m_mean.getFirst().floatValue());
            weatherDetails.setHumidity1(weatherDataDTO.getDaily().relative_humidity_2m_mean.getFirst());
            weatherDetails.setVisibility1(weatherDataDTO.getDaily().visibility_mean.getFirst().floatValue());

            // Day 2
            weatherDetails.setForecastDate2(LocalDate.parse(weatherDataDTO.getDaily().time.get(1), dateFormatter));
            weatherDetails.setWeatherCode2(weatherDataDTO.getDaily().weather_code.get(1));
            weatherDetails.setTempMean2(weatherDataDTO.getDaily().temperature_2m_mean.get(1).floatValue());
            weatherDetails.setHumidity2(weatherDataDTO.getDaily().relative_humidity_2m_mean.get(1));
            weatherDetails.setVisibility2(weatherDataDTO.getDaily().visibility_mean.get(1).floatValue());

            // Day 3
            weatherDetails.setForecastDate3(LocalDateTime.parse(weatherDataDTO.getDaily().time.get(2) + "T00:00:00", dateTimeFormatter));
            weatherDetails.setWeatherCode3(weatherDataDTO.getDaily().weather_code.get(2));
            weatherDetails.setTempMean3(weatherDataDTO.getDaily().temperature_2m_mean.get(2).floatValue());
            weatherDetails.setHumidity3(weatherDataDTO.getDaily().relative_humidity_2m_mean.get(2));
            weatherDetails.setVisibility3(weatherDataDTO.getDaily().visibility_mean.get(2).floatValue());
        }

        return weatherDetails;
    }

    public static WeatherDetailsDTO mapToWeatherDetailsDTO(WeatherDetails weatherDetails) {
        WeatherDetailsDTO weatherDetailsDTO = new WeatherDetailsDTO();

        //Set plot id
        weatherDetailsDTO.setPlotId(weatherDetails.getLandPlot().getPlot_id());

        // Set coordinates
        weatherDetailsDTO.setLatitude(weatherDetails.getLatitude());
        weatherDetailsDTO.setLongitude(weatherDetails.getLongitude());

        // Hourly Data (latest)
        weatherDetailsDTO.setHourlyTime(weatherDetails.getHourlyTime());
        weatherDetailsDTO.setSoilTemperature0cm(weatherDetails.getSoilTemperature0cm());
        weatherDetailsDTO.setSoilMoisture0to1cm(weatherDetails.getSoilMoisture0to1cm());

        // Daily Data (Day 1 to 3)
        weatherDetailsDTO.setForecastDate1(weatherDetails.getForecastDate1());
        weatherDetailsDTO.setWeatherCode1(weatherDetails.getWeatherCode1());
        weatherDetailsDTO.setTempMean1(weatherDetails.getTempMean1());
        weatherDetailsDTO.setHumidity1(weatherDetails.getHumidity1());
        weatherDetailsDTO.setVisibility1(weatherDetails.getVisibility1());

        weatherDetailsDTO.setForecastDate2(weatherDetails.getForecastDate2());
        weatherDetailsDTO.setWeatherCode2(weatherDetails.getWeatherCode2());
        weatherDetailsDTO.setTempMean2(weatherDetails.getTempMean2());
        weatherDetailsDTO.setHumidity2(weatherDetails.getHumidity2());
        weatherDetailsDTO.setVisibility2(weatherDetails.getVisibility2());

        weatherDetailsDTO.setForecastDate3(weatherDetails.getForecastDate3());
        weatherDetailsDTO.setWeatherCode3(weatherDetails.getWeatherCode3());
        weatherDetailsDTO.setTempMean3(weatherDetails.getTempMean3());
        weatherDetailsDTO.setHumidity3(weatherDetails.getHumidity3());
        weatherDetailsDTO.setVisibility3(weatherDetails.getVisibility3());

        weatherDetailsDTO.setWeatherAlerts(weatherDetails.getWeatherAlerts());

        return weatherDetailsDTO;
    }
}
