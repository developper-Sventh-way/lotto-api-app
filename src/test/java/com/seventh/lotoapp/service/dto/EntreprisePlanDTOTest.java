package com.seventh.lotoapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.seventh.lotoapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EntreprisePlanDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntreprisePlanDTO.class);
        EntreprisePlanDTO entreprisePlanDTO1 = new EntreprisePlanDTO();
        entreprisePlanDTO1.setId(1L);
        EntreprisePlanDTO entreprisePlanDTO2 = new EntreprisePlanDTO();
        assertThat(entreprisePlanDTO1).isNotEqualTo(entreprisePlanDTO2);
        entreprisePlanDTO2.setId(entreprisePlanDTO1.getId());
        assertThat(entreprisePlanDTO1).isEqualTo(entreprisePlanDTO2);
        entreprisePlanDTO2.setId(2L);
        assertThat(entreprisePlanDTO1).isNotEqualTo(entreprisePlanDTO2);
        entreprisePlanDTO1.setId(null);
        assertThat(entreprisePlanDTO1).isNotEqualTo(entreprisePlanDTO2);
    }
}
