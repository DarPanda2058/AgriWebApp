package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LandPlotDTO {
    private Long plot_id;
    private double latitude;
    private double longitude;
    private String plotName;
    private LocalDateTime addedDate;
    private Long user_id;
}
