package com.example.backend.Utils;
import com.example.backend.DTO.SoilDetailsDTO;
import com.example.backend.DTO.SoilDetailsForPrediction;
import com.example.backend.Model.LandPlot;
import com.example.backend.Model.SoilDetails;

import java.util.Map;

public class SoilDataMapper {

    private static double extractNumber(Object value) {
        if (value instanceof String) {
            double parsed = Double.parseDouble(((String) value).replaceAll("[^0-9.]", "").trim());
            return Double.parseDouble(String.format("%.3f", parsed));
        } else if (value instanceof Number) {
            return Double.parseDouble(String.format("%.3f", ((Number) value).doubleValue()));
        }
        return 0.000; // Default if value is missing or unrecognized
    }

    public static SoilDetailsDTO mapToSoilDetailsDTOForModel(Map<String, Object> responseData) {
        SoilDetailsDTO soilDetailsDTO = new SoilDetailsDTO();

        // Extract prediction features
        soilDetailsDTO.setN(extractNumber(responseData.get("total_nitrogen"))*10000);
        soilDetailsDTO.setP(extractNumber(responseData.get("p2o5"))*0.44);
        soilDetailsDTO.setK(extractNumber(responseData.get("potassium"))*0.78);
        soilDetailsDTO.setPh(extractNumber(responseData.get("ph")));
        soilDetailsDTO.setOc(extractNumber(responseData.get("organic_matter"))/1.724);
        soilDetailsDTO.setZn(extractNumber(responseData.get("zinc")));
        soilDetailsDTO.setB(extractNumber(responseData.get("boron")));

        // Extract location details
        soilDetailsDTO.setParentSoil((String) responseData.getOrDefault("parentsoil", "Unknown"));
        soilDetailsDTO.setProvince((String) responseData.getOrDefault("province", "Unknown"));
        soilDetailsDTO.setDistrict((String) responseData.getOrDefault("district", "Unknown"));
        soilDetailsDTO.setPalika((String) responseData.getOrDefault("palika", "Unknown"));

        //Extract Coordinates
        Map<String, Object> coordMap = (Map<String, Object>) responseData.get("coord");

        if (coordMap != null) {
            Object latObj = coordMap.get("lat");
            Object lonObj = coordMap.get("lon");
            if (latObj != null)
                soilDetailsDTO.setLatitude(Double.parseDouble(latObj.toString()));
            if (lonObj != null)
                soilDetailsDTO.setLongitude(Double.parseDouble(lonObj.toString()));
        }

        return soilDetailsDTO;
    }

    public static SoilDetailsForPrediction mapToSoilDetailsPrediction(SoilDetailsDTO soilDetailsDTO) {
        SoilDetailsForPrediction soilDetailsForPrediction = new SoilDetailsForPrediction();

        soilDetailsForPrediction.setN(soilDetailsDTO.getN());
        soilDetailsForPrediction.setP(soilDetailsDTO.getP());
        soilDetailsForPrediction.setK(soilDetailsDTO.getK());
        soilDetailsForPrediction.setPh(soilDetailsDTO.getPh());
        soilDetailsForPrediction.setOc(soilDetailsDTO.getOc());
        soilDetailsForPrediction.setZn(soilDetailsDTO.getZn());
        soilDetailsForPrediction.setB(soilDetailsDTO.getB());

        return soilDetailsForPrediction;
    }

    public static SoilDetails mapToSoilDetails(SoilDetailsDTO soilDetailsDTO, LandPlot landPlot){
        SoilDetails soilDetails = new SoilDetails();
        soilDetails.setN(soilDetailsDTO.getN());
        soilDetails.setP(soilDetailsDTO.getP());
        soilDetails.setK(soilDetailsDTO.getK());
        soilDetails.setPh(soilDetailsDTO.getPh());
        soilDetails.setOc(soilDetailsDTO.getOc());
        soilDetails.setZn(soilDetailsDTO.getZn());
        soilDetails.setB(soilDetailsDTO.getB());

        soilDetails.setParentSoil(soilDetailsDTO.getParentSoil());
        soilDetails.setProvince(soilDetailsDTO.getProvince());
        soilDetails.setDistrict(soilDetailsDTO.getDistrict());
        soilDetails.setPalika(soilDetailsDTO.getPalika());

        soilDetails.setLatitude(soilDetailsDTO.getLatitude());
        soilDetails.setLongitude(soilDetailsDTO.getLongitude());

        soilDetails.setFertilityStatus(soilDetailsDTO.getFertilityStatus());

        soilDetails.setLandPlot(landPlot);

        return soilDetails;
    }

    public static SoilDetailsDTO mapToSoilDetailsDTO(SoilDetails soilDetails){
        SoilDetailsDTO soilDetailsDTO = new SoilDetailsDTO();
        soilDetailsDTO.setPlot_id(soilDetails.getLandPlot().getPlot_id());
        soilDetailsDTO.setN(soilDetails.getN());
        soilDetailsDTO.setP(soilDetails.getP());
        soilDetailsDTO.setK(soilDetails.getK());
        soilDetailsDTO.setPh(soilDetails.getPh());
        soilDetailsDTO.setOc(soilDetails.getOc());
        soilDetailsDTO.setZn(soilDetails.getZn());
        soilDetailsDTO.setB(soilDetails.getB());
        soilDetailsDTO.setParentSoil(soilDetails.getParentSoil());
        soilDetailsDTO.setProvince(soilDetails.getProvince());
        soilDetailsDTO.setDistrict(soilDetails.getDistrict());
        soilDetailsDTO.setPalika(soilDetails.getPalika());
        soilDetailsDTO.setLatitude(soilDetails.getLatitude());
        soilDetailsDTO.setLongitude(soilDetails.getLongitude());
        soilDetailsDTO.setFertilityStatus(soilDetails.getFertilityStatus());

        return soilDetailsDTO;
    }

}
