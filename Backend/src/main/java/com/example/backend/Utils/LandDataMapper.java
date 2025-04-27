package com.example.backend.Utils;

import com.example.backend.DTO.LandPlotDTO;
import com.example.backend.Model.LandPlot;
import com.example.backend.Model.Users;

import java.util.List;

public class LandDataMapper {

    public static LandPlot mapToLandPlot(LandPlotDTO landPlotDTO, Users user){
        LandPlot landPlot = new LandPlot();

        landPlot.setPlotName(landPlotDTO.getPlotName());
        landPlot.setLatitude(landPlotDTO.getLatitude());
        landPlot.setLongitude(landPlotDTO.getLongitude());
        landPlot.setUser(user);


        return landPlot;
    }

    public static List<LandPlotDTO> mapToListLandPlotDTO(List<LandPlot> landPlots){

        return landPlots.stream().map(plot -> {
            LandPlotDTO dto = new LandPlotDTO();
            dto.setPlot_id(plot.getPlot_id());
            dto.setLatitude(plot.getLatitude());
            dto.setLongitude(plot.getLongitude());
            dto.setPlotName(plot.getPlotName());
            dto.setAddedDate(plot.getAddedDate());
            dto.setUser_id(plot.getUser().getUser_id());
            return dto;
        }).toList();
    }
}
