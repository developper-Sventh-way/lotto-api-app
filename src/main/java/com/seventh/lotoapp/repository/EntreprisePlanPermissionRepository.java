package com.seventh.lotoapp.repository;

import com.seventh.lotoapp.domain.EntreprisePlanPermission;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the EntreprisePlanPermission entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntreprisePlanPermissionRepository extends JpaRepository<EntreprisePlanPermission, Long> {}
