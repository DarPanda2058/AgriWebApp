package com.example.backend.Repository;

import com.example.backend.Model.LandPlot;
import com.example.backend.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LandRepository extends JpaRepository<LandPlot,Integer> {
    boolean existsById(Integer integer);
    boolean existsByLatitude(Double latitude);
    boolean existsByLongitude(Double longitude);
    List<LandPlot> findByUser(Users user);

    @Query("SELECT lp FROM LandPlot lp WHERE lp.user.user_id = :userId ORDER BY lp.addedDate DESC")
    List<LandPlot> findLatestByUser_id(Long userId);
}
