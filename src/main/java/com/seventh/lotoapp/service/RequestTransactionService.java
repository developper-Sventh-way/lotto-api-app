package com.seventh.lotoapp.service;

import com.seventh.lotoapp.service.dto.RequestTransactionDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.seventh.lotoapp.domain.RequestTransaction}.
 */
public interface RequestTransactionService {
    /**
     * Save a requestTransaction.
     *
     * @param requestTransactionDTO the entity to save.
     * @return the persisted entity.
     */
    RequestTransactionDTO save(RequestTransactionDTO requestTransactionDTO);

    /**
     * Updates a requestTransaction.
     *
     * @param requestTransactionDTO the entity to update.
     * @return the persisted entity.
     */
    RequestTransactionDTO update(RequestTransactionDTO requestTransactionDTO);

    /**
     * Partially updates a requestTransaction.
     *
     * @param requestTransactionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<RequestTransactionDTO> partialUpdate(RequestTransactionDTO requestTransactionDTO);

    /**
     * Get all the requestTransactions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<RequestTransactionDTO> findAll(Pageable pageable);

    /**
     * Get the "id" requestTransaction.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RequestTransactionDTO> findOne(Long id);

    /**
     * Delete the "id" requestTransaction.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
