package com.seventh.lotoapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.seventh.lotoapp.IntegrationTest;
import com.seventh.lotoapp.domain.RequestTransaction;
import com.seventh.lotoapp.repository.RequestTransactionRepository;
import com.seventh.lotoapp.service.dto.RequestTransactionDTO;
import com.seventh.lotoapp.service.mapper.RequestTransactionMapper;
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
 * Integration tests for the {@link RequestTransactionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RequestTransactionResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_TRANSACTION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_TRANSACTION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/request-transactions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RequestTransactionRepository requestTransactionRepository;

    @Autowired
    private RequestTransactionMapper requestTransactionMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRequestTransactionMockMvc;

    private RequestTransaction requestTransaction;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RequestTransaction createEntity(EntityManager em) {
        RequestTransaction requestTransaction = new RequestTransaction()
            .description(DEFAULT_DESCRIPTION)
            .dateTransaction(DEFAULT_DATE_TRANSACTION);
        return requestTransaction;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RequestTransaction createUpdatedEntity(EntityManager em) {
        RequestTransaction requestTransaction = new RequestTransaction()
            .description(UPDATED_DESCRIPTION)
            .dateTransaction(UPDATED_DATE_TRANSACTION);
        return requestTransaction;
    }

    @BeforeEach
    public void initTest() {
        requestTransaction = createEntity(em);
    }

    @Test
    @Transactional
    void createRequestTransaction() throws Exception {
        int databaseSizeBeforeCreate = requestTransactionRepository.findAll().size();
        // Create the RequestTransaction
        RequestTransactionDTO requestTransactionDTO = requestTransactionMapper.toDto(requestTransaction);
        restRequestTransactionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(requestTransactionDTO))
            )
            .andExpect(status().isCreated());

        // Validate the RequestTransaction in the database
        List<RequestTransaction> requestTransactionList = requestTransactionRepository.findAll();
        assertThat(requestTransactionList).hasSize(databaseSizeBeforeCreate + 1);
        RequestTransaction testRequestTransaction = requestTransactionList.get(requestTransactionList.size() - 1);
        assertThat(testRequestTransaction.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRequestTransaction.getDateTransaction()).isEqualTo(DEFAULT_DATE_TRANSACTION);
    }

    @Test
    @Transactional
    void createRequestTransactionWithExistingId() throws Exception {
        // Create the RequestTransaction with an existing ID
        requestTransaction.setId(1L);
        RequestTransactionDTO requestTransactionDTO = requestTransactionMapper.toDto(requestTransaction);

        int databaseSizeBeforeCreate = requestTransactionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRequestTransactionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(requestTransactionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RequestTransaction in the database
        List<RequestTransaction> requestTransactionList = requestTransactionRepository.findAll();
        assertThat(requestTransactionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = requestTransactionRepository.findAll().size();
        // set the field null
        requestTransaction.setDescription(null);

        // Create the RequestTransaction, which fails.
        RequestTransactionDTO requestTransactionDTO = requestTransactionMapper.toDto(requestTransaction);

        restRequestTransactionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(requestTransactionDTO))
            )
            .andExpect(status().isBadRequest());

        List<RequestTransaction> requestTransactionList = requestTransactionRepository.findAll();
        assertThat(requestTransactionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllRequestTransactions() throws Exception {
        // Initialize the database
        requestTransactionRepository.saveAndFlush(requestTransaction);

        // Get all the requestTransactionList
        restRequestTransactionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(requestTransaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].dateTransaction").value(hasItem(DEFAULT_DATE_TRANSACTION.toString())));
    }

    @Test
    @Transactional
    void getRequestTransaction() throws Exception {
        // Initialize the database
        requestTransactionRepository.saveAndFlush(requestTransaction);

        // Get the requestTransaction
        restRequestTransactionMockMvc
            .perform(get(ENTITY_API_URL_ID, requestTransaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(requestTransaction.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.dateTransaction").value(DEFAULT_DATE_TRANSACTION.toString()));
    }

    @Test
    @Transactional
    void getNonExistingRequestTransaction() throws Exception {
        // Get the requestTransaction
        restRequestTransactionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingRequestTransaction() throws Exception {
        // Initialize the database
        requestTransactionRepository.saveAndFlush(requestTransaction);

        int databaseSizeBeforeUpdate = requestTransactionRepository.findAll().size();

        // Update the requestTransaction
        RequestTransaction updatedRequestTransaction = requestTransactionRepository.findById(requestTransaction.getId()).get();
        // Disconnect from session so that the updates on updatedRequestTransaction are not directly saved in db
        em.detach(updatedRequestTransaction);
        updatedRequestTransaction.description(UPDATED_DESCRIPTION).dateTransaction(UPDATED_DATE_TRANSACTION);
        RequestTransactionDTO requestTransactionDTO = requestTransactionMapper.toDto(updatedRequestTransaction);

        restRequestTransactionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, requestTransactionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(requestTransactionDTO))
            )
            .andExpect(status().isOk());

        // Validate the RequestTransaction in the database
        List<RequestTransaction> requestTransactionList = requestTransactionRepository.findAll();
        assertThat(requestTransactionList).hasSize(databaseSizeBeforeUpdate);
        RequestTransaction testRequestTransaction = requestTransactionList.get(requestTransactionList.size() - 1);
        assertThat(testRequestTransaction.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRequestTransaction.getDateTransaction()).isEqualTo(UPDATED_DATE_TRANSACTION);
    }

    @Test
    @Transactional
    void putNonExistingRequestTransaction() throws Exception {
        int databaseSizeBeforeUpdate = requestTransactionRepository.findAll().size();
        requestTransaction.setId(count.incrementAndGet());

        // Create the RequestTransaction
        RequestTransactionDTO requestTransactionDTO = requestTransactionMapper.toDto(requestTransaction);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRequestTransactionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, requestTransactionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(requestTransactionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RequestTransaction in the database
        List<RequestTransaction> requestTransactionList = requestTransactionRepository.findAll();
        assertThat(requestTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRequestTransaction() throws Exception {
        int databaseSizeBeforeUpdate = requestTransactionRepository.findAll().size();
        requestTransaction.setId(count.incrementAndGet());

        // Create the RequestTransaction
        RequestTransactionDTO requestTransactionDTO = requestTransactionMapper.toDto(requestTransaction);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRequestTransactionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(requestTransactionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RequestTransaction in the database
        List<RequestTransaction> requestTransactionList = requestTransactionRepository.findAll();
        assertThat(requestTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRequestTransaction() throws Exception {
        int databaseSizeBeforeUpdate = requestTransactionRepository.findAll().size();
        requestTransaction.setId(count.incrementAndGet());

        // Create the RequestTransaction
        RequestTransactionDTO requestTransactionDTO = requestTransactionMapper.toDto(requestTransaction);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRequestTransactionMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(requestTransactionDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the RequestTransaction in the database
        List<RequestTransaction> requestTransactionList = requestTransactionRepository.findAll();
        assertThat(requestTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRequestTransactionWithPatch() throws Exception {
        // Initialize the database
        requestTransactionRepository.saveAndFlush(requestTransaction);

        int databaseSizeBeforeUpdate = requestTransactionRepository.findAll().size();

        // Update the requestTransaction using partial update
        RequestTransaction partialUpdatedRequestTransaction = new RequestTransaction();
        partialUpdatedRequestTransaction.setId(requestTransaction.getId());

        partialUpdatedRequestTransaction.description(UPDATED_DESCRIPTION);

        restRequestTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRequestTransaction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRequestTransaction))
            )
            .andExpect(status().isOk());

        // Validate the RequestTransaction in the database
        List<RequestTransaction> requestTransactionList = requestTransactionRepository.findAll();
        assertThat(requestTransactionList).hasSize(databaseSizeBeforeUpdate);
        RequestTransaction testRequestTransaction = requestTransactionList.get(requestTransactionList.size() - 1);
        assertThat(testRequestTransaction.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRequestTransaction.getDateTransaction()).isEqualTo(DEFAULT_DATE_TRANSACTION);
    }

    @Test
    @Transactional
    void fullUpdateRequestTransactionWithPatch() throws Exception {
        // Initialize the database
        requestTransactionRepository.saveAndFlush(requestTransaction);

        int databaseSizeBeforeUpdate = requestTransactionRepository.findAll().size();

        // Update the requestTransaction using partial update
        RequestTransaction partialUpdatedRequestTransaction = new RequestTransaction();
        partialUpdatedRequestTransaction.setId(requestTransaction.getId());

        partialUpdatedRequestTransaction.description(UPDATED_DESCRIPTION).dateTransaction(UPDATED_DATE_TRANSACTION);

        restRequestTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRequestTransaction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRequestTransaction))
            )
            .andExpect(status().isOk());

        // Validate the RequestTransaction in the database
        List<RequestTransaction> requestTransactionList = requestTransactionRepository.findAll();
        assertThat(requestTransactionList).hasSize(databaseSizeBeforeUpdate);
        RequestTransaction testRequestTransaction = requestTransactionList.get(requestTransactionList.size() - 1);
        assertThat(testRequestTransaction.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRequestTransaction.getDateTransaction()).isEqualTo(UPDATED_DATE_TRANSACTION);
    }

    @Test
    @Transactional
    void patchNonExistingRequestTransaction() throws Exception {
        int databaseSizeBeforeUpdate = requestTransactionRepository.findAll().size();
        requestTransaction.setId(count.incrementAndGet());

        // Create the RequestTransaction
        RequestTransactionDTO requestTransactionDTO = requestTransactionMapper.toDto(requestTransaction);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRequestTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, requestTransactionDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(requestTransactionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RequestTransaction in the database
        List<RequestTransaction> requestTransactionList = requestTransactionRepository.findAll();
        assertThat(requestTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRequestTransaction() throws Exception {
        int databaseSizeBeforeUpdate = requestTransactionRepository.findAll().size();
        requestTransaction.setId(count.incrementAndGet());

        // Create the RequestTransaction
        RequestTransactionDTO requestTransactionDTO = requestTransactionMapper.toDto(requestTransaction);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRequestTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(requestTransactionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RequestTransaction in the database
        List<RequestTransaction> requestTransactionList = requestTransactionRepository.findAll();
        assertThat(requestTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRequestTransaction() throws Exception {
        int databaseSizeBeforeUpdate = requestTransactionRepository.findAll().size();
        requestTransaction.setId(count.incrementAndGet());

        // Create the RequestTransaction
        RequestTransactionDTO requestTransactionDTO = requestTransactionMapper.toDto(requestTransaction);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRequestTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(requestTransactionDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the RequestTransaction in the database
        List<RequestTransaction> requestTransactionList = requestTransactionRepository.findAll();
        assertThat(requestTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRequestTransaction() throws Exception {
        // Initialize the database
        requestTransactionRepository.saveAndFlush(requestTransaction);

        int databaseSizeBeforeDelete = requestTransactionRepository.findAll().size();

        // Delete the requestTransaction
        restRequestTransactionMockMvc
            .perform(delete(ENTITY_API_URL_ID, requestTransaction.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RequestTransaction> requestTransactionList = requestTransactionRepository.findAll();
        assertThat(requestTransactionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
