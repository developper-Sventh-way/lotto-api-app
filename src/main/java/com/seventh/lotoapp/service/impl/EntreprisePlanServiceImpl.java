package com.seventh.lotoapp.service.impl;

import com.seventh.lotoapp.domain.EntreprisePlan;
import com.seventh.lotoapp.repository.EntreprisePlanRepository;
import com.seventh.lotoapp.service.EntreprisePlanService;
import com.seventh.lotoapp.service.dto.EntreprisePlanDTO;
import com.seventh.lotoapp.service.mapper.EntreprisePlanMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link EntreprisePlan}.
 */
@Service
@Transactional
public class EntreprisePlanServiceImpl implements EntreprisePlanService {

    private final Logger log = LoggerFactory.getLogger(EntreprisePlanServiceImpl.class);

    private final EntreprisePlanRepository entreprisePlanRepository;

    private final EntreprisePlanMapper entreprisePlanMapper;

    public EntreprisePlanServiceImpl(EntreprisePlanRepository entreprisePlanRepository, EntreprisePlanMapper entreprisePlanMapper) {
        this.entreprisePlanRepository = entreprisePlanRepository;
        this.entreprisePlanMapper = entreprisePlanMapper;
    }

    @Override
    public EntreprisePlanDTO save(EntreprisePlanDTO entreprisePlanDTO) {
        log.debug("Request to save EntreprisePlan : {}", entreprisePlanDTO);
        EntreprisePlan entreprisePlan = entreprisePlanMapper.toEntity(entreprisePlanDTO);
        entreprisePlan = entreprisePlanRepository.save(entreprisePlan);
        return entreprisePlanMapper.toDto(entreprisePlan);
    }

    @Override
    public EntreprisePlanDTO update(EntreprisePlanDTO entreprisePlanDTO) {
        log.debug("Request to update EntreprisePlan : {}", entreprisePlanDTO);
        EntreprisePlan entreprisePlan = entreprisePlanMapper.toEntity(entreprisePlanDTO);
        entreprisePlan = entreprisePlanRepository.save(entreprisePlan);
        return entreprisePlanMapper.toDto(entreprisePlan);
    }

    @Override
    public Optional<EntreprisePlanDTO> partialUpdate(EntreprisePlanDTO entreprisePlanDTO) {
        log.debug("Request to partially update EntreprisePlan : {}", entreprisePlanDTO);

        return entreprisePlanRepository
            .findById(entreprisePlanDTO.getId())
            .map(existingEntreprisePlan -> {
                entreprisePlanMapper.partialUpdate(existingEntreprisePlan, entreprisePlanDTO);

                return existingEntreprisePlan;
            })
            .map(entreprisePlanRepository::save)
            .map(entreprisePlanMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EntreprisePlanDTO> findAll(Pageable pageable) {
        log.debug("Request to get all EntreprisePlans");
        return entreprisePlanRepository.findAll(pageable).map(entreprisePlanMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<EntreprisePlanDTO> findOne(Long id) {
        log.debug("Request to get EntreprisePlan : {}", id);
        return entreprisePlanRepository.findById(id).map(entreprisePlanMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete EntreprisePlan : {}", id);
        entreprisePlanRepository.deleteById(id);
    }
}
