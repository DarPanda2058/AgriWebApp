package com.example.backend.Repository;

import com.example.backend.Model.LandPlot;
import com.example.backend.Model.SoilDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoilRepository extends JpaRepository<SoilDetails,Integer> {
    SoilDetails findByLandPlot(LandPlot landPlot);
}
