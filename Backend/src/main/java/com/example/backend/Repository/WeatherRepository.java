package com.example.backend.Repository;

import com.example.backend.Model.LandPlot;
import com.example.backend.Model.WeatherDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeatherRepository extends JpaRepository<WeatherDetails, Integer> {
    WeatherDetails findByLandPlot(LandPlot landPlot);
}
