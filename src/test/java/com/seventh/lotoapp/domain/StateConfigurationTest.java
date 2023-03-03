package com.seventh.lotoapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.seventh.lotoapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class StateConfigurationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StateConfiguration.class);
        StateConfiguration stateConfiguration1 = new StateConfiguration();
        stateConfiguration1.setId(1L);
        StateConfiguration stateConfiguration2 = new StateConfiguration();
        stateConfiguration2.setId(stateConfiguration1.getId());
        assertThat(stateConfiguration1).isEqualTo(stateConfiguration2);
        stateConfiguration2.setId(2L);
        assertThat(stateConfiguration1).isNotEqualTo(stateConfiguration2);
        stateConfiguration1.setId(null);
        assertThat(stateConfiguration1).isNotEqualTo(stateConfiguration2);
    }
}
