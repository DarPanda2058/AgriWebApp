package com.example.backend.Repository;

import com.example.backend.Model.CropRecommendations;
import com.example.backend.Model.LandPlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CropRecommendationRepository extends JpaRepository<CropRecommendations, Long> {
    CropRecommendations findByLandPlot(LandPlot landPlot);
    boolean existsByLandPlot(LandPlot landPlot);

}
