package com.seventh.lotoapp.web.rest;

import com.seventh.lotoapp.repository.EntreprisePlanPermissionRepository;
import com.seventh.lotoapp.service.EntreprisePlanPermissionService;
import com.seventh.lotoapp.service.dto.EntreprisePlanPermissionDTO;
import com.seventh.lotoapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
 * REST controller for managing {@link com.seventh.lotoapp.domain.EntreprisePlanPermission}.
 */
@RestController
@RequestMapping("/api")
public class EntreprisePlanPermissionResource {

    private final Logger log = LoggerFactory.getLogger(EntreprisePlanPermissionResource.class);

    private static final String ENTITY_NAME = "entreprisePlanPermission";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EntreprisePlanPermissionService entreprisePlanPermissionService;

    private final EntreprisePlanPermissionRepository entreprisePlanPermissionRepository;

    public EntreprisePlanPermissionResource(
        EntreprisePlanPermissionService entreprisePlanPermissionService,
        EntreprisePlanPermissionRepository entreprisePlanPermissionRepository
    ) {
        this.entreprisePlanPermissionService = entreprisePlanPermissionService;
        this.entreprisePlanPermissionRepository = entreprisePlanPermissionRepository;
    }

    /**
     * {@code POST  /entreprise-plan-permissions} : Create a new entreprisePlanPermission.
     *
     * @param entreprisePlanPermissionDTO the entreprisePlanPermissionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new entreprisePlanPermissionDTO, or with status {@code 400 (Bad Request)} if the entreprisePlanPermission has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/entreprise-plan-permissions")
    public ResponseEntity<EntreprisePlanPermissionDTO> createEntreprisePlanPermission(
        @RequestBody EntreprisePlanPermissionDTO entreprisePlanPermissionDTO
    ) throws URISyntaxException {
        log.debug("REST request to save EntreprisePlanPermission : {}", entreprisePlanPermissionDTO);
        if (entreprisePlanPermissionDTO.getId() != null) {
            throw new BadRequestAlertException("A new entreprisePlanPermission cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EntreprisePlanPermissionDTO result = entreprisePlanPermissionService.save(entreprisePlanPermissionDTO);
        return ResponseEntity
            .created(new URI("/api/entreprise-plan-permissions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /entreprise-plan-permissions/:id} : Updates an existing entreprisePlanPermission.
     *
     * @param id the id of the entreprisePlanPermissionDTO to save.
     * @param entreprisePlanPermissionDTO the entreprisePlanPermissionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entreprisePlanPermissionDTO,
     * or with status {@code 400 (Bad Request)} if the entreprisePlanPermissionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the entreprisePlanPermissionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/entreprise-plan-permissions/{id}")
    public ResponseEntity<EntreprisePlanPermissionDTO> updateEntreprisePlanPermission(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody EntreprisePlanPermissionDTO entreprisePlanPermissionDTO
    ) throws URISyntaxException {
        log.debug("REST request to update EntreprisePlanPermission : {}, {}", id, entreprisePlanPermissionDTO);
        if (entreprisePlanPermissionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, entreprisePlanPermissionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!entreprisePlanPermissionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        EntreprisePlanPermissionDTO result = entreprisePlanPermissionService.update(entreprisePlanPermissionDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entreprisePlanPermissionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /entreprise-plan-permissions/:id} : Partial updates given fields of an existing entreprisePlanPermission, field will ignore if it is null
     *
     * @param id the id of the entreprisePlanPermissionDTO to save.
     * @param entreprisePlanPermissionDTO the entreprisePlanPermissionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entreprisePlanPermissionDTO,
     * or with status {@code 400 (Bad Request)} if the entreprisePlanPermissionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the entreprisePlanPermissionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the entreprisePlanPermissionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/entreprise-plan-permissions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<EntreprisePlanPermissionDTO> partialUpdateEntreprisePlanPermission(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody EntreprisePlanPermissionDTO entreprisePlanPermissionDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update EntreprisePlanPermission partially : {}, {}", id, entreprisePlanPermissionDTO);
        if (entreprisePlanPermissionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, entreprisePlanPermissionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!entreprisePlanPermissionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EntreprisePlanPermissionDTO> result = entreprisePlanPermissionService.partialUpdate(entreprisePlanPermissionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entreprisePlanPermissionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /entreprise-plan-permissions} : get all the entreprisePlanPermissions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of entreprisePlanPermissions in body.
     */
    @GetMapping("/entreprise-plan-permissions")
    public ResponseEntity<List<EntreprisePlanPermissionDTO>> getAllEntreprisePlanPermissions(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of EntreprisePlanPermissions");
        Page<EntreprisePlanPermissionDTO> page = entreprisePlanPermissionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /entreprise-plan-permissions/:id} : get the "id" entreprisePlanPermission.
     *
     * @param id the id of the entreprisePlanPermissionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the entreprisePlanPermissionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entreprise-plan-permissions/{id}")
    public ResponseEntity<EntreprisePlanPermissionDTO> getEntreprisePlanPermission(@PathVariable Long id) {
        log.debug("REST request to get EntreprisePlanPermission : {}", id);
        Optional<EntreprisePlanPermissionDTO> entreprisePlanPermissionDTO = entreprisePlanPermissionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(entreprisePlanPermissionDTO);
    }

    /**
     * {@code DELETE  /entreprise-plan-permissions/:id} : delete the "id" entreprisePlanPermission.
     *
     * @param id the id of the entreprisePlanPermissionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/entreprise-plan-permissions/{id}")
    public ResponseEntity<Void> deleteEntreprisePlanPermission(@PathVariable Long id) {
        log.debug("REST request to delete EntreprisePlanPermission : {}", id);
        entreprisePlanPermissionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
