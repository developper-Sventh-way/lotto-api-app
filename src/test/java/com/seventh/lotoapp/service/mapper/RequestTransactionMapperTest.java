package com.seventh.lotoapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class RequestTransactionMapperTest {

    private RequestTransactionMapper requestTransactionMapper;

    @BeforeEach
    public void setUp() {
        requestTransactionMapper = new RequestTransactionMapperImpl();
    }
}
