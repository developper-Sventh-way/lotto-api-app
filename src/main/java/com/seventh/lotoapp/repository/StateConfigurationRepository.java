package com.seventh.lotoapp.repository;

import com.seventh.lotoapp.domain.StateConfiguration;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the StateConfiguration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StateConfigurationRepository extends JpaRepository<StateConfiguration, Long> {}
