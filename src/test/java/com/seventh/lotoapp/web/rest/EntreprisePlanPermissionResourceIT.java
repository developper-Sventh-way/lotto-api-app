package com.seventh.lotoapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.seventh.lotoapp.IntegrationTest;
import com.seventh.lotoapp.domain.EntreprisePlanPermission;
import com.seventh.lotoapp.repository.EntreprisePlanPermissionRepository;
import com.seventh.lotoapp.service.dto.EntreprisePlanPermissionDTO;
import com.seventh.lotoapp.service.mapper.EntreprisePlanPermissionMapper;
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
 * Integration tests for the {@link EntreprisePlanPermissionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EntreprisePlanPermissionResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/entreprise-plan-permissions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EntreprisePlanPermissionRepository entreprisePlanPermissionRepository;

    @Autowired
    private EntreprisePlanPermissionMapper entreprisePlanPermissionMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEntreprisePlanPermissionMockMvc;

    private EntreprisePlanPermission entreprisePlanPermission;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntreprisePlanPermission createEntity(EntityManager em) {
        EntreprisePlanPermission entreprisePlanPermission = new EntreprisePlanPermission().description(DEFAULT_DESCRIPTION);
        return entreprisePlanPermission;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntreprisePlanPermission createUpdatedEntity(EntityManager em) {
        EntreprisePlanPermission entreprisePlanPermission = new EntreprisePlanPermission().description(UPDATED_DESCRIPTION);
        return entreprisePlanPermission;
    }

    @BeforeEach
    public void initTest() {
        entreprisePlanPermission = createEntity(em);
    }

    @Test
    @Transactional
    void createEntreprisePlanPermission() throws Exception {
        int databaseSizeBeforeCreate = entreprisePlanPermissionRepository.findAll().size();
        // Create the EntreprisePlanPermission
        EntreprisePlanPermissionDTO entreprisePlanPermissionDTO = entreprisePlanPermissionMapper.toDto(entreprisePlanPermission);
        restEntreprisePlanPermissionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanPermissionDTO))
            )
            .andExpect(status().isCreated());

        // Validate the EntreprisePlanPermission in the database
        List<EntreprisePlanPermission> entreprisePlanPermissionList = entreprisePlanPermissionRepository.findAll();
        assertThat(entreprisePlanPermissionList).hasSize(databaseSizeBeforeCreate + 1);
        EntreprisePlanPermission testEntreprisePlanPermission = entreprisePlanPermissionList.get(entreprisePlanPermissionList.size() - 1);
        assertThat(testEntreprisePlanPermission.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void createEntreprisePlanPermissionWithExistingId() throws Exception {
        // Create the EntreprisePlanPermission with an existing ID
        entreprisePlanPermission.setId(1L);
        EntreprisePlanPermissionDTO entreprisePlanPermissionDTO = entreprisePlanPermissionMapper.toDto(entreprisePlanPermission);

        int databaseSizeBeforeCreate = entreprisePlanPermissionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntreprisePlanPermissionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanPermissionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlanPermission in the database
        List<EntreprisePlanPermission> entreprisePlanPermissionList = entreprisePlanPermissionRepository.findAll();
        assertThat(entreprisePlanPermissionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllEntreprisePlanPermissions() throws Exception {
        // Initialize the database
        entreprisePlanPermissionRepository.saveAndFlush(entreprisePlanPermission);

        // Get all the entreprisePlanPermissionList
        restEntreprisePlanPermissionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entreprisePlanPermission.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getEntreprisePlanPermission() throws Exception {
        // Initialize the database
        entreprisePlanPermissionRepository.saveAndFlush(entreprisePlanPermission);

        // Get the entreprisePlanPermission
        restEntreprisePlanPermissionMockMvc
            .perform(get(ENTITY_API_URL_ID, entreprisePlanPermission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(entreprisePlanPermission.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingEntreprisePlanPermission() throws Exception {
        // Get the entreprisePlanPermission
        restEntreprisePlanPermissionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingEntreprisePlanPermission() throws Exception {
        // Initialize the database
        entreprisePlanPermissionRepository.saveAndFlush(entreprisePlanPermission);

        int databaseSizeBeforeUpdate = entreprisePlanPermissionRepository.findAll().size();

        // Update the entreprisePlanPermission
        EntreprisePlanPermission updatedEntreprisePlanPermission = entreprisePlanPermissionRepository
            .findById(entreprisePlanPermission.getId())
            .get();
        // Disconnect from session so that the updates on updatedEntreprisePlanPermission are not directly saved in db
        em.detach(updatedEntreprisePlanPermission);
        updatedEntreprisePlanPermission.description(UPDATED_DESCRIPTION);
        EntreprisePlanPermissionDTO entreprisePlanPermissionDTO = entreprisePlanPermissionMapper.toDto(updatedEntreprisePlanPermission);

        restEntreprisePlanPermissionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, entreprisePlanPermissionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanPermissionDTO))
            )
            .andExpect(status().isOk());

        // Validate the EntreprisePlanPermission in the database
        List<EntreprisePlanPermission> entreprisePlanPermissionList = entreprisePlanPermissionRepository.findAll();
        assertThat(entreprisePlanPermissionList).hasSize(databaseSizeBeforeUpdate);
        EntreprisePlanPermission testEntreprisePlanPermission = entreprisePlanPermissionList.get(entreprisePlanPermissionList.size() - 1);
        assertThat(testEntreprisePlanPermission.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingEntreprisePlanPermission() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanPermissionRepository.findAll().size();
        entreprisePlanPermission.setId(count.incrementAndGet());

        // Create the EntreprisePlanPermission
        EntreprisePlanPermissionDTO entreprisePlanPermissionDTO = entreprisePlanPermissionMapper.toDto(entreprisePlanPermission);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntreprisePlanPermissionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, entreprisePlanPermissionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanPermissionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlanPermission in the database
        List<EntreprisePlanPermission> entreprisePlanPermissionList = entreprisePlanPermissionRepository.findAll();
        assertThat(entreprisePlanPermissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEntreprisePlanPermission() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanPermissionRepository.findAll().size();
        entreprisePlanPermission.setId(count.incrementAndGet());

        // Create the EntreprisePlanPermission
        EntreprisePlanPermissionDTO entreprisePlanPermissionDTO = entreprisePlanPermissionMapper.toDto(entreprisePlanPermission);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntreprisePlanPermissionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanPermissionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlanPermission in the database
        List<EntreprisePlanPermission> entreprisePlanPermissionList = entreprisePlanPermissionRepository.findAll();
        assertThat(entreprisePlanPermissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEntreprisePlanPermission() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanPermissionRepository.findAll().size();
        entreprisePlanPermission.setId(count.incrementAndGet());

        // Create the EntreprisePlanPermission
        EntreprisePlanPermissionDTO entreprisePlanPermissionDTO = entreprisePlanPermissionMapper.toDto(entreprisePlanPermission);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntreprisePlanPermissionMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanPermissionDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EntreprisePlanPermission in the database
        List<EntreprisePlanPermission> entreprisePlanPermissionList = entreprisePlanPermissionRepository.findAll();
        assertThat(entreprisePlanPermissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEntreprisePlanPermissionWithPatch() throws Exception {
        // Initialize the database
        entreprisePlanPermissionRepository.saveAndFlush(entreprisePlanPermission);

        int databaseSizeBeforeUpdate = entreprisePlanPermissionRepository.findAll().size();

        // Update the entreprisePlanPermission using partial update
        EntreprisePlanPermission partialUpdatedEntreprisePlanPermission = new EntreprisePlanPermission();
        partialUpdatedEntreprisePlanPermission.setId(entreprisePlanPermission.getId());

        restEntreprisePlanPermissionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEntreprisePlanPermission.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEntreprisePlanPermission))
            )
            .andExpect(status().isOk());

        // Validate the EntreprisePlanPermission in the database
        List<EntreprisePlanPermission> entreprisePlanPermissionList = entreprisePlanPermissionRepository.findAll();
        assertThat(entreprisePlanPermissionList).hasSize(databaseSizeBeforeUpdate);
        EntreprisePlanPermission testEntreprisePlanPermission = entreprisePlanPermissionList.get(entreprisePlanPermissionList.size() - 1);
        assertThat(testEntreprisePlanPermission.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateEntreprisePlanPermissionWithPatch() throws Exception {
        // Initialize the database
        entreprisePlanPermissionRepository.saveAndFlush(entreprisePlanPermission);

        int databaseSizeBeforeUpdate = entreprisePlanPermissionRepository.findAll().size();

        // Update the entreprisePlanPermission using partial update
        EntreprisePlanPermission partialUpdatedEntreprisePlanPermission = new EntreprisePlanPermission();
        partialUpdatedEntreprisePlanPermission.setId(entreprisePlanPermission.getId());

        partialUpdatedEntreprisePlanPermission.description(UPDATED_DESCRIPTION);

        restEntreprisePlanPermissionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEntreprisePlanPermission.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEntreprisePlanPermission))
            )
            .andExpect(status().isOk());

        // Validate the EntreprisePlanPermission in the database
        List<EntreprisePlanPermission> entreprisePlanPermissionList = entreprisePlanPermissionRepository.findAll();
        assertThat(entreprisePlanPermissionList).hasSize(databaseSizeBeforeUpdate);
        EntreprisePlanPermission testEntreprisePlanPermission = entreprisePlanPermissionList.get(entreprisePlanPermissionList.size() - 1);
        assertThat(testEntreprisePlanPermission.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingEntreprisePlanPermission() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanPermissionRepository.findAll().size();
        entreprisePlanPermission.setId(count.incrementAndGet());

        // Create the EntreprisePlanPermission
        EntreprisePlanPermissionDTO entreprisePlanPermissionDTO = entreprisePlanPermissionMapper.toDto(entreprisePlanPermission);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntreprisePlanPermissionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, entreprisePlanPermissionDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanPermissionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlanPermission in the database
        List<EntreprisePlanPermission> entreprisePlanPermissionList = entreprisePlanPermissionRepository.findAll();
        assertThat(entreprisePlanPermissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEntreprisePlanPermission() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanPermissionRepository.findAll().size();
        entreprisePlanPermission.setId(count.incrementAndGet());

        // Create the EntreprisePlanPermission
        EntreprisePlanPermissionDTO entreprisePlanPermissionDTO = entreprisePlanPermissionMapper.toDto(entreprisePlanPermission);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntreprisePlanPermissionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanPermissionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EntreprisePlanPermission in the database
        List<EntreprisePlanPermission> entreprisePlanPermissionList = entreprisePlanPermissionRepository.findAll();
        assertThat(entreprisePlanPermissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEntreprisePlanPermission() throws Exception {
        int databaseSizeBeforeUpdate = entreprisePlanPermissionRepository.findAll().size();
        entreprisePlanPermission.setId(count.incrementAndGet());

        // Create the EntreprisePlanPermission
        EntreprisePlanPermissionDTO entreprisePlanPermissionDTO = entreprisePlanPermissionMapper.toDto(entreprisePlanPermission);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEntreprisePlanPermissionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(entreprisePlanPermissionDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EntreprisePlanPermission in the database
        List<EntreprisePlanPermission> entreprisePlanPermissionList = entreprisePlanPermissionRepository.findAll();
        assertThat(entreprisePlanPermissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEntreprisePlanPermission() throws Exception {
        // Initialize the database
        entreprisePlanPermissionRepository.saveAndFlush(entreprisePlanPermission);

        int databaseSizeBeforeDelete = entreprisePlanPermissionRepository.findAll().size();

        // Delete the entreprisePlanPermission
        restEntreprisePlanPermissionMockMvc
            .perform(delete(ENTITY_API_URL_ID, entreprisePlanPermission.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EntreprisePlanPermission> entreprisePlanPermissionList = entreprisePlanPermissionRepository.findAll();
        assertThat(entreprisePlanPermissionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
