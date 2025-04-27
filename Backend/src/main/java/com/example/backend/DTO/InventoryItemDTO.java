package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryItemDTO {
    private Long itemId;
    private String itemName;
    private double quantity;
    private String unit;
    private String category;
    private LocalDateTime updatedDate;
    private Long userId;
}
