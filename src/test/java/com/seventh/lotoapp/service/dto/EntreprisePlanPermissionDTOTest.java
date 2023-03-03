package com.seventh.lotoapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.seventh.lotoapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EntreprisePlanPermissionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntreprisePlanPermissionDTO.class);
        EntreprisePlanPermissionDTO entreprisePlanPermissionDTO1 = new EntreprisePlanPermissionDTO();
        entreprisePlanPermissionDTO1.setId(1L);
        EntreprisePlanPermissionDTO entreprisePlanPermissionDTO2 = new EntreprisePlanPermissionDTO();
        assertThat(entreprisePlanPermissionDTO1).isNotEqualTo(entreprisePlanPermissionDTO2);
        entreprisePlanPermissionDTO2.setId(entreprisePlanPermissionDTO1.getId());
        assertThat(entreprisePlanPermissionDTO1).isEqualTo(entreprisePlanPermissionDTO2);
        entreprisePlanPermissionDTO2.setId(2L);
        assertThat(entreprisePlanPermissionDTO1).isNotEqualTo(entreprisePlanPermissionDTO2);
        entreprisePlanPermissionDTO1.setId(null);
        assertThat(entreprisePlanPermissionDTO1).isNotEqualTo(entreprisePlanPermissionDTO2);
    }
}
