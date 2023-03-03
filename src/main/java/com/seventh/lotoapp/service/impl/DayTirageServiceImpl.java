package com.seventh.lotoapp.service.impl;

import com.seventh.lotoapp.domain.DayTirage;
import com.seventh.lotoapp.repository.DayTirageRepository;
import com.seventh.lotoapp.service.DayTirageService;
import com.seventh.lotoapp.service.dto.DayTirageDTO;
import com.seventh.lotoapp.service.mapper.DayTirageMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link DayTirage}.
 */
@Service
@Transactional
public class DayTirageServiceImpl implements DayTirageService {

    private final Logger log = LoggerFactory.getLogger(DayTirageServiceImpl.class);

    private final DayTirageRepository dayTirageRepository;

    private final DayTirageMapper dayTirageMapper;

    public DayTirageServiceImpl(DayTirageRepository dayTirageRepository, DayTirageMapper dayTirageMapper) {
        this.dayTirageRepository = dayTirageRepository;
        this.dayTirageMapper = dayTirageMapper;
    }

    @Override
    public DayTirageDTO save(DayTirageDTO dayTirageDTO) {
        log.debug("Request to save DayTirage : {}", dayTirageDTO);
        DayTirage dayTirage = dayTirageMapper.toEntity(dayTirageDTO);
        dayTirage = dayTirageRepository.save(dayTirage);
        return dayTirageMapper.toDto(dayTirage);
    }

    @Override
    public DayTirageDTO update(DayTirageDTO dayTirageDTO) {
        log.debug("Request to update DayTirage : {}", dayTirageDTO);
        DayTirage dayTirage = dayTirageMapper.toEntity(dayTirageDTO);
        dayTirage = dayTirageRepository.save(dayTirage);
        return dayTirageMapper.toDto(dayTirage);
    }

    @Override
    public Optional<DayTirageDTO> partialUpdate(DayTirageDTO dayTirageDTO) {
        log.debug("Request to partially update DayTirage : {}", dayTirageDTO);

        return dayTirageRepository
            .findById(dayTirageDTO.getId())
            .map(existingDayTirage -> {
                dayTirageMapper.partialUpdate(existingDayTirage, dayTirageDTO);

                return existingDayTirage;
            })
            .map(dayTirageRepository::save)
            .map(dayTirageMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DayTirageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all DayTirages");
        return dayTirageRepository.findAll(pageable).map(dayTirageMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DayTirageDTO> findOne(Long id) {
        log.debug("Request to get DayTirage : {}", id);
        return dayTirageRepository.findById(id).map(dayTirageMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete DayTirage : {}", id);
        dayTirageRepository.deleteById(id);
    }
}
