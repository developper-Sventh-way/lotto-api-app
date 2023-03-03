package com.seventh.lotoapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.seventh.lotoapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EntreprisePlanSaleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntreprisePlanSale.class);
        EntreprisePlanSale entreprisePlanSale1 = new EntreprisePlanSale();
        entreprisePlanSale1.setId(1L);
        EntreprisePlanSale entreprisePlanSale2 = new EntreprisePlanSale();
        entreprisePlanSale2.setId(entreprisePlanSale1.getId());
        assertThat(entreprisePlanSale1).isEqualTo(entreprisePlanSale2);
        entreprisePlanSale2.setId(2L);
        assertThat(entreprisePlanSale1).isNotEqualTo(entreprisePlanSale2);
        entreprisePlanSale1.setId(null);
        assertThat(entreprisePlanSale1).isNotEqualTo(entreprisePlanSale2);
    }
}
