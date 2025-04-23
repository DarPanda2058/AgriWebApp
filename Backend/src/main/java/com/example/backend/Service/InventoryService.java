package com.example.backend.Service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {
    public ResponseEntity<Object> saveInventory() {
        // Implement the logic to save inventory
        return ResponseEntity.ok("Inventory saved successfully");
    }
}
