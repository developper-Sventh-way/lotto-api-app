package com.seventh.lotoapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EntreprisePlanPermissionMapperTest {

    private EntreprisePlanPermissionMapper entreprisePlanPermissionMapper;

    @BeforeEach
    public void setUp() {
        entreprisePlanPermissionMapper = new EntreprisePlanPermissionMapperImpl();
    }
}
