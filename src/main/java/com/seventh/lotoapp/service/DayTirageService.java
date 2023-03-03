package com.seventh.lotoapp.service;

import com.seventh.lotoapp.service.dto.DayTirageDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.seventh.lotoapp.domain.DayTirage}.
 */
public interface DayTirageService {
    /**
     * Save a dayTirage.
     *
     * @param dayTirageDTO the entity to save.
     * @return the persisted entity.
     */
    DayTirageDTO save(DayTirageDTO dayTirageDTO);

    /**
     * Updates a dayTirage.
     *
     * @param dayTirageDTO the entity to update.
     * @return the persisted entity.
     */
    DayTirageDTO update(DayTirageDTO dayTirageDTO);

    /**
     * Partially updates a dayTirage.
     *
     * @param dayTirageDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DayTirageDTO> partialUpdate(DayTirageDTO dayTirageDTO);

    /**
     * Get all the dayTirages.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DayTirageDTO> findAll(Pageable pageable);

    /**
     * Get the "id" dayTirage.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DayTirageDTO> findOne(Long id);

    /**
     * Delete the "id" dayTirage.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
