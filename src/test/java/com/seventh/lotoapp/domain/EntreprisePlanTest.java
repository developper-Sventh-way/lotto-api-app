package com.seventh.lotoapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.seventh.lotoapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EntreprisePlanTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntreprisePlan.class);
        EntreprisePlan entreprisePlan1 = new EntreprisePlan();
        entreprisePlan1.setId(1L);
        EntreprisePlan entreprisePlan2 = new EntreprisePlan();
        entreprisePlan2.setId(entreprisePlan1.getId());
        assertThat(entreprisePlan1).isEqualTo(entreprisePlan2);
        entreprisePlan2.setId(2L);
        assertThat(entreprisePlan1).isNotEqualTo(entreprisePlan2);
        entreprisePlan1.setId(null);
        assertThat(entreprisePlan1).isNotEqualTo(entreprisePlan2);
    }
}
