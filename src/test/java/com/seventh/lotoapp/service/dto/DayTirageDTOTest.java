package com.seventh.lotoapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.seventh.lotoapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DayTirageDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayTirageDTO.class);
        DayTirageDTO dayTirageDTO1 = new DayTirageDTO();
        dayTirageDTO1.setId(1L);
        DayTirageDTO dayTirageDTO2 = new DayTirageDTO();
        assertThat(dayTirageDTO1).isNotEqualTo(dayTirageDTO2);
        dayTirageDTO2.setId(dayTirageDTO1.getId());
        assertThat(dayTirageDTO1).isEqualTo(dayTirageDTO2);
        dayTirageDTO2.setId(2L);
        assertThat(dayTirageDTO1).isNotEqualTo(dayTirageDTO2);
        dayTirageDTO1.setId(null);
        assertThat(dayTirageDTO1).isNotEqualTo(dayTirageDTO2);
    }
}
