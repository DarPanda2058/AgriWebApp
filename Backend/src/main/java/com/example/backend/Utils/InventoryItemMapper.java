package com.example.backend.Utils;

import com.example.backend.DTO.InventoryItemDTO;
import com.example.backend.Model.InventoryItem;
import com.example.backend.Model.Users;
import com.example.backend.Repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


public class InventoryItemMapper {


    public static InventoryItem toEntity(InventoryItemDTO inventoryItemDTO, Users user) {
        InventoryItem inventoryItem = new InventoryItem();
        inventoryItem.setItemName(inventoryItemDTO.getItemName());
        inventoryItem.setQuantity(inventoryItemDTO.getQuantity());
        inventoryItem.setUnit(inventoryItemDTO.getUnit());
        inventoryItem.setCategory(inventoryItemDTO.getCategory());
        inventoryItem.setUser(user);
        return inventoryItem;
    }

    public static Object toListInventoryItemDTO(List<InventoryItem> inventoryItems) {
        return inventoryItems.stream().map(item -> {
            InventoryItemDTO dto = new InventoryItemDTO();
            dto.setItemId(item.getInventoryId());
            dto.setItemName(item.getItemName());
            dto.setQuantity(item.getQuantity());
            dto.setUnit(item.getUnit());
            dto.setCategory(item.getCategory());
            dto.setUpdatedDate(item.getUpdatedDate());
            dto.setUserId(item.getUser().getUser_id());
            return dto;
        }).toList();
    }
}
