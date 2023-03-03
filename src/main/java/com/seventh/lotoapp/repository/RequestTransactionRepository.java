package com.seventh.lotoapp.repository;

import com.seventh.lotoapp.domain.RequestTransaction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the RequestTransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequestTransactionRepository extends JpaRepository<RequestTransaction, Long> {}
