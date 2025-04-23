package com.example.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "crops")
public class Crops {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cropId;

    private String cropName;
    private String plantingSeason;
    private String growthDuration;
    private String waterRequirements;

    @Column(length = 3000)
    private String plantingAdvises;


}