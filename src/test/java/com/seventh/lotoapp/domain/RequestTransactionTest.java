package com.seventh.lotoapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.seventh.lotoapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RequestTransactionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RequestTransaction.class);
        RequestTransaction requestTransaction1 = new RequestTransaction();
        requestTransaction1.setId(1L);
        RequestTransaction requestTransaction2 = new RequestTransaction();
        requestTransaction2.setId(requestTransaction1.getId());
        assertThat(requestTransaction1).isEqualTo(requestTransaction2);
        requestTransaction2.setId(2L);
        assertThat(requestTransaction1).isNotEqualTo(requestTransaction2);
        requestTransaction1.setId(null);
        assertThat(requestTransaction1).isNotEqualTo(requestTransaction2);
    }
}
