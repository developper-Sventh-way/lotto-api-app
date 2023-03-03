package com.seventh.lotoapp.web.rest;

import com.seventh.lotoapp.repository.RequestTransactionRepository;
import com.seventh.lotoapp.service.RequestTransactionService;
import com.seventh.lotoapp.service.dto.RequestTransactionDTO;
import com.seventh.lotoapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.seventh.lotoapp.domain.RequestTransaction}.
 */
@RestController
@RequestMapping("/api")
public class RequestTransactionResource {

    private final Logger log = LoggerFactory.getLogger(RequestTransactionResource.class);

    private static final String ENTITY_NAME = "requestTransaction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RequestTransactionService requestTransactionService;

    private final RequestTransactionRepository requestTransactionRepository;

    public RequestTransactionResource(
        RequestTransactionService requestTransactionService,
        RequestTransactionRepository requestTransactionRepository
    ) {
        this.requestTransactionService = requestTransactionService;
        this.requestTransactionRepository = requestTransactionRepository;
    }

    /**
     * {@code POST  /request-transactions} : Create a new requestTransaction.
     *
     * @param requestTransactionDTO the requestTransactionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new requestTransactionDTO, or with status {@code 400 (Bad Request)} if the requestTransaction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/request-transactions")
    public ResponseEntity<RequestTransactionDTO> createRequestTransaction(@Valid @RequestBody RequestTransactionDTO requestTransactionDTO)
        throws URISyntaxException {
        log.debug("REST request to save RequestTransaction : {}", requestTransactionDTO);
        if (requestTransactionDTO.getId() != null) {
            throw new BadRequestAlertException("A new requestTransaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RequestTransactionDTO result = requestTransactionService.save(requestTransactionDTO);
        return ResponseEntity
            .created(new URI("/api/request-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /request-transactions/:id} : Updates an existing requestTransaction.
     *
     * @param id the id of the requestTransactionDTO to save.
     * @param requestTransactionDTO the requestTransactionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated requestTransactionDTO,
     * or with status {@code 400 (Bad Request)} if the requestTransactionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the requestTransactionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/request-transactions/{id}")
    public ResponseEntity<RequestTransactionDTO> updateRequestTransaction(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody RequestTransactionDTO requestTransactionDTO
    ) throws URISyntaxException {
        log.debug("REST request to update RequestTransaction : {}, {}", id, requestTransactionDTO);
        if (requestTransactionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, requestTransactionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!requestTransactionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        RequestTransactionDTO result = requestTransactionService.update(requestTransactionDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, requestTransactionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /request-transactions/:id} : Partial updates given fields of an existing requestTransaction, field will ignore if it is null
     *
     * @param id the id of the requestTransactionDTO to save.
     * @param requestTransactionDTO the requestTransactionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated requestTransactionDTO,
     * or with status {@code 400 (Bad Request)} if the requestTransactionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the requestTransactionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the requestTransactionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/request-transactions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<RequestTransactionDTO> partialUpdateRequestTransaction(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody RequestTransactionDTO requestTransactionDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update RequestTransaction partially : {}, {}", id, requestTransactionDTO);
        if (requestTransactionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, requestTransactionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!requestTransactionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<RequestTransactionDTO> result = requestTransactionService.partialUpdate(requestTransactionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, requestTransactionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /request-transactions} : get all the requestTransactions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of requestTransactions in body.
     */
    @GetMapping("/request-transactions")
    public ResponseEntity<List<RequestTransactionDTO>> getAllRequestTransactions(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of RequestTransactions");
        Page<RequestTransactionDTO> page = requestTransactionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /request-transactions/:id} : get the "id" requestTransaction.
     *
     * @param id the id of the requestTransactionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the requestTransactionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/request-transactions/{id}")
    public ResponseEntity<RequestTransactionDTO> getRequestTransaction(@PathVariable Long id) {
        log.debug("REST request to get RequestTransaction : {}", id);
        Optional<RequestTransactionDTO> requestTransactionDTO = requestTransactionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(requestTransactionDTO);
    }

    /**
     * {@code DELETE  /request-transactions/:id} : delete the "id" requestTransaction.
     *
     * @param id the id of the requestTransactionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/request-transactions/{id}")
    public ResponseEntity<Void> deleteRequestTransaction(@PathVariable Long id) {
        log.debug("REST request to delete RequestTransaction : {}", id);
        requestTransactionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
