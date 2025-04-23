package com.example.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "inventory_items")
public class InventoryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inventoryId;
    private String itemName;
    private double quantity;
    private String unit;
    private String category;

    @CreationTimestamp
    private String updatedDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
}
