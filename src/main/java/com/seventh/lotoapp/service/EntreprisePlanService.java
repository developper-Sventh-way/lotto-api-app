package com.seventh.lotoapp.service;

import com.seventh.lotoapp.service.dto.EntreprisePlanDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.seventh.lotoapp.domain.EntreprisePlan}.
 */
public interface EntreprisePlanService {
    /**
     * Save a entreprisePlan.
     *
     * @param entreprisePlanDTO the entity to save.
     * @return the persisted entity.
     */
    EntreprisePlanDTO save(EntreprisePlanDTO entreprisePlanDTO);

    /**
     * Updates a entreprisePlan.
     *
     * @param entreprisePlanDTO the entity to update.
     * @return the persisted entity.
     */
    EntreprisePlanDTO update(EntreprisePlanDTO entreprisePlanDTO);

    /**
     * Partially updates a entreprisePlan.
     *
     * @param entreprisePlanDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<EntreprisePlanDTO> partialUpdate(EntreprisePlanDTO entreprisePlanDTO);

    /**
     * Get all the entreprisePlans.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<EntreprisePlanDTO> findAll(Pageable pageable);

    /**
     * Get the "id" entreprisePlan.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EntreprisePlanDTO> findOne(Long id);

    /**
     * Delete the "id" entreprisePlan.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
