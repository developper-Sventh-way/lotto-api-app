package com.seventh.lotoapp.web.rest;

import com.seventh.lotoapp.repository.EntreprisePlanSaleRepository;
import com.seventh.lotoapp.service.EntreprisePlanSaleService;
import com.seventh.lotoapp.service.dto.EntreprisePlanSaleDTO;
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
 * REST controller for managing {@link com.seventh.lotoapp.domain.EntreprisePlanSale}.
 */
@RestController
@RequestMapping("/api")
public class EntreprisePlanSaleResource {

    private final Logger log = LoggerFactory.getLogger(EntreprisePlanSaleResource.class);

    private static final String ENTITY_NAME = "entreprisePlanSale";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EntreprisePlanSaleService entreprisePlanSaleService;

    private final EntreprisePlanSaleRepository entreprisePlanSaleRepository;

    public EntreprisePlanSaleResource(
        EntreprisePlanSaleService entreprisePlanSaleService,
        EntreprisePlanSaleRepository entreprisePlanSaleRepository
    ) {
        this.entreprisePlanSaleService = entreprisePlanSaleService;
        this.entreprisePlanSaleRepository = entreprisePlanSaleRepository;
    }

    /**
     * {@code POST  /entreprise-plan-sales} : Create a new entreprisePlanSale.
     *
     * @param entreprisePlanSaleDTO the entreprisePlanSaleDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new entreprisePlanSaleDTO, or with status {@code 400 (Bad Request)} if the entreprisePlanSale has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/entreprise-plan-sales")
    public ResponseEntity<EntreprisePlanSaleDTO> createEntreprisePlanSale(@Valid @RequestBody EntreprisePlanSaleDTO entreprisePlanSaleDTO)
        throws URISyntaxException {
        log.debug("REST request to save EntreprisePlanSale : {}", entreprisePlanSaleDTO);
        if (entreprisePlanSaleDTO.getId() != null) {
            throw new BadRequestAlertException("A new entreprisePlanSale cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EntreprisePlanSaleDTO result = entreprisePlanSaleService.save(entreprisePlanSaleDTO);
        return ResponseEntity
            .created(new URI("/api/entreprise-plan-sales/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /entreprise-plan-sales/:id} : Updates an existing entreprisePlanSale.
     *
     * @param id the id of the entreprisePlanSaleDTO to save.
     * @param entreprisePlanSaleDTO the entreprisePlanSaleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entreprisePlanSaleDTO,
     * or with status {@code 400 (Bad Request)} if the entreprisePlanSaleDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the entreprisePlanSaleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/entreprise-plan-sales/{id}")
    public ResponseEntity<EntreprisePlanSaleDTO> updateEntreprisePlanSale(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody EntreprisePlanSaleDTO entreprisePlanSaleDTO
    ) throws URISyntaxException {
        log.debug("REST request to update EntreprisePlanSale : {}, {}", id, entreprisePlanSaleDTO);
        if (entreprisePlanSaleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, entreprisePlanSaleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!entreprisePlanSaleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        EntreprisePlanSaleDTO result = entreprisePlanSaleService.update(entreprisePlanSaleDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entreprisePlanSaleDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /entreprise-plan-sales/:id} : Partial updates given fields of an existing entreprisePlanSale, field will ignore if it is null
     *
     * @param id the id of the entreprisePlanSaleDTO to save.
     * @param entreprisePlanSaleDTO the entreprisePlanSaleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entreprisePlanSaleDTO,
     * or with status {@code 400 (Bad Request)} if the entreprisePlanSaleDTO is not valid,
     * or with status {@code 404 (Not Found)} if the entreprisePlanSaleDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the entreprisePlanSaleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/entreprise-plan-sales/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<EntreprisePlanSaleDTO> partialUpdateEntreprisePlanSale(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody EntreprisePlanSaleDTO entreprisePlanSaleDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update EntreprisePlanSale partially : {}, {}", id, entreprisePlanSaleDTO);
        if (entreprisePlanSaleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, entreprisePlanSaleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!entreprisePlanSaleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EntreprisePlanSaleDTO> result = entreprisePlanSaleService.partialUpdate(entreprisePlanSaleDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entreprisePlanSaleDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /entreprise-plan-sales} : get all the entreprisePlanSales.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of entreprisePlanSales in body.
     */
    @GetMapping("/entreprise-plan-sales")
    public ResponseEntity<List<EntreprisePlanSaleDTO>> getAllEntreprisePlanSales(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of EntreprisePlanSales");
        Page<EntreprisePlanSaleDTO> page = entreprisePlanSaleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /entreprise-plan-sales/:id} : get the "id" entreprisePlanSale.
     *
     * @param id the id of the entreprisePlanSaleDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the entreprisePlanSaleDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entreprise-plan-sales/{id}")
    public ResponseEntity<EntreprisePlanSaleDTO> getEntreprisePlanSale(@PathVariable Long id) {
        log.debug("REST request to get EntreprisePlanSale : {}", id);
        Optional<EntreprisePlanSaleDTO> entreprisePlanSaleDTO = entreprisePlanSaleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(entreprisePlanSaleDTO);
    }

    /**
     * {@code DELETE  /entreprise-plan-sales/:id} : delete the "id" entreprisePlanSale.
     *
     * @param id the id of the entreprisePlanSaleDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/entreprise-plan-sales/{id}")
    public ResponseEntity<Void> deleteEntreprisePlanSale(@PathVariable Long id) {
        log.debug("REST request to delete EntreprisePlanSale : {}", id);
        entreprisePlanSaleService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
