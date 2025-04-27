package com.example.backend.Service;

import com.example.backend.DTO.InventoryItemDTO;
import com.example.backend.Model.InventoryItem;
import com.example.backend.Model.Users;
import com.example.backend.Repository.InventoryRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Utils.InventoryItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    InventoryRepository inventoryRepository;

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<Object> saveInventory(InventoryItemDTO inventoryItemDTO) {
        Optional<Users> userTemp = userRepository.findById(Math.toIntExact(inventoryItemDTO.getUserId()));
        if(userTemp.isPresent()){
            InventoryItem inventoryItem = InventoryItemMapper.toEntity(inventoryItemDTO, userTemp.get());
            inventoryRepository.save(inventoryItem);
            return ResponseEntity.ok("Inventory item saved successfully");
        }else{
            return ResponseEntity.status(404).body("User not found");
        }
    }

    public ResponseEntity<Object> getInventory(Long userId) {
        // Implement the logic to get inventory
        if(userRepository.findById(Math.toIntExact(userId)).isPresent()){
            Users user = userRepository.findById(Math.toIntExact(userId)).get();
            List<InventoryItem> inventoryItems = inventoryRepository.findByUser(user);
            return ResponseEntity.ok(InventoryItemMapper.toListInventoryItemDTO(inventoryItems));
        }
        else {
            return ResponseEntity.status(404).body("User not found");
        }


    }

    public ResponseEntity<Object> updateInventory(InventoryItemDTO inventoryItemDTO) {
        Optional<InventoryItem> inventoryItemOptional = inventoryRepository.findById(inventoryItemDTO.getItemId());
        if (inventoryItemOptional.isPresent()) {
            InventoryItem inventoryItem = inventoryItemOptional.get();
            inventoryItem.setItemName(inventoryItemDTO.getItemName());
            inventoryItem.setQuantity(inventoryItemDTO.getQuantity());
            inventoryItem.setUnit(inventoryItemDTO.getUnit());
            inventoryItem.setCategory(inventoryItemDTO.getCategory());
            inventoryRepository.save(inventoryItem);
            return ResponseEntity.ok("Inventory item updated successfully");
        } else {
            return ResponseEntity.status(404).body("Inventory item not found");
        }
    }

    public ResponseEntity<Object> deleteInventory(Long itemId) {
        Optional<InventoryItem> inventoryItemOptional = inventoryRepository.findById(itemId);
        if (inventoryItemOptional.isPresent()) {
            inventoryRepository.delete(inventoryItemOptional.get());
            return ResponseEntity.ok("Inventory item deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Inventory item not found");
        }
    }
}
