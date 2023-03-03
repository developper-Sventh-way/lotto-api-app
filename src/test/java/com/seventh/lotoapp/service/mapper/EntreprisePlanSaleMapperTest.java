package com.seventh.lotoapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EntreprisePlanSaleMapperTest {

    private EntreprisePlanSaleMapper entreprisePlanSaleMapper;

    @BeforeEach
    public void setUp() {
        entreprisePlanSaleMapper = new EntreprisePlanSaleMapperImpl();
    }
}
