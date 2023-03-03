package com.seventh.lotoapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EntreprisePlanMapperTest {

    private EntreprisePlanMapper entreprisePlanMapper;

    @BeforeEach
    public void setUp() {
        entreprisePlanMapper = new EntreprisePlanMapperImpl();
    }
}
