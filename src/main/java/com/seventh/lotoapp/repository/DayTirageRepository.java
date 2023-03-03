package com.seventh.lotoapp.repository;

import com.seventh.lotoapp.domain.DayTirage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the DayTirage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DayTirageRepository extends JpaRepository<DayTirage, Long> {}
