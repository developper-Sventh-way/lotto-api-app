package com.seventh.lotoapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.seventh.lotoapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EntreprisePlanSaleDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntreprisePlanSaleDTO.class);
        EntreprisePlanSaleDTO entreprisePlanSaleDTO1 = new EntreprisePlanSaleDTO();
        entreprisePlanSaleDTO1.setId(1L);
        EntreprisePlanSaleDTO entreprisePlanSaleDTO2 = new EntreprisePlanSaleDTO();
        assertThat(entreprisePlanSaleDTO1).isNotEqualTo(entreprisePlanSaleDTO2);
        entreprisePlanSaleDTO2.setId(entreprisePlanSaleDTO1.getId());
        assertThat(entreprisePlanSaleDTO1).isEqualTo(entreprisePlanSaleDTO2);
        entreprisePlanSaleDTO2.setId(2L);
        assertThat(entreprisePlanSaleDTO1).isNotEqualTo(entreprisePlanSaleDTO2);
        entreprisePlanSaleDTO1.setId(null);
        assertThat(entreprisePlanSaleDTO1).isNotEqualTo(entreprisePlanSaleDTO2);
    }
}
