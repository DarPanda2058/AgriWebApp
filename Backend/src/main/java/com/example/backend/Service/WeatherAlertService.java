package com.example.backend.Service;

import com.example.backend.DTO.WeatherDataDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WeatherAlertService {

    public List<String> getAlerts(WeatherDataDTO weatherDataDTO) {
        List<String> alerts = new ArrayList<>();

        double moisture = weatherDataDTO.hourly.soil_moisture_0_to_1cm.getFirst();
        if (moisture < 0.2)
            alerts.add("Soil moisture is very low. Consider irrigation.");

        double soilTemp = weatherDataDTO.hourly.soil_temperature_0cm.getFirst();
        if (soilTemp > 30)
            alerts.add("Soil temperature is high. Take shade measures.");

        List<Integer> codes = weatherDataDTO.daily.weather_code;

        if (codes == null || codes.isEmpty()) return alerts;

        for (Integer code : codes) {
            if (code == 95 || code == 96 || code == 99)
                alerts.add("Thunderstorm warning in forecast.");

            else if (code == 0)
                alerts.add("Clear Sky.");

            else if (code == 1 || code == 2 || code == 3)
                alerts.add("Mainly clear, partly cloudy, or overcast.");

            else if (code == 45 || code == 48)
                alerts.add("Fog or rime fog expected.");

            else if (code == 51 || code == 53 || code == 55)
                alerts.add("Drizzle expected (light to dense).");

            else if (code == 56 || code == 57)
                alerts.add("Freezing drizzle warning.");

            else if (code == 61 || code == 63 || code == 65)
                alerts.add("Rain expected (slight to heavy).");

            else if (code == 66 || code == 67)
                alerts.add("⚠️ Freezing rain alert (light/heavy).");

            else if (code == 71 || code == 73 || code == 75)
                alerts.add("Snowfall expected (slight to heavy).");

            else if (code == 77)
                alerts.add("Snow grains expected.");

            else if (code == 80 || code == 81 || code == 82)
                alerts.add("Rain showers (light to violent).");

            else if (code == 85 || code == 86)
                alerts.add("Snow showers (slight or heavy).");
        }



        return alerts;
    }


}
