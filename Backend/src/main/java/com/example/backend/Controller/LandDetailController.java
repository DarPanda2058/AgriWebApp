package com.example.backend.Controller;

import com.example.backend.DTO.LandPlotDTO;
import com.example.backend.Service.LandDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping("/api/land")
@Controller
public class LandDetailController {

    @Autowired
    LandDataService landDataService;

    @PostMapping("/get")
    public ResponseEntity<Object> getLandDetail(@RequestBody Map<String,Long> id){
        return landDataService.fetchLandDetails(id.get("user_id"));
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addLandDetail(@RequestBody LandPlotDTO landPlotDTO){
        return landDataService.setLandDetails(landPlotDTO);
    }

    @PostMapping("/delete")
    public ResponseEntity<Object> deleteLandDetail(@RequestBody Map<String,Integer> id){
        return landDataService.deleteLandDetails(id.get("plot_id"));
    }


}
