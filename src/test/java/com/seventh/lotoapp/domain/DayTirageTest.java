package com.seventh.lotoapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.seventh.lotoapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DayTirageTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayTirage.class);
        DayTirage dayTirage1 = new DayTirage();
        dayTirage1.setId(1L);
        DayTirage dayTirage2 = new DayTirage();
        dayTirage2.setId(dayTirage1.getId());
        assertThat(dayTirage1).isEqualTo(dayTirage2);
        dayTirage2.setId(2L);
        assertThat(dayTirage1).isNotEqualTo(dayTirage2);
        dayTirage1.setId(null);
        assertThat(dayTirage1).isNotEqualTo(dayTirage2);
    }
}
