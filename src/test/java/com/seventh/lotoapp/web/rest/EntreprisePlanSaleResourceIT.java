package com.seventh.lotoapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.seventh.lotoapp.IntegrationTest;
import com.seventh.lotoapp.domain.EntreprisePlanSale;
import com.seventh.lotoapp.domain.enumeration.PlanStatut;
import com.seventh.lotoapp.repository.EntreprisePlanSaleRepository;
import com.seventh.lotoapp.service.dto.EntreprisePlanSaleDTO;
import com.seventh.lotoapp.service.mapper.EntreprisePlanSaleMapper;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link EntreprisePlanSaleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EntreprisePlanSaleResourceIT {

    private static final String DEFAULT_TOKEN = "AAAAAAAAAA";
    private static final String UPDATED_TOKEN = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_EXPIRATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EXPIRATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final PlanStatut DEFAULT_STATUT = PlanStatut.Active;
    private static final PlanStatut UPDATED_STATUT = PlanStatut.Expired;

    private static final String ENTITY_API_URL = "/api/entreprise-plan-sales";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EntreprisePlanSaleRepository entreprisePlanSaleRepository;

    @Autowired
    private EntreprisePlanSaleMapper entreprisePlanSaleMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEntreprisePlanSaleMockMvc;

    private EntreprisePlanSale entreprisePlanSale;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntreprisePlanSale createEntity(EntityManager em) {
        EntreprisePlanSale entreprisePlanSale = new EntreprisePlanSale()
            .token(DEFAULT_TOKEN)
            .startDate(DEFAULT_START_DATE)
            .expirateDate(DEFAULT_EXPIRATE_DATE)
            .statut(DEFAULT_STATUT);
        return entreprisePlanSale;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntreprisePlanSale createUpdatedEntity(EntityManager em) {
        EntreprisePlanSale entreprisePlanSale = new EntreprisePlanSale()
            .token(UPDATED_TOKEN)
            .startDate(UPDATED_START_DATE)
            .expirateDate(UPDATED_EXPIRATE_DATE)
            .statut(UPDATED_STATUT);
        return entreprisePlanSale;
    }

    @BeforeEach
    public void initTest() {
        entreprisePlanSale = createEntity(em);
    }

    @Test
    @Transactional
    void createEntreprisePlanSale() throws Exception {
        int databaseSizeBeforeCreate = entreprisePlanSaleRepository.findAll().size();
        // Create the EntreprisePlanSale
        EntreprisePlanSaleDTO entreprisePlanSaleDTO = entreprisePlanSaleMapper.toDto(entreprisePlanSale);
        restEntreprisePlanSaleMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanSaleDTO))
            )
            .andExpect(status().isCreated());

        // Validate the EntreprisePlanSale in the database
        List<EntreprisePlanSale> entreprisePlanSaleList = entreprisePlanSaleRepository.findAll();
        assertThat(entreprisePlanSaleList).hasSize(databaseSizeBeforeCreate + 1);
        EntreprisePlanSale testEntreprisePlanSale = entreprisePlanSaleList.get(entreprisePlanSaleList.size() - 1);
        assertThat(testEntreprisePlanSale.getToken()).isEqualTo(DEFAULT_TOKEN);
        assertThat(testEntreprisePlanSale.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testEntreprisePlanSale.getExpirateDate()).isEqualTo(DEFAULT_EXPIRATE_DATE);
        assertThat(testEntreprisePlanSale.getStatut()).isEqualTo(DEFAULT_STATUT);
    }

    @Test
    @Transactional
    void createEntreprisePlanSaleWithExistingId() throws Exception {
        // Create the EntreprisePlanSale with an existing ID
        entreprisePlanSale.setId(1L);
        EntreprisePlanSaleDTO entreprisePlanSaleDTO = entreprisePlanSaleMapper.toDto(entreprisePlanSale);

        int databaseSizeBeforeCreate = entreprisePlanSaleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntreprisePlanSaleMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanSaleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlanSale in the database
        List<EntreprisePlanSale> entreprisePlanSaleList = entreprisePlanSaleRepository.findAll();
        assertThat(entreprisePlanSaleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTokenIsRequired() throws Exception {
        int databaseSizeBeforeTest = entreprisePlanSaleRepository.findAll().size();
        // set the field null
        entreprisePlanSale.setToken(null);

        // Create the EntreprisePlanSale, which fails.
        EntreprisePlanSaleDTO entreprisePlanSaleDTO = entreprisePlanSaleMapper.toDto(entreprisePlanSale);

        restEntreprisePlanSaleMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanSaleDTO))
            )
            .andExpect(status().isBadRequest());

        List<EntreprisePlanSale> entreprisePlanSaleList = entreprisePlanSaleRepository.findAll();
        assertThat(entreprisePlanSaleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkStatutIsRequired() throws Exception {
        int databaseSizeBeforeTest = entreprisePlanSaleRepository.findAll().size();
        // set the field null
        entreprisePlanSale.setStatut(null);

        // Create the EntreprisePlanSale, which fails.
        EntreprisePlanSaleDTO entreprisePlanSaleDTO = entreprisePlanSaleMapper.toDto(entreprisePlanSale);

        restEntreprisePlanSaleMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanSaleDTO))
            )
            .andExpect(status().isBadRequest());

        List<EntreprisePlanSale> entreprisePlanSaleList = entreprisePlanSaleRepository.findAll();
        assertThat(entreprisePlanSaleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEntreprisePlanSales() throws Exception {
        // Initialize the database
        entreprisePlanSaleRepository.saveAndFlush(entreprisePlanSale);

        // Get all the entreprisePlanSaleList
        restEntreprisePlanSaleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entreprisePlanSale.getId().intValue())))
            .andExpect(jsonPath("$.[*].token").value(hasItem(DEFAULT_TOKEN)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].expirateDate").value(hasItem(DEFAULT_EXPIRATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())));
    }

    @Test
    @Transactional
    void getEntreprisePlanSale() throws Exception {
        // Initialize the database
        entreprisePlanSaleRepository.saveAndFlush(entreprisePlanSale);

        // Get the entreprisePlanSale
        restEntreprisePlanSaleMockMvc
            .perform(get(ENTITY_API_URL_ID, entreprisePlanSale.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(entreprisePlanSale.getId().intValue()))
            .andExpect(jsonPath("$.token").value(DEFAULT_TOKEN))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.expirateDate").value(DEFAULT_EXPIRATE_DATE.toString()))
            .andExpect(jsonPath("$.statut").value(DEFAULT_STATUT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingEntreprisePlanSale() throws Exception {
        // Get the entreprisePlanSale
        restEntreprisePlanSaleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingEntreprisePlanSale() throws Exception {
        // Initialize the database
        entreprisePlanSaleRepository.saveAndFlush(entreprisePlanSale);

        int databaseSizeBeforeUpdate = entreprisePlanSaleRepository.findAll().size();

        // Update the entreprisePlanSale
        EntreprisePlanSale updatedEntreprisePlanSale = entreprisePlanSaleRepository.findById(entreprisePlanSale.getId()).get();
        // Disconnect from session so that the updates on updatedEntreprisePlanSale are not directly saved in db
        em.detach(updatedEntreprisePlanSale);
        updatedEntreprisePlanSale
            .token(UPDATED_TOKEN)
            .startDate(UPDATED_START_DATE)
            .expirateDate(UPDATED_EXPIRATE_DATE)
            .statut(UPDATED_STATUT);
        EntreprisePlanSaleDTO entreprisePlanSaleDTO = entreprisePlanSaleMapper.toDto(updatedEntreprisePlanSale);

        restEntreprisePlanSaleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, entreprisePlanSaleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanSaleDTO))
            )
            .andExpect(status().isOk());

        // Validate the EntreprisePlanSale in the database
        List<EntreprisePlanSale> entreprisePlanSaleList = entreprisePlanSaleRepository.findAll();
        assertThat(entreprisePlanSaleList).hasSize(databaseSizeBeforeUpdate);
        EntreprisePlanSale testEntreprisePlanSale = entreprisePlanSaleList.get(entreprisePlanSaleList.size() - 1);
        assertThat(testEntreprisePlanSale.getToken()).isEqualTo(UPDATED_TOKEN);
        assertThat(testEntreprisePlanSale.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testEntreprisePlanSale.getExpirateDate()).isEqualTo(UPDATED_EXPIRATE_DATE);
        assertThat(testEntreprisePlanSale.getStatut()).isEqualTo(UPDATED_STATUT);
    }

    @Test
    @Transactional
    void putNonExistingEntreprisePlanSale() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanSaleRepository.findAll().size();
        entreprisePlanSale.setId(count.incrementAndGet());

        // Create the EntreprisePlanSale
        EntreprisePlanSaleDTO entreprisePlanSaleDTO = entreprisePlanSaleMapper.toDto(entreprisePlanSale);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntreprisePlanSaleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, entreprisePlanSaleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanSaleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlanSale in the database
        List<EntreprisePlanSale> entreprisePlanSaleList = entreprisePlanSaleRepository.findAll();
        assertThat(entreprisePlanSaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEntreprisePlanSale() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanSaleRepository.findAll().size();
        entreprisePlanSale.setId(count.incrementAndGet());

        // Create the EntreprisePlanSale
        EntreprisePlanSaleDTO entreprisePlanSaleDTO = entreprisePlanSaleMapper.toDto(entreprisePlanSale);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntreprisePlanSaleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanSaleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlanSale in the database
        List<EntreprisePlanSale> entreprisePlanSaleList = entreprisePlanSaleRepository.findAll();
        assertThat(entreprisePlanSaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEntreprisePlanSale() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanSaleRepository.findAll().size();
        entreprisePlanSale.setId(count.incrementAndGet());

        // Create the EntreprisePlanSale
        EntreprisePlanSaleDTO entreprisePlanSaleDTO = entreprisePlanSaleMapper.toDto(entreprisePlanSale);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntreprisePlanSaleMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanSaleDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EntreprisePlanSale in the database
        List<EntreprisePlanSale> entreprisePlanSaleList = entreprisePlanSaleRepository.findAll();
        assertThat(entreprisePlanSaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEntreprisePlanSaleWithPatch() throws Exception {
        // Initialize the database
        entreprisePlanSaleRepository.saveAndFlush(entreprisePlanSale);

        int databaseSizeBeforeUpdate = entreprisePlanSaleRepository.findAll().size();

        // Update the entreprisePlanSale using partial update
        EntreprisePlanSale partialUpdatedEntreprisePlanSale = new EntreprisePlanSale();
        partialUpdatedEntreprisePlanSale.setId(entreprisePlanSale.getId());

        partialUpdatedEntreprisePlanSale.token(UPDATED_TOKEN).expirateDate(UPDATED_EXPIRATE_DATE).statut(UPDATED_STATUT);

        restEntreprisePlanSaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEntreprisePlanSale.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEntreprisePlanSale))
            )
            .andExpect(status().isOk());

        // Validate the EntreprisePlanSale in the database
        List<EntreprisePlanSale> entreprisePlanSaleList = entreprisePlanSaleRepository.findAll();
        assertThat(entreprisePlanSaleList).hasSize(databaseSizeBeforeUpdate);
        EntreprisePlanSale testEntreprisePlanSale = entreprisePlanSaleList.get(entreprisePlanSaleList.size() - 1);
        assertThat(testEntreprisePlanSale.getToken()).isEqualTo(UPDATED_TOKEN);
        assertThat(testEntreprisePlanSale.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testEntreprisePlanSale.getExpirateDate()).isEqualTo(UPDATED_EXPIRATE_DATE);
        assertThat(testEntreprisePlanSale.getStatut()).isEqualTo(UPDATED_STATUT);
    }

    @Test
    @Transactional
    void fullUpdateEntreprisePlanSaleWithPatch() throws Exception {
        // Initialize the database
        entreprisePlanSaleRepository.saveAndFlush(entreprisePlanSale);

        int databaseSizeBeforeUpdate = entreprisePlanSaleRepository.findAll().size();

        // Update the entreprisePlanSale using partial update
        EntreprisePlanSale partialUpdatedEntreprisePlanSale = new EntreprisePlanSale();
        partialUpdatedEntreprisePlanSale.setId(entreprisePlanSale.getId());

        partialUpdatedEntreprisePlanSale
            .token(UPDATED_TOKEN)
            .startDate(UPDATED_START_DATE)
            .expirateDate(UPDATED_EXPIRATE_DATE)
            .statut(UPDATED_STATUT);

        restEntreprisePlanSaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEntreprisePlanSale.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEntreprisePlanSale))
            )
            .andExpect(status().isOk());

        // Validate the EntreprisePlanSale in the database
        List<EntreprisePlanSale> entreprisePlanSaleList = entreprisePlanSaleRepository.findAll();
        assertThat(entreprisePlanSaleList).hasSize(databaseSizeBeforeUpdate);
        EntreprisePlanSale testEntreprisePlanSale = entreprisePlanSaleList.get(entreprisePlanSaleList.size() - 1);
        assertThat(testEntreprisePlanSale.getToken()).isEqualTo(UPDATED_TOKEN);
        assertThat(testEntreprisePlanSale.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testEntreprisePlanSale.getExpirateDate()).isEqualTo(UPDATED_EXPIRATE_DATE);
        assertThat(testEntreprisePlanSale.getStatut()).isEqualTo(UPDATED_STATUT);
    }

    @Test
    @Transactional
    void patchNonExistingEntreprisePlanSale() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanSaleRepository.findAll().size();
        entreprisePlanSale.setId(count.incrementAndGet());

        // Create the EntreprisePlanSale
        EntreprisePlanSaleDTO entreprisePlanSaleDTO = entreprisePlanSaleMapper.toDto(entreprisePlanSale);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntreprisePlanSaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, entreprisePlanSaleDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanSaleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlanSale in the database
        List<EntreprisePlanSale> entreprisePlanSaleList = entreprisePlanSaleRepository.findAll();
        assertThat(entreprisePlanSaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEntreprisePlanSale() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanSaleRepository.findAll().size();
        entreprisePlanSale.setId(count.incrementAndGet());

        // Create the EntreprisePlanSale
        EntreprisePlanSaleDTO entreprisePlanSaleDTO = entreprisePlanSaleMapper.toDto(entreprisePlanSale);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntreprisePlanSaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanSaleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlanSale in the database
        List<EntreprisePlanSale> entreprisePlanSaleList = entreprisePlanSaleRepository.findAll();
        assertThat(entreprisePlanSaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEntreprisePlanSale() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanSaleRepository.findAll().size();
        entreprisePlanSale.setId(count.incrementAndGet());

        // Create the EntreprisePlanSale
        EntreprisePlanSaleDTO entreprisePlanSaleDTO = entreprisePlanSaleMapper.toDto(entreprisePlanSale);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntreprisePlanSaleMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanSaleDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EntreprisePlanSale in the database
        List<EntreprisePlanSale> entreprisePlanSaleList = entreprisePlanSaleRepository.findAll();
        assertThat(entreprisePlanSaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEntreprisePlanSale() throws Exception {
        // Initialize the database
        entreprisePlanSaleRepository.saveAndFlush(entreprisePlanSale);

        int databaseSizeBeforeDelete = entreprisePlanSaleRepository.findAll().size();

        // Delete the entreprisePlanSale
        restEntreprisePlanSaleMockMvc
            .perform(delete(ENTITY_API_URL_ID, entreprisePlanSale.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EntreprisePlanSale> entreprisePlanSaleList = entreprisePlanSaleRepository.findAll();
        assertThat(entreprisePlanSaleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
