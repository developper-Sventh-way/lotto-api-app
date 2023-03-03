package com.seventh.lotoapp.service.mapper;

import com.seventh.lotoapp.domain.State;
import com.seventh.lotoapp.service.dto.StateDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link State} and its DTO {@link StateDTO}.
 */
@Mapper(componentModel = "spring")
public interface StateMapper extends EntityMapper<StateDTO, State> {}
