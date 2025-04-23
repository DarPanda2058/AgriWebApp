package com.example.backend.Service;

import com.example.backend.DTO.SoilDetailsDTO;
import com.example.backend.DTO.SoilDetailsForPrediction;
import com.example.backend.Model.LandPlot;
import com.example.backend.Model.SoilDetails;
import com.example.backend.Repository.LandRepository;
import com.example.backend.Repository.SoilRepository;
import com.example.backend.Utils.SoilDataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Optional;

@Service
public class SoilDataService {

    @Autowired
    FertilityPredictionService fertilityPredictionService;

    @Autowired
    SoilRepository soilRepository;

    @Autowired
    LandRepository landRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<Object> saveSoilDetailAndPrediction(Long id){
        Optional<LandPlot> landPlot = landRepository.findById(Math.toIntExact(id));
        if(landPlot.isEmpty()){
            throw new RuntimeException("Land plot not found");
        }
        SoilDetailsDTO soilDetailsDTO = fetchSoilData(landPlot.get().getLatitude(),landPlot.get().getLongitude());
        SoilDetailsForPrediction dataForPrediction = SoilDataMapper.mapToSoilDetailsPrediction(soilDetailsDTO);
        String prediction = fertilityPredictionService.predictFertility(dataForPrediction).toString();
        soilDetailsDTO.setFertilityStatus(prediction);
        soilRepository.save(SoilDataMapper.mapToSoilDetails(soilDetailsDTO,landPlot.get()));

        return ResponseEntity.status(201).body(soilDetailsDTO);
    }

    public SoilDetailsDTO fetchSoilData(double lat, double lon) {
        String API_URL = "https://soil.narc.gov.np/soil/api/";
        String url = API_URL + "?lat=" + lat + "&lon=" + lon;

        Map<String, Object> response = restTemplate.getForObject(url,Map.class);
        System.out.println(response);
        if (response == null) {
            throw new RuntimeException("Failed to fetch soil data.");
        }
        else if(response.containsKey("result")){
            throw new RuntimeException("The Data for this area is not listed for now. Sorry for the inconvenience");
        }

        return SoilDataMapper.mapToSoilDetailsDTOForModel(response);
    }

    public ResponseEntity<Object> fetchSoilDataAndPrediction(Long id) {
        Optional<LandPlot> landPlot = landRepository.findById(Math.toIntExact(id));

        if(landPlot.isEmpty()){
            throw new RuntimeException("Land plot not found");
        }
        SoilDetails soilDetails = soilRepository.findByLandPlot(landPlot.get());

        return ResponseEntity.ok( SoilDataMapper.mapToSoilDetailsDTO(soilDetails));
//        return  ResponseEntity.ok(soilDetails);

    }
}
