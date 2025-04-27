package com.example.backend.Controller;

import com.example.backend.DTO.InventoryItemDTO;
import com.example.backend.Service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping("/api/inventory")
@Controller
public class InventoryController {

    @Autowired
    InventoryService inventoryService;

    @PostMapping("/save")
    public ResponseEntity<Object> saveInventory(@RequestBody InventoryItemDTO inventoryItemDTO){
        return inventoryService.saveInventory(inventoryItemDTO);
    }

    @PostMapping("/get")
    public ResponseEntity<Object> getInventory(@RequestBody Map<String, Long> id){
        return inventoryService.getInventory(id.get("user_id"));
    }

    @PostMapping("/update")
    public ResponseEntity<Object> updateInventory(@RequestBody InventoryItemDTO inventoryItemDTO){
        return inventoryService.updateInventory(inventoryItemDTO);
    }

    @PostMapping("/delete")
        public ResponseEntity<Object> deleteInventory(@RequestBody Map<String, Long> id){
            return inventoryService.deleteInventory(id.get("item_id"));
        }
}
