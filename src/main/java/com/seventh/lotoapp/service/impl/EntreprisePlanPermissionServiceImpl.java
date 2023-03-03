package com.seventh.lotoapp.service.impl;

import com.seventh.lotoapp.domain.EntreprisePlanPermission;
import com.seventh.lotoapp.repository.EntreprisePlanPermissionRepository;
import com.seventh.lotoapp.service.EntreprisePlanPermissionService;
import com.seventh.lotoapp.service.dto.EntreprisePlanPermissionDTO;
import com.seventh.lotoapp.service.mapper.EntreprisePlanPermissionMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link EntreprisePlanPermission}.
 */
@Service
@Transactional
public class EntreprisePlanPermissionServiceImpl implements EntreprisePlanPermissionService {

    private final Logger log = LoggerFactory.getLogger(EntreprisePlanPermissionServiceImpl.class);

    private final EntreprisePlanPermissionRepository entreprisePlanPermissionRepository;

    private final EntreprisePlanPermissionMapper entreprisePlanPermissionMapper;

    public EntreprisePlanPermissionServiceImpl(
        EntreprisePlanPermissionRepository entreprisePlanPermissionRepository,
        EntreprisePlanPermissionMapper entreprisePlanPermissionMapper
    ) {
        this.entreprisePlanPermissionRepository = entreprisePlanPermissionRepository;
        this.entreprisePlanPermissionMapper = entreprisePlanPermissionMapper;
    }

    @Override
    public EntreprisePlanPermissionDTO save(EntreprisePlanPermissionDTO entreprisePlanPermissionDTO) {
        log.debug("Request to save EntreprisePlanPermission : {}", entreprisePlanPermissionDTO);
        EntreprisePlanPermission entreprisePlanPermission = entreprisePlanPermissionMapper.toEntity(entreprisePlanPermissionDTO);
        entreprisePlanPermission = entreprisePlanPermissionRepository.save(entreprisePlanPermission);
        return entreprisePlanPermissionMapper.toDto(entreprisePlanPermission);
    }

    @Override
    public EntreprisePlanPermissionDTO update(EntreprisePlanPermissionDTO entreprisePlanPermissionDTO) {
        log.debug("Request to update EntreprisePlanPermission : {}", entreprisePlanPermissionDTO);
        EntreprisePlanPermission entreprisePlanPermission = entreprisePlanPermissionMapper.toEntity(entreprisePlanPermissionDTO);
        entreprisePlanPermission = entreprisePlanPermissionRepository.save(entreprisePlanPermission);
        return entreprisePlanPermissionMapper.toDto(entreprisePlanPermission);
    }

    @Override
    public Optional<EntreprisePlanPermissionDTO> partialUpdate(EntreprisePlanPermissionDTO entreprisePlanPermissionDTO) {
        log.debug("Request to partially update EntreprisePlanPermission : {}", entreprisePlanPermissionDTO);

        return entreprisePlanPermissionRepository
            .findById(entreprisePlanPermissionDTO.getId())
            .map(existingEntreprisePlanPermission -> {
                entreprisePlanPermissionMapper.partialUpdate(existingEntreprisePlanPermission, entreprisePlanPermissionDTO);

                return existingEntreprisePlanPermission;
            })
            .map(entreprisePlanPermissionRepository::save)
            .map(entreprisePlanPermissionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EntreprisePlanPermissionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all EntreprisePlanPermissions");
        return entreprisePlanPermissionRepository.findAll(pageable).map(entreprisePlanPermissionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<EntreprisePlanPermissionDTO> findOne(Long id) {
        log.debug("Request to get EntreprisePlanPermission : {}", id);
        return entreprisePlanPermissionRepository.findById(id).map(entreprisePlanPermissionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete EntreprisePlanPermission : {}", id);
        entreprisePlanPermissionRepository.deleteById(id);
    }
}
