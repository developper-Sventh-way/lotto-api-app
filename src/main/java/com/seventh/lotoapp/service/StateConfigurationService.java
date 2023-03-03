package com.seventh.lotoapp.service;

import com.seventh.lotoapp.service.dto.StateConfigurationDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.seventh.lotoapp.domain.StateConfiguration}.
 */
public interface StateConfigurationService {
    /**
     * Save a stateConfiguration.
     *
     * @param stateConfigurationDTO the entity to save.
     * @return the persisted entity.
     */
    StateConfigurationDTO save(StateConfigurationDTO stateConfigurationDTO);

    /**
     * Updates a stateConfiguration.
     *
     * @param stateConfigurationDTO the entity to update.
     * @return the persisted entity.
     */
    StateConfigurationDTO update(StateConfigurationDTO stateConfigurationDTO);

    /**
     * Partially updates a stateConfiguration.
     *
     * @param stateConfigurationDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StateConfigurationDTO> partialUpdate(StateConfigurationDTO stateConfigurationDTO);

    /**
     * Get all the stateConfigurations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<StateConfigurationDTO> findAll(Pageable pageable);

    /**
     * Get the "id" stateConfiguration.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StateConfigurationDTO> findOne(Long id);

    /**
     * Delete the "id" stateConfiguration.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
