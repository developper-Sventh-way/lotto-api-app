package com.seventh.lotoapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DayTirageMapperTest {

    private DayTirageMapper dayTirageMapper;

    @BeforeEach
    public void setUp() {
        dayTirageMapper = new DayTirageMapperImpl();
    }
}
