package com.seventh.lotoapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.seventh.lotoapp.IntegrationTest;
import com.seventh.lotoapp.domain.Entreprise;
import com.seventh.lotoapp.repository.EntrepriseRepository;
import com.seventh.lotoapp.service.dto.EntrepriseDTO;
import com.seventh.lotoapp.service.mapper.EntrepriseMapper;
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
 * Integration tests for the {@link EntrepriseResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EntrepriseResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_REPRESENTANT = "AAAAAAAAAA";
    private static final String UPDATED_REPRESENTANT = "BBBBBBBBBB";

    private static final String DEFAULT_CIN = "AAAAAAAAAA";
    private static final String UPDATED_CIN = "BBBBBBBBBB";

    private static final String DEFAULT_NIF = "AAAAAAAAAA";
    private static final String UPDATED_NIF = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/entreprises";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    @Autowired
    private EntrepriseMapper entrepriseMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEntrepriseMockMvc;

    private Entreprise entreprise;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entreprise createEntity(EntityManager em) {
        Entreprise entreprise = new Entreprise().name(DEFAULT_NAME).representant(DEFAULT_REPRESENTANT).cin(DEFAULT_CIN).nif(DEFAULT_NIF);
        return entreprise;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entreprise createUpdatedEntity(EntityManager em) {
        Entreprise entreprise = new Entreprise().name(UPDATED_NAME).representant(UPDATED_REPRESENTANT).cin(UPDATED_CIN).nif(UPDATED_NIF);
        return entreprise;
    }

    @BeforeEach
    public void initTest() {
        entreprise = createEntity(em);
    }

    @Test
    @Transactional
    void createEntreprise() throws Exception {
        int databaseSizeBeforeCreate = entrepriseRepository.findAll().size();
        // Create the Entreprise
        EntrepriseDTO entrepriseDTO = entrepriseMapper.toDto(entreprise);
        restEntrepriseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(entrepriseDTO)))
            .andExpect(status().isCreated());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeCreate + 1);
        Entreprise testEntreprise = entrepriseList.get(entrepriseList.size() - 1);
        assertThat(testEntreprise.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEntreprise.getRepresentant()).isEqualTo(DEFAULT_REPRESENTANT);
        assertThat(testEntreprise.getCin()).isEqualTo(DEFAULT_CIN);
        assertThat(testEntreprise.getNif()).isEqualTo(DEFAULT_NIF);
    }

    @Test
    @Transactional
    void createEntrepriseWithExistingId() throws Exception {
        // Create the Entreprise with an existing ID
        entreprise.setId(1L);
        EntrepriseDTO entrepriseDTO = entrepriseMapper.toDto(entreprise);

        int databaseSizeBeforeCreate = entrepriseRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntrepriseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(entrepriseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = entrepriseRepository.findAll().size();
        // set the field null
        entreprise.setName(null);

        // Create the Entreprise, which fails.
        EntrepriseDTO entrepriseDTO = entrepriseMapper.toDto(entreprise);

        restEntrepriseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(entrepriseDTO)))
            .andExpect(status().isBadRequest());

        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkRepresentantIsRequired() throws Exception {
        int databaseSizeBeforeTest = entrepriseRepository.findAll().size();
        // set the field null
        entreprise.setRepresentant(null);

        // Create the Entreprise, which fails.
        EntrepriseDTO entrepriseDTO = entrepriseMapper.toDto(entreprise);

        restEntrepriseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(entrepriseDTO)))
            .andExpect(status().isBadRequest());

        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEntreprises() throws Exception {
        // Initialize the database
        entrepriseRepository.saveAndFlush(entreprise);

        // Get all the entrepriseList
        restEntrepriseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entreprise.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].representant").value(hasItem(DEFAULT_REPRESENTANT)))
            .andExpect(jsonPath("$.[*].cin").value(hasItem(DEFAULT_CIN)))
            .andExpect(jsonPath("$.[*].nif").value(hasItem(DEFAULT_NIF)));
    }

    @Test
    @Transactional
    void getEntreprise() throws Exception {
        // Initialize the database
        entrepriseRepository.saveAndFlush(entreprise);

        // Get the entreprise
        restEntrepriseMockMvc
            .perform(get(ENTITY_API_URL_ID, entreprise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(entreprise.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.representant").value(DEFAULT_REPRESENTANT))
            .andExpect(jsonPath("$.cin").value(DEFAULT_CIN))
            .andExpect(jsonPath("$.nif").value(DEFAULT_NIF));
    }

    @Test
    @Transactional
    void getNonExistingEntreprise() throws Exception {
        // Get the entreprise
        restEntrepriseMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingEntreprise() throws Exception {
        // Initialize the database
        entrepriseRepository.saveAndFlush(entreprise);

        int databaseSizeBeforeUpdate = entrepriseRepository.findAll().size();

        // Update the entreprise
        Entreprise updatedEntreprise = entrepriseRepository.findById(entreprise.getId()).get();
        // Disconnect from session so that the updates on updatedEntreprise are not directly saved in db
        em.detach(updatedEntreprise);
        updatedEntreprise.name(UPDATED_NAME).representant(UPDATED_REPRESENTANT).cin(UPDATED_CIN).nif(UPDATED_NIF);
        EntrepriseDTO entrepriseDTO = entrepriseMapper.toDto(updatedEntreprise);

        restEntrepriseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, entrepriseDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entrepriseDTO))
            )
            .andExpect(status().isOk());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeUpdate);
        Entreprise testEntreprise = entrepriseList.get(entrepriseList.size() - 1);
        assertThat(testEntreprise.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEntreprise.getRepresentant()).isEqualTo(UPDATED_REPRESENTANT);
        assertThat(testEntreprise.getCin()).isEqualTo(UPDATED_CIN);
        assertThat(testEntreprise.getNif()).isEqualTo(UPDATED_NIF);
    }

    @Test
    @Transactional
    void putNonExistingEntreprise() throws Exception {
        int databaseSizeBeforeUpdate = entrepriseRepository.findAll().size();
        entreprise.setId(count.incrementAndGet());

        // Create the Entreprise
        EntrepriseDTO entrepriseDTO = entrepriseMapper.toDto(entreprise);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntrepriseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, entrepriseDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entrepriseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEntreprise() throws Exception {
        int databaseSizeBeforeUpdate = entrepriseRepository.findAll().size();
        entreprise.setId(count.incrementAndGet());

        // Create the Entreprise
        EntrepriseDTO entrepriseDTO = entrepriseMapper.toDto(entreprise);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntrepriseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entrepriseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEntreprise() throws Exception {
        int databaseSizeBeforeUpdate = entrepriseRepository.findAll().size();
        entreprise.setId(count.incrementAndGet());

        // Create the Entreprise
        EntrepriseDTO entrepriseDTO = entrepriseMapper.toDto(entreprise);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntrepriseMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(entrepriseDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEntrepriseWithPatch() throws Exception {
        // Initialize the database
        entrepriseRepository.saveAndFlush(entreprise);

        int databaseSizeBeforeUpdate = entrepriseRepository.findAll().size();

        // Update the entreprise using partial update
        Entreprise partialUpdatedEntreprise = new Entreprise();
        partialUpdatedEntreprise.setId(entreprise.getId());

        partialUpdatedEntreprise.name(UPDATED_NAME).representant(UPDATED_REPRESENTANT).cin(UPDATED_CIN);

        restEntrepriseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEntreprise.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEntreprise))
            )
            .andExpect(status().isOk());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeUpdate);
        Entreprise testEntreprise = entrepriseList.get(entrepriseList.size() - 1);
        assertThat(testEntreprise.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEntreprise.getRepresentant()).isEqualTo(UPDATED_REPRESENTANT);
        assertThat(testEntreprise.getCin()).isEqualTo(UPDATED_CIN);
        assertThat(testEntreprise.getNif()).isEqualTo(DEFAULT_NIF);
    }

    @Test
    @Transactional
    void fullUpdateEntrepriseWithPatch() throws Exception {
        // Initialize the database
        entrepriseRepository.saveAndFlush(entreprise);

        int databaseSizeBeforeUpdate = entrepriseRepository.findAll().size();

        // Update the entreprise using partial update
        Entreprise partialUpdatedEntreprise = new Entreprise();
        partialUpdatedEntreprise.setId(entreprise.getId());

        partialUpdatedEntreprise.name(UPDATED_NAME).representant(UPDATED_REPRESENTANT).cin(UPDATED_CIN).nif(UPDATED_NIF);

        restEntrepriseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEntreprise.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEntreprise))
            )
            .andExpect(status().isOk());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeUpdate);
        Entreprise testEntreprise = entrepriseList.get(entrepriseList.size() - 1);
        assertThat(testEntreprise.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEntreprise.getRepresentant()).isEqualTo(UPDATED_REPRESENTANT);
        assertThat(testEntreprise.getCin()).isEqualTo(UPDATED_CIN);
        assertThat(testEntreprise.getNif()).isEqualTo(UPDATED_NIF);
    }

    @Test
    @Transactional
    void patchNonExistingEntreprise() throws Exception {
        int databaseSizeBeforeUpdate = entrepriseRepository.findAll().size();
        entreprise.setId(count.incrementAndGet());

        // Create the Entreprise
        EntrepriseDTO entrepriseDTO = entrepriseMapper.toDto(entreprise);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntrepriseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, entrepriseDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(entrepriseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEntreprise() throws Exception {
        int databaseSizeBeforeUpdate = entrepriseRepository.findAll().size();
        entreprise.setId(count.incrementAndGet());

        // Create the Entreprise
        EntrepriseDTO entrepriseDTO = entrepriseMapper.toDto(entreprise);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntrepriseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(entrepriseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEntreprise() throws Exception {
        int databaseSizeBeforeUpdate = entrepriseRepository.findAll().size();
        entreprise.setId(count.incrementAndGet());

        // Create the Entreprise
        EntrepriseDTO entrepriseDTO = entrepriseMapper.toDto(entreprise);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntrepriseMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(entrepriseDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEntreprise() throws Exception {
        // Initialize the database
        entrepriseRepository.saveAndFlush(entreprise);

        int databaseSizeBeforeDelete = entrepriseRepository.findAll().size();

        // Delete the entreprise
        restEntrepriseMockMvc
            .perform(delete(ENTITY_API_URL_ID, entreprise.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
