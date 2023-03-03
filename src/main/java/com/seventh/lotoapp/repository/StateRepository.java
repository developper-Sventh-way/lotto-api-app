package com.seventh.lotoapp.repository;

import com.seventh.lotoapp.domain.State;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the State entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StateRepository extends JpaRepository<State, Long> {}
