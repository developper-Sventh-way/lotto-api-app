package com.seventh.lotoapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.seventh.lotoapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RequestTransactionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RequestTransactionDTO.class);
        RequestTransactionDTO requestTransactionDTO1 = new RequestTransactionDTO();
        requestTransactionDTO1.setId(1L);
        RequestTransactionDTO requestTransactionDTO2 = new RequestTransactionDTO();
        assertThat(requestTransactionDTO1).isNotEqualTo(requestTransactionDTO2);
        requestTransactionDTO2.setId(requestTransactionDTO1.getId());
        assertThat(requestTransactionDTO1).isEqualTo(requestTransactionDTO2);
        requestTransactionDTO2.setId(2L);
        assertThat(requestTransactionDTO1).isNotEqualTo(requestTransactionDTO2);
        requestTransactionDTO1.setId(null);
        assertThat(requestTransactionDTO1).isNotEqualTo(requestTransactionDTO2);
    }
}
