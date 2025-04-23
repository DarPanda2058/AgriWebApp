package com.example.backend.Service;

import com.example.backend.DTO.LandPlotDTO;
import com.example.backend.Model.LandPlot;
import com.example.backend.Model.Users;
import com.example.backend.Repository.LandRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Utils.LandDataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LandDataService {

    @Autowired
    LandRepository landRepository;

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<Object> fetchLandDetails(Long id) {
        Optional<Users> userTemp = userRepository.findById(Math.toIntExact(id));
        if(userTemp.isPresent()){
            Users user = userTemp.get();
            List<LandPlot> landPlots = landRepository.findByUser(user);
            return ResponseEntity.ok(LandDataMapper.mapToListLandPlotDTO(landPlots));
        } else {
            return ResponseEntity.status(404).body("User not found");
        }

    }


    public ResponseEntity<Object> setLandDetails(LandPlotDTO landPlotDTO) {
        if(landRepository.existsByLatitude(landPlotDTO.getLatitude()) && landRepository.existsByLongitude(landPlotDTO.getLongitude())) {
            return ResponseEntity.status(409).body("Land taken by another user.");
        } else {
            Optional<Users> userTemp = userRepository.findById(Math.toIntExact(landPlotDTO.getUser_id()));
            if(userTemp.isPresent()){
                Users user = userTemp.get();
                LandPlot landPlot = LandDataMapper.mapToLandPlot(landPlotDTO, user);
                landRepository.save(landPlot);
                return ResponseEntity.ok(landPlot.getPlot_id());
            }else{
                return ResponseEntity.status(404).body("User not found");
            }
        }
    }

    public ResponseEntity<Object> deleteLandDetails(Integer plotId) {
        Optional<LandPlot> landPlot = landRepository.findById(plotId);
        if(landPlot.isPresent()){
            landRepository.delete(landPlot.get());
            return ResponseEntity.ok("Land plot deleted successfully");
        }else{
            return ResponseEntity.status(404).body("Land plot not found");
        }
    }
}
