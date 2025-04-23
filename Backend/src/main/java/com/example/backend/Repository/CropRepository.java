package com.example.backend.Repository;

import com.example.backend.Model.Crops;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CropRepository extends JpaRepository<Crops, Long> {
    Crops findByCropName(String name);
}
