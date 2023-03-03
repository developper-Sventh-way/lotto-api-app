package com.seventh.lotoapp.repository;

import com.seventh.lotoapp.domain.EntreprisePlan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the EntreprisePlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntreprisePlanRepository extends JpaRepository<EntreprisePlan, Long> {}
