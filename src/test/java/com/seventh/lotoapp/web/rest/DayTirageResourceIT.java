package com.seventh.lotoapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.seventh.lotoapp.IntegrationTest;
import com.seventh.lotoapp.domain.DayTirage;
import com.seventh.lotoapp.domain.enumeration.TirageType;
import com.seventh.lotoapp.repository.DayTirageRepository;
import com.seventh.lotoapp.service.dto.DayTirageDTO;
import com.seventh.lotoapp.service.mapper.DayTirageMapper;
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
 * Integration tests for the {@link DayTirageResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DayTirageResourceIT {

    private static final TirageType DEFAULT_TIRAGE_TYPE = TirageType.MATIN;
    private static final TirageType UPDATED_TIRAGE_TYPE = TirageType.MIDI;

    private static final String DEFAULT_DATE_IN_STRING = "AAAAAAAAAA";
    private static final String UPDATED_DATE_IN_STRING = "BBBBBBBBBB";

    private static final String DEFAULT_PREMIER_LOT = "AAAAAAAAAA";
    private static final String UPDATED_PREMIER_LOT = "BBBBBBBBBB";

    private static final String DEFAULT_DEUXIEME_LOT = "AAAAAAAAAA";
    private static final String UPDATED_DEUXIEME_LOT = "BBBBBBBBBB";

    private static final String DEFAULT_TROISIEME_LOT = "AAAAAAAAAA";
    private static final String UPDATED_TROISIEME_LOT = "BBBBBBBBBB";

    private static final String DEFAULT_PIC_3 = "AAAAAAAAAA";
    private static final String UPDATED_PIC_3 = "BBBBBBBBBB";

    private static final String DEFAULT_WIN_4 = "AAAAAAAAAA";
    private static final String UPDATED_WIN_4 = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_TRANSACTION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_TRANSACTION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/day-tirages";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DayTirageRepository dayTirageRepository;

    @Autowired
    private DayTirageMapper dayTirageMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDayTirageMockMvc;

    private DayTirage dayTirage;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayTirage createEntity(EntityManager em) {
        DayTirage dayTirage = new DayTirage()
            .tirageType(DEFAULT_TIRAGE_TYPE)
            .dateInString(DEFAULT_DATE_IN_STRING)
            .premierLot(DEFAULT_PREMIER_LOT)
            .deuxiemeLot(DEFAULT_DEUXIEME_LOT)
            .troisiemeLot(DEFAULT_TROISIEME_LOT)
            .pic3(DEFAULT_PIC_3)
            .win4(DEFAULT_WIN_4)
            .dateTransaction(DEFAULT_DATE_TRANSACTION);
        return dayTirage;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayTirage createUpdatedEntity(EntityManager em) {
        DayTirage dayTirage = new DayTirage()
            .tirageType(UPDATED_TIRAGE_TYPE)
            .dateInString(UPDATED_DATE_IN_STRING)
            .premierLot(UPDATED_PREMIER_LOT)
            .deuxiemeLot(UPDATED_DEUXIEME_LOT)
            .troisiemeLot(UPDATED_TROISIEME_LOT)
            .pic3(UPDATED_PIC_3)
            .win4(UPDATED_WIN_4)
            .dateTransaction(UPDATED_DATE_TRANSACTION);
        return dayTirage;
    }

    @BeforeEach
    public void initTest() {
        dayTirage = createEntity(em);
    }

    @Test
    @Transactional
    void createDayTirage() throws Exception {
        int databaseSizeBeforeCreate = dayTirageRepository.findAll().size();
        // Create the DayTirage
        DayTirageDTO dayTirageDTO = dayTirageMapper.toDto(dayTirage);
        restDayTirageMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dayTirageDTO)))
            .andExpect(status().isCreated());

        // Validate the DayTirage in the database
        List<DayTirage> dayTirageList = dayTirageRepository.findAll();
        assertThat(dayTirageList).hasSize(databaseSizeBeforeCreate + 1);
        DayTirage testDayTirage = dayTirageList.get(dayTirageList.size() - 1);
        assertThat(testDayTirage.getTirageType()).isEqualTo(DEFAULT_TIRAGE_TYPE);
        assertThat(testDayTirage.getDateInString()).isEqualTo(DEFAULT_DATE_IN_STRING);
        assertThat(testDayTirage.getPremierLot()).isEqualTo(DEFAULT_PREMIER_LOT);
        assertThat(testDayTirage.getDeuxiemeLot()).isEqualTo(DEFAULT_DEUXIEME_LOT);
        assertThat(testDayTirage.getTroisiemeLot()).isEqualTo(DEFAULT_TROISIEME_LOT);
        assertThat(testDayTirage.getPic3()).isEqualTo(DEFAULT_PIC_3);
        assertThat(testDayTirage.getWin4()).isEqualTo(DEFAULT_WIN_4);
        assertThat(testDayTirage.getDateTransaction()).isEqualTo(DEFAULT_DATE_TRANSACTION);
    }

    @Test
    @Transactional
    void createDayTirageWithExistingId() throws Exception {
        // Create the DayTirage with an existing ID
        dayTirage.setId(1L);
        DayTirageDTO dayTirageDTO = dayTirageMapper.toDto(dayTirage);

        int databaseSizeBeforeCreate = dayTirageRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDayTirageMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dayTirageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DayTirage in the database
        List<DayTirage> dayTirageList = dayTirageRepository.findAll();
        assertThat(dayTirageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTirageTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = dayTirageRepository.findAll().size();
        // set the field null
        dayTirage.setTirageType(null);

        // Create the DayTirage, which fails.
        DayTirageDTO dayTirageDTO = dayTirageMapper.toDto(dayTirage);

        restDayTirageMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dayTirageDTO)))
            .andExpect(status().isBadRequest());

        List<DayTirage> dayTirageList = dayTirageRepository.findAll();
        assertThat(dayTirageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDayTirages() throws Exception {
        // Initialize the database
        dayTirageRepository.saveAndFlush(dayTirage);

        // Get all the dayTirageList
        restDayTirageMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dayTirage.getId().intValue())))
            .andExpect(jsonPath("$.[*].tirageType").value(hasItem(DEFAULT_TIRAGE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].dateInString").value(hasItem(DEFAULT_DATE_IN_STRING)))
            .andExpect(jsonPath("$.[*].premierLot").value(hasItem(DEFAULT_PREMIER_LOT)))
            .andExpect(jsonPath("$.[*].deuxiemeLot").value(hasItem(DEFAULT_DEUXIEME_LOT)))
            .andExpect(jsonPath("$.[*].troisiemeLot").value(hasItem(DEFAULT_TROISIEME_LOT)))
            .andExpect(jsonPath("$.[*].pic3").value(hasItem(DEFAULT_PIC_3)))
            .andExpect(jsonPath("$.[*].win4").value(hasItem(DEFAULT_WIN_4)))
            .andExpect(jsonPath("$.[*].dateTransaction").value(hasItem(DEFAULT_DATE_TRANSACTION.toString())));
    }

    @Test
    @Transactional
    void getDayTirage() throws Exception {
        // Initialize the database
        dayTirageRepository.saveAndFlush(dayTirage);

        // Get the dayTirage
        restDayTirageMockMvc
            .perform(get(ENTITY_API_URL_ID, dayTirage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dayTirage.getId().intValue()))
            .andExpect(jsonPath("$.tirageType").value(DEFAULT_TIRAGE_TYPE.toString()))
            .andExpect(jsonPath("$.dateInString").value(DEFAULT_DATE_IN_STRING))
            .andExpect(jsonPath("$.premierLot").value(DEFAULT_PREMIER_LOT))
            .andExpect(jsonPath("$.deuxiemeLot").value(DEFAULT_DEUXIEME_LOT))
            .andExpect(jsonPath("$.troisiemeLot").value(DEFAULT_TROISIEME_LOT))
            .andExpect(jsonPath("$.pic3").value(DEFAULT_PIC_3))
            .andExpect(jsonPath("$.win4").value(DEFAULT_WIN_4))
            .andExpect(jsonPath("$.dateTransaction").value(DEFAULT_DATE_TRANSACTION.toString()));
    }

    @Test
    @Transactional
    void getNonExistingDayTirage() throws Exception {
        // Get the dayTirage
        restDayTirageMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDayTirage() throws Exception {
        // Initialize the database
        dayTirageRepository.saveAndFlush(dayTirage);

        int databaseSizeBeforeUpdate = dayTirageRepository.findAll().size();

        // Update the dayTirage
        DayTirage updatedDayTirage = dayTirageRepository.findById(dayTirage.getId()).get();
        // Disconnect from session so that the updates on updatedDayTirage are not directly saved in db
        em.detach(updatedDayTirage);
        updatedDayTirage
            .tirageType(UPDATED_TIRAGE_TYPE)
            .dateInString(UPDATED_DATE_IN_STRING)
            .premierLot(UPDATED_PREMIER_LOT)
            .deuxiemeLot(UPDATED_DEUXIEME_LOT)
            .troisiemeLot(UPDATED_TROISIEME_LOT)
            .pic3(UPDATED_PIC_3)
            .win4(UPDATED_WIN_4)
            .dateTransaction(UPDATED_DATE_TRANSACTION);
        DayTirageDTO dayTirageDTO = dayTirageMapper.toDto(updatedDayTirage);

        restDayTirageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dayTirageDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dayTirageDTO))
            )
            .andExpect(status().isOk());

        // Validate the DayTirage in the database
        List<DayTirage> dayTirageList = dayTirageRepository.findAll();
        assertThat(dayTirageList).hasSize(databaseSizeBeforeUpdate);
        DayTirage testDayTirage = dayTirageList.get(dayTirageList.size() - 1);
        assertThat(testDayTirage.getTirageType()).isEqualTo(UPDATED_TIRAGE_TYPE);
        assertThat(testDayTirage.getDateInString()).isEqualTo(UPDATED_DATE_IN_STRING);
        assertThat(testDayTirage.getPremierLot()).isEqualTo(UPDATED_PREMIER_LOT);
        assertThat(testDayTirage.getDeuxiemeLot()).isEqualTo(UPDATED_DEUXIEME_LOT);
        assertThat(testDayTirage.getTroisiemeLot()).isEqualTo(UPDATED_TROISIEME_LOT);
        assertThat(testDayTirage.getPic3()).isEqualTo(UPDATED_PIC_3);
        assertThat(testDayTirage.getWin4()).isEqualTo(UPDATED_WIN_4);
        assertThat(testDayTirage.getDateTransaction()).isEqualTo(UPDATED_DATE_TRANSACTION);
    }

    @Test
    @Transactional
    void putNonExistingDayTirage() throws Exception {
        int databaseSizeBeforeUpdate = dayTirageRepository.findAll().size();
        dayTirage.setId(count.incrementAndGet());

        // Create the DayTirage
        DayTirageDTO dayTirageDTO = dayTirageMapper.toDto(dayTirage);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayTirageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dayTirageDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dayTirageDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayTirage in the database
        List<DayTirage> dayTirageList = dayTirageRepository.findAll();
        assertThat(dayTirageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDayTirage() throws Exception {
        int databaseSizeBeforeUpdate = dayTirageRepository.findAll().size();
        dayTirage.setId(count.incrementAndGet());

        // Create the DayTirage
        DayTirageDTO dayTirageDTO = dayTirageMapper.toDto(dayTirage);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayTirageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dayTirageDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayTirage in the database
        List<DayTirage> dayTirageList = dayTirageRepository.findAll();
        assertThat(dayTirageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDayTirage() throws Exception {
        int databaseSizeBeforeUpdate = dayTirageRepository.findAll().size();
        dayTirage.setId(count.incrementAndGet());

        // Create the DayTirage
        DayTirageDTO dayTirageDTO = dayTirageMapper.toDto(dayTirage);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayTirageMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dayTirageDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DayTirage in the database
        List<DayTirage> dayTirageList = dayTirageRepository.findAll();
        assertThat(dayTirageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDayTirageWithPatch() throws Exception {
        // Initialize the database
        dayTirageRepository.saveAndFlush(dayTirage);

        int databaseSizeBeforeUpdate = dayTirageRepository.findAll().size();

        // Update the dayTirage using partial update
        DayTirage partialUpdatedDayTirage = new DayTirage();
        partialUpdatedDayTirage.setId(dayTirage.getId());

        partialUpdatedDayTirage
            .tirageType(UPDATED_TIRAGE_TYPE)
            .premierLot(UPDATED_PREMIER_LOT)
            .pic3(UPDATED_PIC_3)
            .dateTransaction(UPDATED_DATE_TRANSACTION);

        restDayTirageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDayTirage.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDayTirage))
            )
            .andExpect(status().isOk());

        // Validate the DayTirage in the database
        List<DayTirage> dayTirageList = dayTirageRepository.findAll();
        assertThat(dayTirageList).hasSize(databaseSizeBeforeUpdate);
        DayTirage testDayTirage = dayTirageList.get(dayTirageList.size() - 1);
        assertThat(testDayTirage.getTirageType()).isEqualTo(UPDATED_TIRAGE_TYPE);
        assertThat(testDayTirage.getDateInString()).isEqualTo(DEFAULT_DATE_IN_STRING);
        assertThat(testDayTirage.getPremierLot()).isEqualTo(UPDATED_PREMIER_LOT);
        assertThat(testDayTirage.getDeuxiemeLot()).isEqualTo(DEFAULT_DEUXIEME_LOT);
        assertThat(testDayTirage.getTroisiemeLot()).isEqualTo(DEFAULT_TROISIEME_LOT);
        assertThat(testDayTirage.getPic3()).isEqualTo(UPDATED_PIC_3);
        assertThat(testDayTirage.getWin4()).isEqualTo(DEFAULT_WIN_4);
        assertThat(testDayTirage.getDateTransaction()).isEqualTo(UPDATED_DATE_TRANSACTION);
    }

    @Test
    @Transactional
    void fullUpdateDayTirageWithPatch() throws Exception {
        // Initialize the database
        dayTirageRepository.saveAndFlush(dayTirage);

        int databaseSizeBeforeUpdate = dayTirageRepository.findAll().size();

        // Update the dayTirage using partial update
        DayTirage partialUpdatedDayTirage = new DayTirage();
        partialUpdatedDayTirage.setId(dayTirage.getId());

        partialUpdatedDayTirage
            .tirageType(UPDATED_TIRAGE_TYPE)
            .dateInString(UPDATED_DATE_IN_STRING)
            .premierLot(UPDATED_PREMIER_LOT)
            .deuxiemeLot(UPDATED_DEUXIEME_LOT)
            .troisiemeLot(UPDATED_TROISIEME_LOT)
            .pic3(UPDATED_PIC_3)
            .win4(UPDATED_WIN_4)
            .dateTransaction(UPDATED_DATE_TRANSACTION);

        restDayTirageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDayTirage.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDayTirage))
            )
            .andExpect(status().isOk());

        // Validate the DayTirage in the database
        List<DayTirage> dayTirageList = dayTirageRepository.findAll();
        assertThat(dayTirageList).hasSize(databaseSizeBeforeUpdate);
        DayTirage testDayTirage = dayTirageList.get(dayTirageList.size() - 1);
        assertThat(testDayTirage.getTirageType()).isEqualTo(UPDATED_TIRAGE_TYPE);
        assertThat(testDayTirage.getDateInString()).isEqualTo(UPDATED_DATE_IN_STRING);
        assertThat(testDayTirage.getPremierLot()).isEqualTo(UPDATED_PREMIER_LOT);
        assertThat(testDayTirage.getDeuxiemeLot()).isEqualTo(UPDATED_DEUXIEME_LOT);
        assertThat(testDayTirage.getTroisiemeLot()).isEqualTo(UPDATED_TROISIEME_LOT);
        assertThat(testDayTirage.getPic3()).isEqualTo(UPDATED_PIC_3);
        assertThat(testDayTirage.getWin4()).isEqualTo(UPDATED_WIN_4);
        assertThat(testDayTirage.getDateTransaction()).isEqualTo(UPDATED_DATE_TRANSACTION);
    }

    @Test
    @Transactional
    void patchNonExistingDayTirage() throws Exception {
        int databaseSizeBeforeUpdate = dayTirageRepository.findAll().size();
        dayTirage.setId(count.incrementAndGet());

        // Create the DayTirage
        DayTirageDTO dayTirageDTO = dayTirageMapper.toDto(dayTirage);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayTirageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, dayTirageDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(dayTirageDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayTirage in the database
        List<DayTirage> dayTirageList = dayTirageRepository.findAll();
        assertThat(dayTirageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDayTirage() throws Exception {
        int databaseSizeBeforeUpdate = dayTirageRepository.findAll().size();
        dayTirage.setId(count.incrementAndGet());

        // Create the DayTirage
        DayTirageDTO dayTirageDTO = dayTirageMapper.toDto(dayTirage);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayTirageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(dayTirageDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayTirage in the database
        List<DayTirage> dayTirageList = dayTirageRepository.findAll();
        assertThat(dayTirageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDayTirage() throws Exception {
        int databaseSizeBeforeUpdate = dayTirageRepository.findAll().size();
        dayTirage.setId(count.incrementAndGet());

        // Create the DayTirage
        DayTirageDTO dayTirageDTO = dayTirageMapper.toDto(dayTirage);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayTirageMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(dayTirageDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DayTirage in the database
        List<DayTirage> dayTirageList = dayTirageRepository.findAll();
        assertThat(dayTirageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDayTirage() throws Exception {
        // Initialize the database
        dayTirageRepository.saveAndFlush(dayTirage);

        int databaseSizeBeforeDelete = dayTirageRepository.findAll().size();

        // Delete the dayTirage
        restDayTirageMockMvc
            .perform(delete(ENTITY_API_URL_ID, dayTirage.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DayTirage> dayTirageList = dayTirageRepository.findAll();
        assertThat(dayTirageList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
