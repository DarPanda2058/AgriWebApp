package com.example.backend.Repository;

import com.example.backend.Model.InventoryItem;
import com.example.backend.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface InventoryRepository extends JpaRepository<InventoryItem, Long> {

    List<InventoryItem> findByUser(Users user);
}
