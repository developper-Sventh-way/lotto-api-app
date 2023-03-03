package com.seventh.lotoapp.service.impl;

import com.seventh.lotoapp.domain.StateConfiguration;
import com.seventh.lotoapp.repository.StateConfigurationRepository;
import com.seventh.lotoapp.service.StateConfigurationService;
import com.seventh.lotoapp.service.dto.StateConfigurationDTO;
import com.seventh.lotoapp.service.mapper.StateConfigurationMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link StateConfiguration}.
 */
@Service
@Transactional
public class StateConfigurationServiceImpl implements StateConfigurationService {

    private final Logger log = LoggerFactory.getLogger(StateConfigurationServiceImpl.class);

    private final StateConfigurationRepository stateConfigurationRepository;

    private final StateConfigurationMapper stateConfigurationMapper;

    public StateConfigurationServiceImpl(
        StateConfigurationRepository stateConfigurationRepository,
        StateConfigurationMapper stateConfigurationMapper
    ) {
        this.stateConfigurationRepository = stateConfigurationRepository;
        this.stateConfigurationMapper = stateConfigurationMapper;
    }

    @Override
    public StateConfigurationDTO save(StateConfigurationDTO stateConfigurationDTO) {
        log.debug("Request to save StateConfiguration : {}", stateConfigurationDTO);
        StateConfiguration stateConfiguration = stateConfigurationMapper.toEntity(stateConfigurationDTO);
        stateConfiguration = stateConfigurationRepository.save(stateConfiguration);
        return stateConfigurationMapper.toDto(stateConfiguration);
    }

    @Override
    public StateConfigurationDTO update(StateConfigurationDTO stateConfigurationDTO) {
        log.debug("Request to update StateConfiguration : {}", stateConfigurationDTO);
        StateConfiguration stateConfiguration = stateConfigurationMapper.toEntity(stateConfigurationDTO);
        stateConfiguration = stateConfigurationRepository.save(stateConfiguration);
        return stateConfigurationMapper.toDto(stateConfiguration);
    }

    @Override
    public Optional<StateConfigurationDTO> partialUpdate(StateConfigurationDTO stateConfigurationDTO) {
        log.debug("Request to partially update StateConfiguration : {}", stateConfigurationDTO);

        return stateConfigurationRepository
            .findById(stateConfigurationDTO.getId())
            .map(existingStateConfiguration -> {
                stateConfigurationMapper.partialUpdate(existingStateConfiguration, stateConfigurationDTO);

                return existingStateConfiguration;
            })
            .map(stateConfigurationRepository::save)
            .map(stateConfigurationMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StateConfigurationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all StateConfigurations");
        return stateConfigurationRepository.findAll(pageable).map(stateConfigurationMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StateConfigurationDTO> findOne(Long id) {
        log.debug("Request to get StateConfiguration : {}", id);
        return stateConfigurationRepository.findById(id).map(stateConfigurationMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete StateConfiguration : {}", id);
        stateConfigurationRepository.deleteById(id);
    }
}
