package com.seventh.lotoapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.seventh.lotoapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class StateConfigurationDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StateConfigurationDTO.class);
        StateConfigurationDTO stateConfigurationDTO1 = new StateConfigurationDTO();
        stateConfigurationDTO1.setId(1L);
        StateConfigurationDTO stateConfigurationDTO2 = new StateConfigurationDTO();
        assertThat(stateConfigurationDTO1).isNotEqualTo(stateConfigurationDTO2);
        stateConfigurationDTO2.setId(stateConfigurationDTO1.getId());
        assertThat(stateConfigurationDTO1).isEqualTo(stateConfigurationDTO2);
        stateConfigurationDTO2.setId(2L);
        assertThat(stateConfigurationDTO1).isNotEqualTo(stateConfigurationDTO2);
        stateConfigurationDTO1.setId(null);
        assertThat(stateConfigurationDTO1).isNotEqualTo(stateConfigurationDTO2);
    }
}
