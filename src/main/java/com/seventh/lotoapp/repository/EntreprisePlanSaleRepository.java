package com.seventh.lotoapp.repository;

import com.seventh.lotoapp.domain.EntreprisePlanSale;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the EntreprisePlanSale entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntreprisePlanSaleRepository extends JpaRepository<EntreprisePlanSale, Long> {}
