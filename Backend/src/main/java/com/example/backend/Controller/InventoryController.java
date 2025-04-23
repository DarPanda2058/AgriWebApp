package com.example.backend.Controller;

import com.example.backend.Service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/inventory")
@Controller
public class InventoryController {

    @Autowired
    InventoryService inventoryService;

    @PostMapping("/save")
    public ResponseEntity<Object> saveInventory(){
        return inventoryService.saveInventory();
    }
}
