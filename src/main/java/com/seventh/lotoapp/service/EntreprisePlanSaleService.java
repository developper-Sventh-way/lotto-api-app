package com.seventh.lotoapp.service;

import com.seventh.lotoapp.service.dto.EntreprisePlanSaleDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.seventh.lotoapp.domain.EntreprisePlanSale}.
 */
public interface EntreprisePlanSaleService {
    /**
     * Save a entreprisePlanSale.
     *
     * @param entreprisePlanSaleDTO the entity to save.
     * @return the persisted entity.
     */
    EntreprisePlanSaleDTO save(EntreprisePlanSaleDTO entreprisePlanSaleDTO);

    /**
     * Updates a entreprisePlanSale.
     *
     * @param entreprisePlanSaleDTO the entity to update.
     * @return the persisted entity.
     */
    EntreprisePlanSaleDTO update(EntreprisePlanSaleDTO entreprisePlanSaleDTO);

    /**
     * Partially updates a entreprisePlanSale.
     *
     * @param entreprisePlanSaleDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<EntreprisePlanSaleDTO> partialUpdate(EntreprisePlanSaleDTO entreprisePlanSaleDTO);

    /**
     * Get all the entreprisePlanSales.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<EntreprisePlanSaleDTO> findAll(Pageable pageable);

    /**
     * Get the "id" entreprisePlanSale.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EntreprisePlanSaleDTO> findOne(Long id);

    /**
     * Delete the "id" entreprisePlanSale.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
