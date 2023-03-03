package com.seventh.lotoapp.service.impl;

import com.seventh.lotoapp.domain.RequestTransaction;
import com.seventh.lotoapp.repository.RequestTransactionRepository;
import com.seventh.lotoapp.service.RequestTransactionService;
import com.seventh.lotoapp.service.dto.RequestTransactionDTO;
import com.seventh.lotoapp.service.mapper.RequestTransactionMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link RequestTransaction}.
 */
@Service
@Transactional
public class RequestTransactionServiceImpl implements RequestTransactionService {

    private final Logger log = LoggerFactory.getLogger(RequestTransactionServiceImpl.class);

    private final RequestTransactionRepository requestTransactionRepository;

    private final RequestTransactionMapper requestTransactionMapper;

    public RequestTransactionServiceImpl(
        RequestTransactionRepository requestTransactionRepository,
        RequestTransactionMapper requestTransactionMapper
    ) {
        this.requestTransactionRepository = requestTransactionRepository;
        this.requestTransactionMapper = requestTransactionMapper;
    }

    @Override
    public RequestTransactionDTO save(RequestTransactionDTO requestTransactionDTO) {
        log.debug("Request to save RequestTransaction : {}", requestTransactionDTO);
        RequestTransaction requestTransaction = requestTransactionMapper.toEntity(requestTransactionDTO);
        requestTransaction = requestTransactionRepository.save(requestTransaction);
        return requestTransactionMapper.toDto(requestTransaction);
    }

    @Override
    public RequestTransactionDTO update(RequestTransactionDTO requestTransactionDTO) {
        log.debug("Request to update RequestTransaction : {}", requestTransactionDTO);
        RequestTransaction requestTransaction = requestTransactionMapper.toEntity(requestTransactionDTO);
        requestTransaction = requestTransactionRepository.save(requestTransaction);
        return requestTransactionMapper.toDto(requestTransaction);
    }

    @Override
    public Optional<RequestTransactionDTO> partialUpdate(RequestTransactionDTO requestTransactionDTO) {
        log.debug("Request to partially update RequestTransaction : {}", requestTransactionDTO);

        return requestTransactionRepository
            .findById(requestTransactionDTO.getId())
            .map(existingRequestTransaction -> {
                requestTransactionMapper.partialUpdate(existingRequestTransaction, requestTransactionDTO);

                return existingRequestTransaction;
            })
            .map(requestTransactionRepository::save)
            .map(requestTransactionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<RequestTransactionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all RequestTransactions");
        return requestTransactionRepository.findAll(pageable).map(requestTransactionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<RequestTransactionDTO> findOne(Long id) {
        log.debug("Request to get RequestTransaction : {}", id);
        return requestTransactionRepository.findById(id).map(requestTransactionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete RequestTransaction : {}", id);
        requestTransactionRepository.deleteById(id);
    }
}
