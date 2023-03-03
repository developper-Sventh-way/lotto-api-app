package com.seventh.lotoapp.web.rest;

import com.seventh.lotoapp.repository.StateConfigurationRepository;
import com.seventh.lotoapp.service.StateConfigurationService;
import com.seventh.lotoapp.service.dto.StateConfigurationDTO;
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
 * REST controller for managing {@link com.seventh.lotoapp.domain.StateConfiguration}.
 */
@RestController
@RequestMapping("/api")
public class StateConfigurationResource {

    private final Logger log = LoggerFactory.getLogger(StateConfigurationResource.class);

    private static final String ENTITY_NAME = "stateConfiguration";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StateConfigurationService stateConfigurationService;

    private final StateConfigurationRepository stateConfigurationRepository;

    public StateConfigurationResource(
        StateConfigurationService stateConfigurationService,
        StateConfigurationRepository stateConfigurationRepository
    ) {
        this.stateConfigurationService = stateConfigurationService;
        this.stateConfigurationRepository = stateConfigurationRepository;
    }

    /**
     * {@code POST  /state-configurations} : Create a new stateConfiguration.
     *
     * @param stateConfigurationDTO the stateConfigurationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new stateConfigurationDTO, or with status {@code 400 (Bad Request)} if the stateConfiguration has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/state-configurations")
    public ResponseEntity<StateConfigurationDTO> createStateConfiguration(@Valid @RequestBody StateConfigurationDTO stateConfigurationDTO)
        throws URISyntaxException {
        log.debug("REST request to save StateConfiguration : {}", stateConfigurationDTO);
        if (stateConfigurationDTO.getId() != null) {
            throw new BadRequestAlertException("A new stateConfiguration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StateConfigurationDTO result = stateConfigurationService.save(stateConfigurationDTO);
        return ResponseEntity
            .created(new URI("/api/state-configurations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /state-configurations/:id} : Updates an existing stateConfiguration.
     *
     * @param id the id of the stateConfigurationDTO to save.
     * @param stateConfigurationDTO the stateConfigurationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stateConfigurationDTO,
     * or with status {@code 400 (Bad Request)} if the stateConfigurationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the stateConfigurationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/state-configurations/{id}")
    public ResponseEntity<StateConfigurationDTO> updateStateConfiguration(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody StateConfigurationDTO stateConfigurationDTO
    ) throws URISyntaxException {
        log.debug("REST request to update StateConfiguration : {}, {}", id, stateConfigurationDTO);
        if (stateConfigurationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, stateConfigurationDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!stateConfigurationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        StateConfigurationDTO result = stateConfigurationService.update(stateConfigurationDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, stateConfigurationDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /state-configurations/:id} : Partial updates given fields of an existing stateConfiguration, field will ignore if it is null
     *
     * @param id the id of the stateConfigurationDTO to save.
     * @param stateConfigurationDTO the stateConfigurationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stateConfigurationDTO,
     * or with status {@code 400 (Bad Request)} if the stateConfigurationDTO is not valid,
     * or with status {@code 404 (Not Found)} if the stateConfigurationDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the stateConfigurationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/state-configurations/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StateConfigurationDTO> partialUpdateStateConfiguration(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody StateConfigurationDTO stateConfigurationDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update StateConfiguration partially : {}, {}", id, stateConfigurationDTO);
        if (stateConfigurationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, stateConfigurationDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!stateConfigurationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StateConfigurationDTO> result = stateConfigurationService.partialUpdate(stateConfigurationDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, stateConfigurationDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /state-configurations} : get all the stateConfigurations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stateConfigurations in body.
     */
    @GetMapping("/state-configurations")
    public ResponseEntity<List<StateConfigurationDTO>> getAllStateConfigurations(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of StateConfigurations");
        Page<StateConfigurationDTO> page = stateConfigurationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /state-configurations/:id} : get the "id" stateConfiguration.
     *
     * @param id the id of the stateConfigurationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the stateConfigurationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/state-configurations/{id}")
    public ResponseEntity<StateConfigurationDTO> getStateConfiguration(@PathVariable Long id) {
        log.debug("REST request to get StateConfiguration : {}", id);
        Optional<StateConfigurationDTO> stateConfigurationDTO = stateConfigurationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(stateConfigurationDTO);
    }

    /**
     * {@code DELETE  /state-configurations/:id} : delete the "id" stateConfiguration.
     *
     * @param id the id of the stateConfigurationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/state-configurations/{id}")
    public ResponseEntity<Void> deleteStateConfiguration(@PathVariable Long id) {
        log.debug("REST request to delete StateConfiguration : {}", id);
        stateConfigurationService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
