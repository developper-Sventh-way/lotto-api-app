package com.seventh.lotoapp.service.impl;

import com.seventh.lotoapp.domain.EntreprisePlanSale;
import com.seventh.lotoapp.repository.EntreprisePlanSaleRepository;
import com.seventh.lotoapp.service.EntreprisePlanSaleService;
import com.seventh.lotoapp.service.dto.EntreprisePlanSaleDTO;
import com.seventh.lotoapp.service.mapper.EntreprisePlanSaleMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link EntreprisePlanSale}.
 */
@Service
@Transactional
public class EntreprisePlanSaleServiceImpl implements EntreprisePlanSaleService {

    private final Logger log = LoggerFactory.getLogger(EntreprisePlanSaleServiceImpl.class);

    private final EntreprisePlanSaleRepository entreprisePlanSaleRepository;

    private final EntreprisePlanSaleMapper entreprisePlanSaleMapper;

    public EntreprisePlanSaleServiceImpl(
        EntreprisePlanSaleRepository entreprisePlanSaleRepository,
        EntreprisePlanSaleMapper entreprisePlanSaleMapper
    ) {
        this.entreprisePlanSaleRepository = entreprisePlanSaleRepository;
        this.entreprisePlanSaleMapper = entreprisePlanSaleMapper;
    }

    @Override
    public EntreprisePlanSaleDTO save(EntreprisePlanSaleDTO entreprisePlanSaleDTO) {
        log.debug("Request to save EntreprisePlanSale : {}", entreprisePlanSaleDTO);
        EntreprisePlanSale entreprisePlanSale = entreprisePlanSaleMapper.toEntity(entreprisePlanSaleDTO);
        entreprisePlanSale = entreprisePlanSaleRepository.save(entreprisePlanSale);
        return entreprisePlanSaleMapper.toDto(entreprisePlanSale);
    }

    @Override
    public EntreprisePlanSaleDTO update(EntreprisePlanSaleDTO entreprisePlanSaleDTO) {
        log.debug("Request to update EntreprisePlanSale : {}", entreprisePlanSaleDTO);
        EntreprisePlanSale entreprisePlanSale = entreprisePlanSaleMapper.toEntity(entreprisePlanSaleDTO);
        entreprisePlanSale = entreprisePlanSaleRepository.save(entreprisePlanSale);
        return entreprisePlanSaleMapper.toDto(entreprisePlanSale);
    }

    @Override
    public Optional<EntreprisePlanSaleDTO> partialUpdate(EntreprisePlanSaleDTO entreprisePlanSaleDTO) {
        log.debug("Request to partially update EntreprisePlanSale : {}", entreprisePlanSaleDTO);

        return entreprisePlanSaleRepository
            .findById(entreprisePlanSaleDTO.getId())
            .map(existingEntreprisePlanSale -> {
                entreprisePlanSaleMapper.partialUpdate(existingEntreprisePlanSale, entreprisePlanSaleDTO);

                return existingEntreprisePlanSale;
            })
            .map(entreprisePlanSaleRepository::save)
            .map(entreprisePlanSaleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EntreprisePlanSaleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all EntreprisePlanSales");
        return entreprisePlanSaleRepository.findAll(pageable).map(entreprisePlanSaleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<EntreprisePlanSaleDTO> findOne(Long id) {
        log.debug("Request to get EntreprisePlanSale : {}", id);
        return entreprisePlanSaleRepository.findById(id).map(entreprisePlanSaleMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete EntreprisePlanSale : {}", id);
        entreprisePlanSaleRepository.deleteById(id);
    }
}
