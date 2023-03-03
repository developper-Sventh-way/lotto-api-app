package com.seventh.lotoapp.service.mapper;

import com.seventh.lotoapp.domain.State;
import com.seventh.lotoapp.domain.StateConfiguration;
import com.seventh.lotoapp.service.dto.StateConfigurationDTO;
import com.seventh.lotoapp.service.dto.StateDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link StateConfiguration} and its DTO {@link StateConfigurationDTO}.
 */
@Mapper(componentModel = "spring")
public interface StateConfigurationMapper extends EntityMapper<StateConfigurationDTO, StateConfiguration> {
    @Mapping(target = "state", source = "state", qualifiedByName = "stateId")
    StateConfigurationDTO toDto(StateConfiguration s);

    @Named("stateId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StateDTO toDtoStateId(State state);
}
