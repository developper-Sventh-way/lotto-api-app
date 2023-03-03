package com.seventh.lotoapp.web.rest;

import com.seventh.lotoapp.repository.EntreprisePlanRepository;
import com.seventh.lotoapp.service.EntreprisePlanService;
import com.seventh.lotoapp.service.dto.EntreprisePlanDTO;
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
 * REST controller for managing {@link com.seventh.lotoapp.domain.EntreprisePlan}.
 */
@RestController
@RequestMapping("/api")
public class EntreprisePlanResource {

    private final Logger log = LoggerFactory.getLogger(EntreprisePlanResource.class);

    private static final String ENTITY_NAME = "entreprisePlan";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EntreprisePlanService entreprisePlanService;

    private final EntreprisePlanRepository entreprisePlanRepository;

    public EntreprisePlanResource(EntreprisePlanService entreprisePlanService, EntreprisePlanRepository entreprisePlanRepository) {
        this.entreprisePlanService = entreprisePlanService;
        this.entreprisePlanRepository = entreprisePlanRepository;
    }

    /**
     * {@code POST  /entreprise-plans} : Create a new entreprisePlan.
     *
     * @param entreprisePlanDTO the entreprisePlanDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new entreprisePlanDTO, or with status {@code 400 (Bad Request)} if the entreprisePlan has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/entreprise-plans")
    public ResponseEntity<EntreprisePlanDTO> createEntreprisePlan(@Valid @RequestBody EntreprisePlanDTO entreprisePlanDTO)
        throws URISyntaxException {
        log.debug("REST request to save EntreprisePlan : {}", entreprisePlanDTO);
        if (entreprisePlanDTO.getId() != null) {
            throw new BadRequestAlertException("A new entreprisePlan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EntreprisePlanDTO result = entreprisePlanService.save(entreprisePlanDTO);
        return ResponseEntity
            .created(new URI("/api/entreprise-plans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /entreprise-plans/:id} : Updates an existing entreprisePlan.
     *
     * @param id the id of the entreprisePlanDTO to save.
     * @param entreprisePlanDTO the entreprisePlanDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entreprisePlanDTO,
     * or with status {@code 400 (Bad Request)} if the entreprisePlanDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the entreprisePlanDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/entreprise-plans/{id}")
    public ResponseEntity<EntreprisePlanDTO> updateEntreprisePlan(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody EntreprisePlanDTO entreprisePlanDTO
    ) throws URISyntaxException {
        log.debug("REST request to update EntreprisePlan : {}, {}", id, entreprisePlanDTO);
        if (entreprisePlanDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, entreprisePlanDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!entreprisePlanRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        EntreprisePlanDTO result = entreprisePlanService.update(entreprisePlanDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entreprisePlanDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /entreprise-plans/:id} : Partial updates given fields of an existing entreprisePlan, field will ignore if it is null
     *
     * @param id the id of the entreprisePlanDTO to save.
     * @param entreprisePlanDTO the entreprisePlanDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entreprisePlanDTO,
     * or with status {@code 400 (Bad Request)} if the entreprisePlanDTO is not valid,
     * or with status {@code 404 (Not Found)} if the entreprisePlanDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the entreprisePlanDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/entreprise-plans/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<EntreprisePlanDTO> partialUpdateEntreprisePlan(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody EntreprisePlanDTO entreprisePlanDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update EntreprisePlan partially : {}, {}", id, entreprisePlanDTO);
        if (entreprisePlanDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, entreprisePlanDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!entreprisePlanRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EntreprisePlanDTO> result = entreprisePlanService.partialUpdate(entreprisePlanDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entreprisePlanDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /entreprise-plans} : get all the entreprisePlans.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of entreprisePlans in body.
     */
    @GetMapping("/entreprise-plans")
    public ResponseEntity<List<EntreprisePlanDTO>> getAllEntreprisePlans(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of EntreprisePlans");
        Page<EntreprisePlanDTO> page = entreprisePlanService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /entreprise-plans/:id} : get the "id" entreprisePlan.
     *
     * @param id the id of the entreprisePlanDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the entreprisePlanDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entreprise-plans/{id}")
    public ResponseEntity<EntreprisePlanDTO> getEntreprisePlan(@PathVariable Long id) {
        log.debug("REST request to get EntreprisePlan : {}", id);
        Optional<EntreprisePlanDTO> entreprisePlanDTO = entreprisePlanService.findOne(id);
        return ResponseUtil.wrapOrNotFound(entreprisePlanDTO);
    }

    /**
     * {@code DELETE  /entreprise-plans/:id} : delete the "id" entreprisePlan.
     *
     * @param id the id of the entreprisePlanDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/entreprise-plans/{id}")
    public ResponseEntity<Void> deleteEntreprisePlan(@PathVariable Long id) {
        log.debug("REST request to delete EntreprisePlan : {}", id);
        entreprisePlanService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
