package com.seventh.lotoapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.seventh.lotoapp.IntegrationTest;
import com.seventh.lotoapp.domain.StateConfiguration;
import com.seventh.lotoapp.domain.enumeration.ConfigStatut;
import com.seventh.lotoapp.repository.StateConfigurationRepository;
import com.seventh.lotoapp.service.dto.StateConfigurationDTO;
import com.seventh.lotoapp.service.mapper.StateConfigurationMapper;
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
 * Integration tests for the {@link StateConfigurationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StateConfigurationResourceIT {

    private static final String DEFAULT_START_HOUR = "AAAAAAAAAA";
    private static final String UPDATED_START_HOUR = "BBBBBBBBBB";

    private static final String DEFAULT_END_HOUR = "AAAAAAAAAA";
    private static final String UPDATED_END_HOUR = "BBBBBBBBBB";

    private static final ConfigStatut DEFAULT_STATUT = ConfigStatut.ACTIVE;
    private static final ConfigStatut UPDATED_STATUT = ConfigStatut.CLOSED;

    private static final String ENTITY_API_URL = "/api/state-configurations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private StateConfigurationRepository stateConfigurationRepository;

    @Autowired
    private StateConfigurationMapper stateConfigurationMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStateConfigurationMockMvc;

    private StateConfiguration stateConfiguration;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StateConfiguration createEntity(EntityManager em) {
        StateConfiguration stateConfiguration = new StateConfiguration()
            .startHour(DEFAULT_START_HOUR)
            .endHour(DEFAULT_END_HOUR)
            .statut(DEFAULT_STATUT);
        return stateConfiguration;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StateConfiguration createUpdatedEntity(EntityManager em) {
        StateConfiguration stateConfiguration = new StateConfiguration()
            .startHour(UPDATED_START_HOUR)
            .endHour(UPDATED_END_HOUR)
            .statut(UPDATED_STATUT);
        return stateConfiguration;
    }

    @BeforeEach
    public void initTest() {
        stateConfiguration = createEntity(em);
    }

    @Test
    @Transactional
    void createStateConfiguration() throws Exception {
        int databaseSizeBeforeCreate = stateConfigurationRepository.findAll().size();
        // Create the StateConfiguration
        StateConfigurationDTO stateConfigurationDTO = stateConfigurationMapper.toDto(stateConfiguration);
        restStateConfigurationMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stateConfigurationDTO))
            )
            .andExpect(status().isCreated());

        // Validate the StateConfiguration in the database
        List<StateConfiguration> stateConfigurationList = stateConfigurationRepository.findAll();
        assertThat(stateConfigurationList).hasSize(databaseSizeBeforeCreate + 1);
        StateConfiguration testStateConfiguration = stateConfigurationList.get(stateConfigurationList.size() - 1);
        assertThat(testStateConfiguration.getStartHour()).isEqualTo(DEFAULT_START_HOUR);
        assertThat(testStateConfiguration.getEndHour()).isEqualTo(DEFAULT_END_HOUR);
        assertThat(testStateConfiguration.getStatut()).isEqualTo(DEFAULT_STATUT);
    }

    @Test
    @Transactional
    void createStateConfigurationWithExistingId() throws Exception {
        // Create the StateConfiguration with an existing ID
        stateConfiguration.setId(1L);
        StateConfigurationDTO stateConfigurationDTO = stateConfigurationMapper.toDto(stateConfiguration);

        int databaseSizeBeforeCreate = stateConfigurationRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStateConfigurationMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stateConfigurationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StateConfiguration in the database
        List<StateConfiguration> stateConfigurationList = stateConfigurationRepository.findAll();
        assertThat(stateConfigurationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkStartHourIsRequired() throws Exception {
        int databaseSizeBeforeTest = stateConfigurationRepository.findAll().size();
        // set the field null
        stateConfiguration.setStartHour(null);

        // Create the StateConfiguration, which fails.
        StateConfigurationDTO stateConfigurationDTO = stateConfigurationMapper.toDto(stateConfiguration);

        restStateConfigurationMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stateConfigurationDTO))
            )
            .andExpect(status().isBadRequest());

        List<StateConfiguration> stateConfigurationList = stateConfigurationRepository.findAll();
        assertThat(stateConfigurationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEndHourIsRequired() throws Exception {
        int databaseSizeBeforeTest = stateConfigurationRepository.findAll().size();
        // set the field null
        stateConfiguration.setEndHour(null);

        // Create the StateConfiguration, which fails.
        StateConfigurationDTO stateConfigurationDTO = stateConfigurationMapper.toDto(stateConfiguration);

        restStateConfigurationMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stateConfigurationDTO))
            )
            .andExpect(status().isBadRequest());

        List<StateConfiguration> stateConfigurationList = stateConfigurationRepository.findAll();
        assertThat(stateConfigurationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllStateConfigurations() throws Exception {
        // Initialize the database
        stateConfigurationRepository.saveAndFlush(stateConfiguration);

        // Get all the stateConfigurationList
        restStateConfigurationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stateConfiguration.getId().intValue())))
            .andExpect(jsonPath("$.[*].startHour").value(hasItem(DEFAULT_START_HOUR)))
            .andExpect(jsonPath("$.[*].endHour").value(hasItem(DEFAULT_END_HOUR)))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())));
    }

    @Test
    @Transactional
    void getStateConfiguration() throws Exception {
        // Initialize the database
        stateConfigurationRepository.saveAndFlush(stateConfiguration);

        // Get the stateConfiguration
        restStateConfigurationMockMvc
            .perform(get(ENTITY_API_URL_ID, stateConfiguration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(stateConfiguration.getId().intValue()))
            .andExpect(jsonPath("$.startHour").value(DEFAULT_START_HOUR))
            .andExpect(jsonPath("$.endHour").value(DEFAULT_END_HOUR))
            .andExpect(jsonPath("$.statut").value(DEFAULT_STATUT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingStateConfiguration() throws Exception {
        // Get the stateConfiguration
        restStateConfigurationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingStateConfiguration() throws Exception {
        // Initialize the database
        stateConfigurationRepository.saveAndFlush(stateConfiguration);

        int databaseSizeBeforeUpdate = stateConfigurationRepository.findAll().size();

        // Update the stateConfiguration
        StateConfiguration updatedStateConfiguration = stateConfigurationRepository.findById(stateConfiguration.getId()).get();
        // Disconnect from session so that the updates on updatedStateConfiguration are not directly saved in db
        em.detach(updatedStateConfiguration);
        updatedStateConfiguration.startHour(UPDATED_START_HOUR).endHour(UPDATED_END_HOUR).statut(UPDATED_STATUT);
        StateConfigurationDTO stateConfigurationDTO = stateConfigurationMapper.toDto(updatedStateConfiguration);

        restStateConfigurationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, stateConfigurationDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stateConfigurationDTO))
            )
            .andExpect(status().isOk());

        // Validate the StateConfiguration in the database
        List<StateConfiguration> stateConfigurationList = stateConfigurationRepository.findAll();
        assertThat(stateConfigurationList).hasSize(databaseSizeBeforeUpdate);
        StateConfiguration testStateConfiguration = stateConfigurationList.get(stateConfigurationList.size() - 1);
        assertThat(testStateConfiguration.getStartHour()).isEqualTo(UPDATED_START_HOUR);
        assertThat(testStateConfiguration.getEndHour()).isEqualTo(UPDATED_END_HOUR);
        assertThat(testStateConfiguration.getStatut()).isEqualTo(UPDATED_STATUT);
    }

    @Test
    @Transactional
    void putNonExistingStateConfiguration() throws Exception {
        int databaseSizeBeforeUpdate = stateConfigurationRepository.findAll().size();
        stateConfiguration.setId(count.incrementAndGet());

        // Create the StateConfiguration
        StateConfigurationDTO stateConfigurationDTO = stateConfigurationMapper.toDto(stateConfiguration);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStateConfigurationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, stateConfigurationDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stateConfigurationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StateConfiguration in the database
        List<StateConfiguration> stateConfigurationList = stateConfigurationRepository.findAll();
        assertThat(stateConfigurationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStateConfiguration() throws Exception {
        int databaseSizeBeforeUpdate = stateConfigurationRepository.findAll().size();
        stateConfiguration.setId(count.incrementAndGet());

        // Create the StateConfiguration
        StateConfigurationDTO stateConfigurationDTO = stateConfigurationMapper.toDto(stateConfiguration);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStateConfigurationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stateConfigurationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StateConfiguration in the database
        List<StateConfiguration> stateConfigurationList = stateConfigurationRepository.findAll();
        assertThat(stateConfigurationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStateConfiguration() throws Exception {
        int databaseSizeBeforeUpdate = stateConfigurationRepository.findAll().size();
        stateConfiguration.setId(count.incrementAndGet());

        // Create the StateConfiguration
        StateConfigurationDTO stateConfigurationDTO = stateConfigurationMapper.toDto(stateConfiguration);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStateConfigurationMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stateConfigurationDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the StateConfiguration in the database
        List<StateConfiguration> stateConfigurationList = stateConfigurationRepository.findAll();
        assertThat(stateConfigurationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStateConfigurationWithPatch() throws Exception {
        // Initialize the database
        stateConfigurationRepository.saveAndFlush(stateConfiguration);

        int databaseSizeBeforeUpdate = stateConfigurationRepository.findAll().size();

        // Update the stateConfiguration using partial update
        StateConfiguration partialUpdatedStateConfiguration = new StateConfiguration();
        partialUpdatedStateConfiguration.setId(stateConfiguration.getId());

        partialUpdatedStateConfiguration.startHour(UPDATED_START_HOUR).endHour(UPDATED_END_HOUR);

        restStateConfigurationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStateConfiguration.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStateConfiguration))
            )
            .andExpect(status().isOk());

        // Validate the StateConfiguration in the database
        List<StateConfiguration> stateConfigurationList = stateConfigurationRepository.findAll();
        assertThat(stateConfigurationList).hasSize(databaseSizeBeforeUpdate);
        StateConfiguration testStateConfiguration = stateConfigurationList.get(stateConfigurationList.size() - 1);
        assertThat(testStateConfiguration.getStartHour()).isEqualTo(UPDATED_START_HOUR);
        assertThat(testStateConfiguration.getEndHour()).isEqualTo(UPDATED_END_HOUR);
        assertThat(testStateConfiguration.getStatut()).isEqualTo(DEFAULT_STATUT);
    }

    @Test
    @Transactional
    void fullUpdateStateConfigurationWithPatch() throws Exception {
        // Initialize the database
        stateConfigurationRepository.saveAndFlush(stateConfiguration);

        int databaseSizeBeforeUpdate = stateConfigurationRepository.findAll().size();

        // Update the stateConfiguration using partial update
        StateConfiguration partialUpdatedStateConfiguration = new StateConfiguration();
        partialUpdatedStateConfiguration.setId(stateConfiguration.getId());

        partialUpdatedStateConfiguration.startHour(UPDATED_START_HOUR).endHour(UPDATED_END_HOUR).statut(UPDATED_STATUT);

        restStateConfigurationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStateConfiguration.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStateConfiguration))
            )
            .andExpect(status().isOk());

        // Validate the StateConfiguration in the database
        List<StateConfiguration> stateConfigurationList = stateConfigurationRepository.findAll();
        assertThat(stateConfigurationList).hasSize(databaseSizeBeforeUpdate);
        StateConfiguration testStateConfiguration = stateConfigurationList.get(stateConfigurationList.size() - 1);
        assertThat(testStateConfiguration.getStartHour()).isEqualTo(UPDATED_START_HOUR);
        assertThat(testStateConfiguration.getEndHour()).isEqualTo(UPDATED_END_HOUR);
        assertThat(testStateConfiguration.getStatut()).isEqualTo(UPDATED_STATUT);
    }

    @Test
    @Transactional
    void patchNonExistingStateConfiguration() throws Exception {
        int databaseSizeBeforeUpdate = stateConfigurationRepository.findAll().size();
        stateConfiguration.setId(count.incrementAndGet());

        // Create the StateConfiguration
        StateConfigurationDTO stateConfigurationDTO = stateConfigurationMapper.toDto(stateConfiguration);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStateConfigurationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, stateConfigurationDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(stateConfigurationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StateConfiguration in the database
        List<StateConfiguration> stateConfigurationList = stateConfigurationRepository.findAll();
        assertThat(stateConfigurationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStateConfiguration() throws Exception {
        int databaseSizeBeforeUpdate = stateConfigurationRepository.findAll().size();
        stateConfiguration.setId(count.incrementAndGet());

        // Create the StateConfiguration
        StateConfigurationDTO stateConfigurationDTO = stateConfigurationMapper.toDto(stateConfiguration);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStateConfigurationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(stateConfigurationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StateConfiguration in the database
        List<StateConfiguration> stateConfigurationList = stateConfigurationRepository.findAll();
        assertThat(stateConfigurationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStateConfiguration() throws Exception {
        int databaseSizeBeforeUpdate = stateConfigurationRepository.findAll().size();
        stateConfiguration.setId(count.incrementAndGet());

        // Create the StateConfiguration
        StateConfigurationDTO stateConfigurationDTO = stateConfigurationMapper.toDto(stateConfiguration);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStateConfigurationMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(stateConfigurationDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the StateConfiguration in the database
        List<StateConfiguration> stateConfigurationList = stateConfigurationRepository.findAll();
        assertThat(stateConfigurationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStateConfiguration() throws Exception {
        // Initialize the database
        stateConfigurationRepository.saveAndFlush(stateConfiguration);

        int databaseSizeBeforeDelete = stateConfigurationRepository.findAll().size();

        // Delete the stateConfiguration
        restStateConfigurationMockMvc
            .perform(delete(ENTITY_API_URL_ID, stateConfiguration.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StateConfiguration> stateConfigurationList = stateConfigurationRepository.findAll();
        assertThat(stateConfigurationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
