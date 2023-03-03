package com.seventh.lotoapp.web.rest;

import static com.seventh.lotoapp.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.seventh.lotoapp.IntegrationTest;
import com.seventh.lotoapp.domain.EntreprisePlan;
import com.seventh.lotoapp.domain.enumeration.TypePlan;
import com.seventh.lotoapp.repository.EntreprisePlanRepository;
import com.seventh.lotoapp.service.dto.EntreprisePlanDTO;
import com.seventh.lotoapp.service.mapper.EntreprisePlanMapper;
import java.math.BigDecimal;
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
 * Integration tests for the {@link EntreprisePlanResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EntreprisePlanResourceIT {

    private static final BigDecimal DEFAULT_PRIX = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRIX = new BigDecimal(2);

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final TypePlan DEFAULT_TYPE = TypePlan.Mensuel;
    private static final TypePlan UPDATED_TYPE = TypePlan.Annuel;

    private static final String DEFAULT_AVANTAGE = "AAAAAAAAAA";
    private static final String UPDATED_AVANTAGE = "BBBBBBBBBB";

    private static final Long DEFAULT_REQUEST_PER_DAY = 1L;
    private static final Long UPDATED_REQUEST_PER_DAY = 2L;

    private static final String ENTITY_API_URL = "/api/entreprise-plans";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EntreprisePlanRepository entreprisePlanRepository;

    @Autowired
    private EntreprisePlanMapper entreprisePlanMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEntreprisePlanMockMvc;

    private EntreprisePlan entreprisePlan;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntreprisePlan createEntity(EntityManager em) {
        EntreprisePlan entreprisePlan = new EntreprisePlan()
            .prix(DEFAULT_PRIX)
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE)
            .avantage(DEFAULT_AVANTAGE)
            .requestPerDay(DEFAULT_REQUEST_PER_DAY);
        return entreprisePlan;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntreprisePlan createUpdatedEntity(EntityManager em) {
        EntreprisePlan entreprisePlan = new EntreprisePlan()
            .prix(UPDATED_PRIX)
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .avantage(UPDATED_AVANTAGE)
            .requestPerDay(UPDATED_REQUEST_PER_DAY);
        return entreprisePlan;
    }

    @BeforeEach
    public void initTest() {
        entreprisePlan = createEntity(em);
    }

    @Test
    @Transactional
    void createEntreprisePlan() throws Exception {
        int databaseSizeBeforeCreate = entreprisePlanRepository.findAll().size();
        // Create the EntreprisePlan
        EntreprisePlanDTO entreprisePlanDTO = entreprisePlanMapper.toDto(entreprisePlan);
        restEntreprisePlanMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(entreprisePlanDTO))
            )
            .andExpect(status().isCreated());

        // Validate the EntreprisePlan in the database
        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeCreate + 1);
        EntreprisePlan testEntreprisePlan = entreprisePlanList.get(entreprisePlanList.size() - 1);
        assertThat(testEntreprisePlan.getPrix()).isEqualByComparingTo(DEFAULT_PRIX);
        assertThat(testEntreprisePlan.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEntreprisePlan.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testEntreprisePlan.getAvantage()).isEqualTo(DEFAULT_AVANTAGE);
        assertThat(testEntreprisePlan.getRequestPerDay()).isEqualTo(DEFAULT_REQUEST_PER_DAY);
    }

    @Test
    @Transactional
    void createEntreprisePlanWithExistingId() throws Exception {
        // Create the EntreprisePlan with an existing ID
        entreprisePlan.setId(1L);
        EntreprisePlanDTO entreprisePlanDTO = entreprisePlanMapper.toDto(entreprisePlan);

        int databaseSizeBeforeCreate = entreprisePlanRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntreprisePlanMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(entreprisePlanDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlan in the database
        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkPrixIsRequired() throws Exception {
        int databaseSizeBeforeTest = entreprisePlanRepository.findAll().size();
        // set the field null
        entreprisePlan.setPrix(null);

        // Create the EntreprisePlan, which fails.
        EntreprisePlanDTO entreprisePlanDTO = entreprisePlanMapper.toDto(entreprisePlan);

        restEntreprisePlanMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(entreprisePlanDTO))
            )
            .andExpect(status().isBadRequest());

        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = entreprisePlanRepository.findAll().size();
        // set the field null
        entreprisePlan.setName(null);

        // Create the EntreprisePlan, which fails.
        EntreprisePlanDTO entreprisePlanDTO = entreprisePlanMapper.toDto(entreprisePlan);

        restEntreprisePlanMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(entreprisePlanDTO))
            )
            .andExpect(status().isBadRequest());

        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = entreprisePlanRepository.findAll().size();
        // set the field null
        entreprisePlan.setType(null);

        // Create the EntreprisePlan, which fails.
        EntreprisePlanDTO entreprisePlanDTO = entreprisePlanMapper.toDto(entreprisePlan);

        restEntreprisePlanMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(entreprisePlanDTO))
            )
            .andExpect(status().isBadRequest());

        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEntreprisePlans() throws Exception {
        // Initialize the database
        entreprisePlanRepository.saveAndFlush(entreprisePlan);

        // Get all the entreprisePlanList
        restEntreprisePlanMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entreprisePlan.getId().intValue())))
            .andExpect(jsonPath("$.[*].prix").value(hasItem(sameNumber(DEFAULT_PRIX))))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].avantage").value(hasItem(DEFAULT_AVANTAGE)))
            .andExpect(jsonPath("$.[*].requestPerDay").value(hasItem(DEFAULT_REQUEST_PER_DAY.intValue())));
    }

    @Test
    @Transactional
    void getEntreprisePlan() throws Exception {
        // Initialize the database
        entreprisePlanRepository.saveAndFlush(entreprisePlan);

        // Get the entreprisePlan
        restEntreprisePlanMockMvc
            .perform(get(ENTITY_API_URL_ID, entreprisePlan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(entreprisePlan.getId().intValue()))
            .andExpect(jsonPath("$.prix").value(sameNumber(DEFAULT_PRIX)))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.avantage").value(DEFAULT_AVANTAGE))
            .andExpect(jsonPath("$.requestPerDay").value(DEFAULT_REQUEST_PER_DAY.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingEntreprisePlan() throws Exception {
        // Get the entreprisePlan
        restEntreprisePlanMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingEntreprisePlan() throws Exception {
        // Initialize the database
        entreprisePlanRepository.saveAndFlush(entreprisePlan);

        int databaseSizeBeforeUpdate = entreprisePlanRepository.findAll().size();

        // Update the entreprisePlan
        EntreprisePlan updatedEntreprisePlan = entreprisePlanRepository.findById(entreprisePlan.getId()).get();
        // Disconnect from session so that the updates on updatedEntreprisePlan are not directly saved in db
        em.detach(updatedEntreprisePlan);
        updatedEntreprisePlan
            .prix(UPDATED_PRIX)
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .avantage(UPDATED_AVANTAGE)
            .requestPerDay(UPDATED_REQUEST_PER_DAY);
        EntreprisePlanDTO entreprisePlanDTO = entreprisePlanMapper.toDto(updatedEntreprisePlan);

        restEntreprisePlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, entreprisePlanDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanDTO))
            )
            .andExpect(status().isOk());

        // Validate the EntreprisePlan in the database
        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeUpdate);
        EntreprisePlan testEntreprisePlan = entreprisePlanList.get(entreprisePlanList.size() - 1);
        assertThat(testEntreprisePlan.getPrix()).isEqualByComparingTo(UPDATED_PRIX);
        assertThat(testEntreprisePlan.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEntreprisePlan.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testEntreprisePlan.getAvantage()).isEqualTo(UPDATED_AVANTAGE);
        assertThat(testEntreprisePlan.getRequestPerDay()).isEqualTo(UPDATED_REQUEST_PER_DAY);
    }

    @Test
    @Transactional
    void putNonExistingEntreprisePlan() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanRepository.findAll().size();
        entreprisePlan.setId(count.incrementAndGet());

        // Create the EntreprisePlan
        EntreprisePlanDTO entreprisePlanDTO = entreprisePlanMapper.toDto(entreprisePlan);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntreprisePlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, entreprisePlanDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlan in the database
        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEntreprisePlan() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanRepository.findAll().size();
        entreprisePlan.setId(count.incrementAndGet());

        // Create the EntreprisePlan
        EntreprisePlanDTO entreprisePlanDTO = entreprisePlanMapper.toDto(entreprisePlan);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntreprisePlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlan in the database
        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEntreprisePlan() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanRepository.findAll().size();
        entreprisePlan.setId(count.incrementAndGet());

        // Create the EntreprisePlan
        EntreprisePlanDTO entreprisePlanDTO = entreprisePlanMapper.toDto(entreprisePlan);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntreprisePlanMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(entreprisePlanDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EntreprisePlan in the database
        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEntreprisePlanWithPatch() throws Exception {
        // Initialize the database
        entreprisePlanRepository.saveAndFlush(entreprisePlan);

        int databaseSizeBeforeUpdate = entreprisePlanRepository.findAll().size();

        // Update the entreprisePlan using partial update
        EntreprisePlan partialUpdatedEntreprisePlan = new EntreprisePlan();
        partialUpdatedEntreprisePlan.setId(entreprisePlan.getId());

        partialUpdatedEntreprisePlan.name(UPDATED_NAME).type(UPDATED_TYPE).requestPerDay(UPDATED_REQUEST_PER_DAY);

        restEntreprisePlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEntreprisePlan.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEntreprisePlan))
            )
            .andExpect(status().isOk());

        // Validate the EntreprisePlan in the database
        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeUpdate);
        EntreprisePlan testEntreprisePlan = entreprisePlanList.get(entreprisePlanList.size() - 1);
        assertThat(testEntreprisePlan.getPrix()).isEqualByComparingTo(DEFAULT_PRIX);
        assertThat(testEntreprisePlan.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEntreprisePlan.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testEntreprisePlan.getAvantage()).isEqualTo(DEFAULT_AVANTAGE);
        assertThat(testEntreprisePlan.getRequestPerDay()).isEqualTo(UPDATED_REQUEST_PER_DAY);
    }

    @Test
    @Transactional
    void fullUpdateEntreprisePlanWithPatch() throws Exception {
        // Initialize the database
        entreprisePlanRepository.saveAndFlush(entreprisePlan);

        int databaseSizeBeforeUpdate = entreprisePlanRepository.findAll().size();

        // Update the entreprisePlan using partial update
        EntreprisePlan partialUpdatedEntreprisePlan = new EntreprisePlan();
        partialUpdatedEntreprisePlan.setId(entreprisePlan.getId());

        partialUpdatedEntreprisePlan
            .prix(UPDATED_PRIX)
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .avantage(UPDATED_AVANTAGE)
            .requestPerDay(UPDATED_REQUEST_PER_DAY);

        restEntreprisePlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEntreprisePlan.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEntreprisePlan))
            )
            .andExpect(status().isOk());

        // Validate the EntreprisePlan in the database
        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeUpdate);
        EntreprisePlan testEntreprisePlan = entreprisePlanList.get(entreprisePlanList.size() - 1);
        assertThat(testEntreprisePlan.getPrix()).isEqualByComparingTo(UPDATED_PRIX);
        assertThat(testEntreprisePlan.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEntreprisePlan.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testEntreprisePlan.getAvantage()).isEqualTo(UPDATED_AVANTAGE);
        assertThat(testEntreprisePlan.getRequestPerDay()).isEqualTo(UPDATED_REQUEST_PER_DAY);
    }

    @Test
    @Transactional
    void patchNonExistingEntreprisePlan() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanRepository.findAll().size();
        entreprisePlan.setId(count.incrementAndGet());

        // Create the EntreprisePlan
        EntreprisePlanDTO entreprisePlanDTO = entreprisePlanMapper.toDto(entreprisePlan);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntreprisePlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, entreprisePlanDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlan in the database
        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEntreprisePlan() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanRepository.findAll().size();
        entreprisePlan.setId(count.incrementAndGet());

        // Create the EntreprisePlan
        EntreprisePlanDTO entreprisePlanDTO = entreprisePlanMapper.toDto(entreprisePlan);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntreprisePlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlan in the database
        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEntreprisePlan() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanRepository.findAll().size();
        entreprisePlan.setId(count.incrementAndGet());

        // Create the EntreprisePlan
        EntreprisePlanDTO entreprisePlanDTO = entreprisePlanMapper.toDto(entreprisePlan);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntreprisePlanMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EntreprisePlan in the database
        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEntreprisePlan() throws Exception {
        // Initialize the database
        entreprisePlanRepository.saveAndFlush(entreprisePlan);

        int databaseSizeBeforeDelete = entreprisePlanRepository.findAll().size();

        // Delete the entreprisePlan
        restEntreprisePlanMockMvc
            .perform(delete(ENTITY_API_URL_ID, entreprisePlan.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EntreprisePlan> entreprisePlanList = entreprisePlanRepository.findAll();
        assertThat(entreprisePlanList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
