package com.seventh.lotoapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StateConfigurationMapperTest {

    private StateConfigurationMapper stateConfigurationMapper;

    @BeforeEach
    public void setUp() {
        stateConfigurationMapper = new StateConfigurationMapperImpl();
    }
}
