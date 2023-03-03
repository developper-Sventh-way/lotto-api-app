package com.seventh.lotoapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.seventh.lotoapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EntreprisePlanPermissionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntreprisePlanPermission.class);
        EntreprisePlanPermission entreprisePlanPermission1 = new EntreprisePlanPermission();
        entreprisePlanPermission1.setId(1L);
        EntreprisePlanPermission entreprisePlanPermission2 = new EntreprisePlanPermission();
        entreprisePlanPermission2.setId(entreprisePlanPermission1.getId());
        assertThat(entreprisePlanPermission1).isEqualTo(entreprisePlanPermission2);
        entreprisePlanPermission2.setId(2L);
        assertThat(entreprisePlanPermission1).isNotEqualTo(entreprisePlanPermission2);
        entreprisePlanPermission1.setId(null);
        assertThat(entreprisePlanPermission1).isNotEqualTo(entreprisePlanPermission2);
    }
}
