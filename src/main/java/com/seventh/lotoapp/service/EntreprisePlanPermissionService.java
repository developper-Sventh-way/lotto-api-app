package com.seventh.lotoapp.service;

import com.seventh.lotoapp.service.dto.EntreprisePlanPermissionDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.seventh.lotoapp.domain.EntreprisePlanPermission}.
 */
public interface EntreprisePlanPermissionService {
    /**
     * Save a entreprisePlanPermission.
     *
     * @param entreprisePlanPermissionDTO the entity to save.
     * @return the persisted entity.
     */
    EntreprisePlanPermissionDTO save(EntreprisePlanPermissionDTO entreprisePlanPermissionDTO);

    /**
     * Updates a entreprisePlanPermission.
     *
     * @param entreprisePlanPermissionDTO the entity to update.
     * @return the persisted entity.
     */
    EntreprisePlanPermissionDTO update(EntreprisePlanPermissionDTO entreprisePlanPermissionDTO);

    /**
     * Partially updates a entreprisePlanPermission.
     *
     * @param entreprisePlanPermissionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<EntreprisePlanPermissionDTO> partialUpdate(EntreprisePlanPermissionDTO entreprisePlanPermissionDTO);

    /**
     * Get all the entreprisePlanPermissions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<EntreprisePlanPermissionDTO> findAll(Pageable pageable);

    /**
     * Get the "id" entreprisePlanPermission.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EntreprisePlanPermissionDTO> findOne(Long id);

    /**
     * Delete the "id" entreprisePlanPermission.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
