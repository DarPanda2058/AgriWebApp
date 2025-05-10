package com.example.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "crop_recommendations")
public class CropRecommendations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recommendationId;

    private String cropName1;
    private String cropName2;
    private String cropName3;
    private double suitabilityScore1;
    private double suitabilityScore2;
    private double suitabilityScore3;

    @OneToOne
    @JoinColumn(name = "plot_id")
    private LandPlot landPlot;

    @UpdateTimestamp
    private LocalDate recommendationDate;
}
