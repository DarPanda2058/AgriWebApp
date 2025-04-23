package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeatherDataDTO {
    public double latitude;
    public double longitude;
    public HourlyData hourly;
    public DailyData daily;

    public static class HourlyData {
        public List<String> time;
        public List<Double> soil_temperature_0cm;
        public List<Double> soil_moisture_0_to_1cm;
    }

    public static class DailyData {
        public List<String> time;
        public List<Integer> weather_code;
        public List<Double> temperature_2m_mean;
        public List<Integer> relative_humidity_2m_mean;
        public List<Double> visibility_mean;
    }
}
